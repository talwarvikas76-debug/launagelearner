/**
 * Audio helper utilities for speech recognition, Gemini TTS playback (24kHz PCM),
 * and Web Speech Synthesis fallback.
 */

// PCM to AudioBuffer decoder for Gemini TTS (24kHz, 1-channel, 16-bit PCM)
export function playPCM24kAudio(base64PCM: string, playbackRate: number = 1.0): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const binaryString = atob(base64PCM);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Convert 16-bit signed integer little-endian to Float32 [-1.0, 1.0]
      const int16Array = new Int16Array(bytes.buffer);
      const float32Array = new Float32Array(int16Array.length);
      for (let i = 0; i < int16Array.length; i++) {
        float32Array[i] = int16Array[i] / 32768.0;
      }

      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioContextClass({ sampleRate: 24000 });

      // Resume context if suspended by browser autoplay policy
      if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }

      const audioBuffer = audioCtx.createBuffer(1, float32Array.length, 24000);
      audioBuffer.copyToChannel(float32Array, 0);

      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.playbackRate.value = playbackRate;
      source.connect(audioCtx.destination);

      source.onended = () => {
        try {
          audioCtx.close();
        } catch {
          // ignore
        }
        resolve();
      };

      source.start(0);
    } catch (err) {
      console.warn('Failed to play PCM audio chunk:', err);
      reject(err);
    }
  });
}

// Global reference to prevent Chrome garbage-collection of active utterance
declare global {
  interface Window {
    __activeSpeechUtterance?: SpeechSynthesisUtterance | null;
  }
}

/**
 * Stop any active audio and speech synthesis playback immediately.
 */
export function stopAllSpeech(): void {
  try {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      window.__activeSpeechUtterance = null;
    }
  } catch (e) {
    // ignore
  }
}

// Browser Web Speech Synthesis fallback
export function speakWithBrowserSynthesis(text: string, langCode: string, rate: number = 1.0): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      utterance.rate = rate;
      window.__activeSpeechUtterance = utterance;

      const pickVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          const primary = langCode.toLowerCase().replace('_', '-');
          const prefix = primary.split('-')[0];
          const exactMatch = voices.find((v) => v.lang.toLowerCase().replace('_', '-') === primary);
          const prefixMatch = voices.find((v) => v.lang.toLowerCase().replace('_', '-').startsWith(prefix));
          if (exactMatch) {
            utterance.voice = exactMatch;
          } else if (prefixMatch) {
            utterance.voice = prefixMatch;
          }
        }
      };

      pickVoice();

      let isDone = false;
      const cleanupAndFinish = () => {
        if (isDone) return;
        isDone = true;
        window.__activeSpeechUtterance = null;
        resolve();
      };

      // Safeguard duration timeout in case browser event drops
      const maxDuration = Math.max(3500, Math.ceil(text.length / 4) * 350);
      const timer = setTimeout(() => {
        cleanupAndFinish();
      }, maxDuration);

      const safeDone = () => {
        clearTimeout(timer);
        cleanupAndFinish();
      };

      utterance.onend = safeDone;
      utterance.onerror = safeDone;

      window.speechSynthesis.speak(utterance);
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch (err) {
      console.warn('Speech synthesis notice:', err);
      resolve();
    }
  });
}

// Unified speech player that tries Gemini TTS base64 first, falls back to Web Speech Synthesis
export async function speakText({
  text,
  base64Audio,
  langCode,
  rate = 1.0,
  voiceName,
  onStart,
  onEnd
}: {
  text: string;
  base64Audio?: string;
  langCode: string;
  rate?: number;
  voiceName?: string;
  onStart?: () => void;
  onEnd?: () => void;
}) {
  onStart?.();
  try {
    // 1. If pre-generated PCM audio is provided, play it
    if (base64Audio && base64Audio.length > 50) {
      await playPCM24kAudio(base64Audio, rate);
      return;
    }

    // 2. Try server-side Gemini high fidelity TTS
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voiceName })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.audioBase64) {
          await playPCM24kAudio(data.audioBase64, rate);
          return;
        }
      }
    } catch (ttsNetErr) {
      // Smoothly continue to browser synthesis fallback
    }

    // 3. Fallback to client browser speech synthesis
    await speakWithBrowserSynthesis(text, langCode, rate);
  } catch (e) {
    console.warn('Audio playback notice, attempting browser synthesis:', e);
    await speakWithBrowserSynthesis(text, langCode, rate);
  } finally {
    onEnd?.();
  }
}

// Speech Recognition wrapper
export interface SpeechRecognitionResultState {
  transcript: string;
  isFinal: boolean;
}

export function createSpeechRecognizer(
  langCode: string,
  onResult: (state: SpeechRecognitionResultState) => void,
  onError: (error: string) => void,
  onEnd: () => void
) {
  // Check browser support
  const SpeechRecognition =
    (window as unknown as { SpeechRecognition: any }).SpeechRecognition ||
    (window as unknown as { webkitSpeechRecognition: any }).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = langCode;

  recognition.onresult = (event: any) => {
    let interim = '';
    let final = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final += event.results[i][0].transcript;
      } else {
        interim += event.results[i][0].transcript;
      }
    }

    onResult({
      transcript: final || interim,
      isFinal: Boolean(final)
    });
  };

  recognition.onerror = (event: any) => {
    console.error('Speech recognition error:', event.error);
    onError(event.error);
  };

  recognition.onend = () => {
    onEnd();
  };

  return recognition;
}

// Simple Audio Recorder for capturing user speech for Gemini Transcribe / Pronunciation scoring
export class VoiceRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;

  async start(): Promise<void> {
    this.audioChunks = [];
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(this.stream);

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };

    this.mediaRecorder.start();
  }

  async stop(): Promise<{ blob: Blob; base64: string; mimeType: string }> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('Recorder not initialized'));
        return;
      }

      this.mediaRecorder.onstop = async () => {
        const mimeType = this.mediaRecorder?.mimeType || 'audio/webm';
        const blob = new Blob(this.audioChunks, { type: mimeType });

        // Stop all tracks
        if (this.stream) {
          this.stream.getTracks().forEach(track => track.stop());
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = (reader.result as string).split(',')[1] || '';
          resolve({ blob, base64: base64data, mimeType });
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      };

      this.mediaRecorder.stop();
    });
  }

  isRecording(): boolean {
    return this.mediaRecorder?.state === 'recording';
  }
}
