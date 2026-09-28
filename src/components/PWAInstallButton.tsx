import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../utils/usePWAInstall';

export const PWAInstallButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className={`flex items-center gap-1.5 rounded-xl bg-[#2F523A] hover:bg-[#25422E] px-3 py-1.5 text-xs font-bold text-white shadow-2xs transition active:scale-95 cursor-pointer ${className}`}
        title="Install TalkToWorld App on your device for instant offline access"
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Install App</span>
        <span className="sm:hidden">Install</span>
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported by WebKit)
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className={`flex items-center gap-1.5 rounded-xl border border-[#DCDCCF] bg-white hover:bg-[#F5F5F0] px-3 py-1.5 text-xs font-bold text-[#1F2421] shadow-2xs transition active:scale-95 cursor-pointer ${className}`}
          title="Install TalkToWorld on iOS"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#2F523A]" />
          <span className="hidden sm:inline">Install App</span>
          <span className="sm:hidden">Install</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
            <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-[#E8E8DF] relative text-left">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 p-1.5 text-[#7A7A68] hover:text-[#1F2421] rounded-full hover:bg-[#F5F5F0] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="w-12 h-12 rounded-2xl bg-[#E9F0EA] text-[#2F523A] flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-extrabold text-[#1F2421]">Install on iPhone / iPad</h3>
              <p className="mt-2 text-xs text-[#555546] leading-relaxed">
                Experience TalkToWorld in standalone full-screen mode like a native app:
              </p>
              
              <div className="mt-3.5 space-y-2 bg-[#F6F7F2] p-3.5 rounded-2xl border border-[#E8E8DF] text-xs text-[#1F2421]">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#2F523A] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                  <span>Tap the <strong>Share</strong> button in Safari toolbar (square with upward arrow).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#2F523A] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                  <span>Scroll down and tap <strong>Add to Home Screen</strong>.</span>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-[#2F523A] hover:bg-[#25422E] py-2.5 text-xs font-bold text-white shadow-xs transition cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
