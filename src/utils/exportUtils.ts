import jsPDF from 'jspdf';
import { SessionReport, LanguageConfig, ChatMessage } from '../types';

/**
 * Generates and downloads a PDF summary report for offline study and review.
 */
export function generatePDFReport(
  report: SessionReport,
  language: LanguageConfig,
  messages: ChatMessage[] = []
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
      drawHeaderFooter();
    }
  };

  const drawHeaderFooter = () => {
    // Top subtle bar
    doc.setFillColor(74, 107, 83); // #4A6B53 primary brand
    doc.rect(margin, 8, contentWidth, 1.5, 'F');

    // Bottom footer
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 130);
    doc.text(
      `TalkToWorld AI • ${report.scenarioTitle} • ${new Date().toLocaleDateString()}`,
      margin,
      pageHeight - 10
    );
    const pageStr = `Page ${doc.getNumberOfPages()}`;
    doc.text(pageStr, pageWidth - margin - doc.getTextWidth(pageStr), pageHeight - 10);
  };

  // Initial header decoration
  doc.setFillColor(250, 249, 245);
  doc.roundedRect(margin, y, contentWidth, 32, 3, 3, 'F');
  doc.setDrawColor(227, 227, 216);
  doc.roundedRect(margin, y, contentWidth, 32, 3, 3, 'S');

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(44, 44, 36);
  doc.text('Language Practice Session Report', margin + 6, y + 10);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(90, 90, 64);
  doc.text(
    `Scenario: ${report.scenarioTitle}  |  Language: ${report.languageName} (${language.nativeName})  |  Level: ${report.level}`,
    margin + 6,
    y + 18
  );

  doc.setFontSize(9);
  doc.setTextColor(120, 120, 100);
  const practiceMins = Math.max(1, Math.round(report.durationSeconds / 60));
  doc.text(
    `Date: ${report.date || new Date().toLocaleString()}  •  Duration: ${practiceMins} mins  •  Turns: ${report.turnsCount}  •  Objectives: ${report.completedObjectivesCount}/${report.totalObjectivesCount}`,
    margin + 6,
    y + 25
  );

  y += 38;

  // 1. SCORE SUMMARY CARDS
  const cardWidth = (contentWidth - 9) / 4;
  const scores = [
    { label: 'OVERALL', value: `${report.overallScore}/100`, isMain: true },
    { label: 'FLUENCY', value: `${report.fluencyScore}%`, isMain: false },
    { label: 'GRAMMAR', value: `${report.accuracyScore}%`, isMain: false },
    { label: 'VOCABULARY', value: `${report.vocabularyScore}%`, isMain: false },
  ];

  scores.forEach((sc, i) => {
    const cardX = margin + i * (cardWidth + 3);
    if (sc.isMain) {
      doc.setFillColor(233, 240, 234);
      doc.setDrawColor(197, 218, 200);
    } else {
      doc.setFillColor(250, 249, 245);
      doc.setDrawColor(227, 227, 216);
    }
    doc.roundedRect(cardX, y, cardWidth, 20, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(sc.isMain ? 14 : 12);
    doc.setTextColor(sc.isMain ? 45 : 44, sc.isMain ? 84 : 44, sc.isMain ? 56 : 36);
    const valWidth = doc.getTextWidth(sc.value);
    doc.text(sc.value, cardX + (cardWidth - valWidth) / 2, y + 9);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(90, 90, 64);
    const lblWidth = doc.getTextWidth(sc.label);
    doc.text(sc.label, cardX + (cardWidth - lblWidth) / 2, y + 16);
  });

  y += 26;

  // 2. STRENGTHS & GROWTH AREAS
  checkPageBreak(50);
  const halfColWidth = (contentWidth - 6) / 2;

  // Strengths column
  doc.setFillColor(233, 240, 234);
  doc.roundedRect(margin, y, halfColWidth, 38, 2, 2, 'F');
  doc.setDrawColor(197, 218, 200);
  doc.roundedRect(margin, y, halfColWidth, 38, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(45, 84, 56);
  doc.text('Key Strengths & Mastery', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(44, 44, 36);
  let strY = y + 12;
  (report.strengths || []).slice(0, 3).forEach((item) => {
    const wrapped = doc.splitTextToSize(`• ${item}`, halfColWidth - 8);
    doc.text(wrapped, margin + 4, strY);
    strY += wrapped.length * 4.2;
  });

  // Next Steps column
  const col2X = margin + halfColWidth + 6;
  doc.setFillColor(253, 246, 238);
  doc.roundedRect(col2X, y, halfColWidth, 38, 2, 2, 'F');
  doc.setDrawColor(243, 223, 200);
  doc.roundedRect(col2X, y, halfColWidth, 38, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(166, 99, 36);
  doc.text('High-Impact Next Steps', col2X + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(44, 44, 36);
  let impY = y + 12;
  (report.areasToImprove || []).slice(0, 3).forEach((item) => {
    const wrapped = doc.splitTextToSize(`• ${item}`, halfColWidth - 8);
    doc.text(wrapped, col2X + 4, impY);
    impY += wrapped.length * 4.2;
  });

  y += 44;

  // 3. REVIEW CORRECTIONS
  if (report.mistakesReviewed && report.mistakesReviewed.length > 0) {
    checkPageBreak(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(44, 44, 36);
    doc.text('Grammar & Phrasing Corrections', margin, y);
    y += 5;

    report.mistakesReviewed.forEach((m) => {
      checkPageBreak(18);
      doc.setFillColor(250, 249, 245);
      doc.setDrawColor(227, 227, 216);
      doc.roundedRect(margin, y, contentWidth, 16, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(155, 56, 56);
      doc.text(`Original: "${m.original}"`, margin + 4, y + 5);

      doc.setTextColor(45, 84, 56);
      doc.text(`Natural: "${m.corrected}"`, margin + (contentWidth / 2), y + 5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(90, 90, 64);
      const explanationLines = doc.splitTextToSize(`Note: ${m.explanation}`, contentWidth - 8);
      doc.text(explanationLines, margin + 4, y + 11);

      y += 19;
    });
    y += 2;
  }

  // 4. FULL DIALOGUE TRANSCRIPT
  if (messages && messages.length > 0) {
    checkPageBreak(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(44, 44, 36);
    doc.text('Session Dialogue Transcript', margin, y);
    y += 6;

    messages.forEach((msg, idx) => {
      if (!msg.text) return;
      const isUser = msg.sender === 'user';
      const senderName = isUser ? 'Learner (You)' : `AI Partner (${report.languageName})`;
      
      const textLines = doc.splitTextToSize(msg.text, contentWidth - 16);
      const transLines = msg.translation
        ? doc.splitTextToSize(`Translation: ${msg.translation}`, contentWidth - 16)
        : [];
      
      const blockHeight = 10 + (textLines.length * 4) + (transLines.length > 0 ? (transLines.length * 3.5) + 2 : 0);
      checkPageBreak(blockHeight + 4);

      // Background box for message
      if (isUser) {
        doc.setFillColor(253, 246, 238);
        doc.setDrawColor(243, 223, 200);
      } else {
        doc.setFillColor(250, 249, 245);
        doc.setDrawColor(227, 227, 216);
      }
      doc.roundedRect(margin, y, contentWidth, blockHeight, 2, 2, 'FD');

      // Sender tag
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(isUser ? 166 : 74, isUser ? 99 : 107, isUser ? 36 : 83);
      doc.text(`#${idx + 1} ${senderName}`, margin + 4, y + 5);

      // Message text
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(44, 44, 36);
      doc.text(textLines, margin + 4, y + 10);

      // Translation if available
      if (transLines.length > 0) {
        doc.setFontSize(7.5);
        doc.setTextColor(110, 110, 90);
        doc.text(transLines, margin + 4, y + 10 + (textLines.length * 4) + 1);
      }

      y += blockHeight + 3;
    });
  }

  // Draw headers and footers on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    // Draw footer
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 130);
    doc.text(
      `TalkToWorld AI • ${report.scenarioTitle} • Level ${report.level}`,
      margin,
      pageHeight - 8
    );
    const pageNumText = `Page ${i} of ${totalPages}`;
    doc.text(pageNumText, pageWidth - margin - doc.getTextWidth(pageNumText), pageHeight - 8);
  }

  const cleanTitle = report.scenarioTitle.replace(/[^a-zA-Z0-9_-]/g, '_');
  doc.save(`${cleanTitle}_Summary_Report.pdf`);
}

/**
 * Exports the entire chat session, metadata, grammar feedback, and embedded audio clips
 * into a self-contained offline HTML application & JSON bundle.
 */
export function exportSessionBundle(
  report: SessionReport,
  language: LanguageConfig,
  messages: ChatMessage[]
): void {
  const messagesJson = JSON.stringify(messages);
  const reportJson = JSON.stringify(report);

  let dialogueHtml = '';
  messages.forEach((m, idx) => {
    const isUser = m.sender === 'user';
    const senderLabel = isUser ? 'Learner (You)' : 'AI Partner (' + report.languageName + ')';
    const msgClass = isUser ? 'message user' : 'message assistant';
    
    let audioSnippet = '';
    if (m.audioBase64) {
      audioSnippet = '<div style="margin-top:8px;"><button class="audio-btn" onclick="playPcmAudio(\'' + m.id + '\')">🔊 Play Audio Clip</button></div>';
    }

    let grammarSnippet = '';
    if (m.grammarFeedback && m.grammarFeedback.hasErrors) {
      grammarSnippet = '<div class="grammar-box"><strong>Coach Note:</strong> ' +
        escapeHtml(m.grammarFeedback.explanation) +
        (m.grammarFeedback.naturalAlternative ? '<br/><strong>Natural:</strong> ' + escapeHtml(m.grammarFeedback.naturalAlternative) : '') +
        '</div>';
    }

    dialogueHtml += '<div class="' + msgClass + '">' +
      '<div class="sender">#' + (idx + 1) + ' ' + escapeHtml(senderLabel) + '</div>' +
      '<div class="msg-text">' + escapeHtml(m.text || '') + '</div>' +
      (m.translation ? '<div class="translation">Translation: ' + escapeHtml(m.translation) + '</div>' : '') +
      grammarSnippet +
      audioSnippet +
      '</div>';
  });

  const htmlContent = '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'  <title>' + escapeHtml(report.scenarioTitle) + ' - Practice Session & Audio Archive</title>\n' +
'  <style>\n' +
'    :root {\n' +
'      --bg: #FAF9F5;\n' +
'      --card-bg: #FFFFFF;\n' +
'      --text-main: #2C2C24;\n' +
'      --text-muted: #5A5A40;\n' +
'      --primary: #4A6B53;\n' +
'      --border: #E3E3D8;\n' +
'      --accent-warm: #C28E58;\n' +
'    }\n' +
'    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }\n' +
'    body { background-color: var(--bg); color: var(--text-main); padding: 24px; line-height: 1.5; }\n' +
'    .container { max-width: 800px; margin: 0 auto; }\n' +
'    .header { background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px; padding: 24px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }\n' +
'    .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; background: #E9F0EA; color: #2D5438; }\n' +
'    .scores { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 20px 0; }\n' +
'    .score-card { background: var(--bg); border: 1px solid var(--border); border-radius: 12px; padding: 14px; text-align: center; }\n' +
'    .score-num { font-size: 24px; font-weight: 800; font-family: monospace; }\n' +
'    .score-label { font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 600; margin-top: 4px; }\n' +
'    .section-title { font-size: 16px; font-weight: 700; margin: 24px 0 12px; color: var(--text-main); }\n' +
'    .message { background: var(--card-bg); border: 1px solid var(--border); border-radius: 14px; padding: 16px; margin-bottom: 12px; }\n' +
'    .message.user { border-left: 4px solid var(--accent-warm); background: #FDF6EE; }\n' +
'    .message.assistant { border-left: 4px solid var(--primary); }\n' +
'    .sender { font-size: 12px; font-weight: 700; margin-bottom: 6px; color: var(--text-muted); }\n' +
'    .msg-text { font-size: 15px; font-weight: 500; margin-bottom: 4px; }\n' +
'    .translation { font-size: 13px; color: var(--text-muted); font-style: italic; }\n' +
'    .grammar-box { margin-top: 10px; padding: 10px 12px; border-radius: 8px; background: #FFF; border: 1px solid #F3DFC8; font-size: 12px; }\n' +
'    .audio-btn { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 8px; background: #E9F0EA; border: 1px solid #C5DAC8; color: #2D5438; font-size: 12px; font-weight: 600; cursor: pointer; }\n' +
'    .audio-btn:hover { background: #DCFCE7; }\n' +
'    .export-note { text-align: center; font-size: 12px; color: var(--text-muted); margin-top: 32px; padding-top: 16px; border-top: 1px solid var(--border); }\n' +
'    .raw-data-btn { display: inline-block; margin-top: 8px; padding: 6px 12px; background: var(--border); border-radius: 6px; font-size: 11px; cursor: pointer; border: none; }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
'  <div class="container">\n' +
'    <div class="header">\n' +
'      <span class="badge">' + escapeHtml(report.languageName) + ' • Level ' + escapeHtml(report.level) + '</span>\n' +
'      <h1 style="font-size: 24px; font-weight: 800; margin: 10px 0 4px;">' + escapeHtml(report.scenarioTitle) + '</h1>\n' +
'      <p style="font-size: 13px; color: var(--text-muted);">Completed on ' + escapeHtml(report.date || new Date().toLocaleString()) + '</p>\n' +
'      <div class="scores">\n' +
'        <div class="score-card" style="background:#E9F0EA; border-color:#C5DAC8; color:#2D5438;">\n' +
'          <div class="score-num">' + report.overallScore + '</div>\n' +
'          <div class="score-label">Overall</div>\n' +
'        </div>\n' +
'        <div class="score-card">\n' +
'          <div class="score-num">' + report.fluencyScore + '</div>\n' +
'          <div class="score-label">Fluency</div>\n' +
'        </div>\n' +
'        <div class="score-card">\n' +
'          <div class="score-num">' + report.accuracyScore + '</div>\n' +
'          <div class="score-label">Grammar</div>\n' +
'        </div>\n' +
'        <div class="score-card">\n' +
'          <div class="score-num">' + report.vocabularyScore + '</div>\n' +
'          <div class="score-label">Vocabulary</div>\n' +
'        </div>\n' +
'      </div>\n' +
'    </div>\n' +
'    <h2 class="section-title">Complete Dialogue & Audio Archive (' + messages.length + ' turns)</h2>\n' +
'    <div class="dialogue-list">' + dialogueHtml + '</div>\n' +
'    <div class="export-note">\n' +
'      <p>Generated by TalkToWorld AI (talktoworld.co.in). Self-contained offline archive with playable audio clips.</p>\n' +
'      <button class="raw-data-btn" onclick="downloadRawJson()">Download Raw JSON Data</button>\n' +
'    </div>\n' +
'  </div>\n' +
'  <script>\n' +
'    const sessionData = {\n' +
'      report: ' + reportJson + ',\n' +
'      messages: ' + messagesJson + '\n' +
'    };\n' +
'    function downloadRawJson() {\n' +
'      const blob = new Blob([JSON.stringify(sessionData, null, 2)], { type: "application/json" });\n' +
'      const url = URL.createObjectURL(blob);\n' +
'      const a = document.createElement("a");\n' +
'      a.href = url;\n' +
'      a.download = "' + report.scenarioTitle.replace(/[^a-zA-Z0-9_-]/g, '_') + '_data.json";\n' +
'      a.click();\n' +
'      URL.revokeObjectURL(url);\n' +
'    }\n' +
'    function playPcmAudio(msgId) {\n' +
'      const msg = sessionData.messages.find(m => m.id === msgId);\n' +
'      if (!msg || !msg.audioBase64) return;\n' +
'      try {\n' +
'        const binary = atob(msg.audioBase64);\n' +
'        const bytes = new Uint8Array(binary.length);\n' +
'        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);\n' +
'        const int16Array = new Int16Array(bytes.buffer);\n' +
'        const float32Array = new Float32Array(int16Array.length);\n' +
'        for (let i = 0; i < int16Array.length; i++) float32Array[i] = int16Array[i] / 32768.0;\n' +
'        const AudioContextClass = window.AudioContext || window.webkitAudioContext;\n' +
'        const ctx = new AudioContextClass({ sampleRate: 24000 });\n' +
'        if (ctx.state === "suspended") ctx.resume();\n' +
'        const buffer = ctx.createBuffer(1, float32Array.length, 24000);\n' +
'        buffer.copyToChannel(float32Array, 0);\n' +
'        const source = ctx.createBufferSource();\n' +
'        source.buffer = buffer;\n' +
'        source.connect(ctx.destination);\n' +
'        source.start();\n' +
'        source.onended = () => { ctx.close(); };\n' +
'      } catch (e) { console.warn("Audio playback error:", e); }\n' +
'    }\n' +
'  </script>\n' +
'</body>\n' +
'</html>';

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const cleanTitle = report.scenarioTitle.replace(/[^a-zA-Z0-9_-]/g, '_');
  const a = document.createElement('a');
  a.href = url;
  a.download = `${cleanTitle}_Full_Session_With_Audio.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Exports raw JSON of the session for developer or analytics use.
 */
export function exportSessionJSON(
  report: SessionReport,
  language: LanguageConfig,
  messages: ChatMessage[]
): void {
  const exportPayload = {
    app: 'TalkToWorld AI (talktoworld.co.in)',
    exportedAt: new Date().toISOString(),
    language: {
      name: language.name,
      nativeName: language.nativeName,
      speechCode: language.speechCode,
    },
    report,
    messages,
  };

  const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const cleanTitle = report.scenarioTitle.replace(/[^a-zA-Z0-9_-]/g, '_');
  const a = document.createElement('a');
  a.href = url;
  a.download = `${cleanTitle}_Session_Archive.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
