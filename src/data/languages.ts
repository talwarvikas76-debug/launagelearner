import { LanguageConfig, CEFRLevel } from '../types';

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  {
    id: 'en',
    name: 'English',
    nativeName: 'English (UK / US)',
    flag: '🇬🇧',
    speechCode: 'en-US',
    defaultVoice: 'Puck',
    hasRomanization: false,
    greeting: 'Hello! How can I help you practice your English today?',
    samplePhrases: [
      'Could you recommend something good around here?',
      'How much does this cost?',
      'Nice to meet you! Where are you from?',
      'Could you please speak a little slower?'
    ]
  },
  {
    id: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    speechCode: 'de-DE',
    defaultVoice: 'Fenrir',
    hasRomanization: false,
    greeting: 'Hallo! Wie geht es dir heute? Worüber möchtest du sprechen?',
    samplePhrases: [
      'Was können Sie empfehlen?',
      'Wie viel kostet das?',
      'Freut mich, Sie kennenzulernen.',
      'Könnten Sie das bitte wiederholen?'
    ]
  },
  {
    id: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    speechCode: 'fr-FR',
    defaultVoice: 'Kore',
    hasRomanization: false,
    greeting: 'Bonjour ! Comment allez-vous aujourd’hui ?',
    samplePhrases: [
      'Un café s’il vous plaît.',
      'Où se trouve la gare ?',
      'Enchanté de faire votre connaissance.',
      'Pouvez-vous répéter plus lentement ?'
    ]
  },
  {
    id: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    speechCode: 'es-ES',
    defaultVoice: 'Zephyr',
    hasRomanization: false,
    greeting: '¡Hola! ¿Qué tal estás hoy?',
    samplePhrases: [
      '¿Me podrías recomendar algo rico?',
      '¿Cuánto cuesta esto?',
      'Mucho gusto en conocerte.',
      '¿Cómo se dice esto en español?'
    ]
  },
  {
    id: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    speechCode: 'ja-JP',
    defaultVoice: 'Kore',
    hasRomanization: true,
    romanizationLabel: 'Romaji',
    greeting: 'こんにちは！今日はどんな練習をしましょうか？',
    samplePhrases: [
      'おすすめの料理は何ですか？',
      'これはいくらですか？',
      'はじめまして、よろしくお願いします。',
      'もう一度ゆっくり言っていただけますか？'
    ]
  },
  {
    id: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    speechCode: 'it-IT',
    defaultVoice: 'Zephyr',
    hasRomanization: false,
    greeting: 'Ciao! Come stai oggi?',
    samplePhrases: [
      'Cosa mi consiglia di buono?',
      'Quanto costa questo?',
      'Piacere di conoscerti!',
      'Puoi parlare un po\' più piano per favore?'
    ]
  },
  {
    id: 'zh',
    name: 'Mandarin Chinese',
    nativeName: '中文 (普通话)',
    flag: '🇨🇳',
    speechCode: 'zh-CN',
    defaultVoice: 'Kore',
    hasRomanization: true,
    romanizationLabel: 'Pinyin',
    greeting: '你好！今天想练习什么呢？',
    samplePhrases: [
      '请问这个多少钱？',
      '你有什么推荐的吗？',
      '很高兴认识你！',
      '可以请你再说一遍吗？'
    ]
  },
  {
    id: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    speechCode: 'pt-BR',
    defaultVoice: 'Puck',
    hasRomanization: false,
    greeting: 'Olá! Como você está hoje?',
    samplePhrases: [
      'O que você me recomenda?',
      'Quanto custa isso?',
      'Muito prazer em te conhecer!',
      'Você pode repetir devagar, por favor?'
    ]
  },
  {
    id: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    speechCode: 'ko-KR',
    defaultVoice: 'Kore',
    hasRomanization: true,
    romanizationLabel: 'Revised Romanization',
    greeting: '안녕하세요! 오늘 어떤 대화를 나눠볼까요?',
    samplePhrases: [
      '추천해주실 만한 메뉴가 있나요?',
      '이거 얼마예요?',
      '만나서 반가워요!',
      '조금만 천천히 말씀해 주시겠어요?'
    ]
  },
  {
    id: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    speechCode: 'ar-SA',
    defaultVoice: 'Charon',
    hasRomanization: true,
    romanizationLabel: 'Transliteration',
    greeting: 'مرحباً! كيف حالك اليوم؟',
    samplePhrases: [
      'ماذا تقترح عليّ؟',
      'كم سعر هذا؟',
      'تشرفت بمعرفتك!',
      'هل يمكنك التحدث ببطء من فضلك؟'
    ]
  },
  {
    id: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    speechCode: 'hi-IN',
    defaultVoice: 'Puck',
    hasRomanization: true,
    romanizationLabel: 'Hinglish / Transliteration',
    greeting: 'नमस्ते! आज आप क्या अभ्यास करना चाहते हैं?',
    samplePhrases: [
      'आप क्या सुझाव देंगे?',
      'यह कितने का है?',
      'आपसे मिलकर बहुत खुशी हुई।',
      'क्या आप थोड़ा धीरे बोल सकते हैं?'
    ]
  }
];

export const CEFR_LEVELS: { level: CEFRLevel; title: string; desc: string; badgeColor: string }[] = [
  { level: 'A1', title: 'Beginner', desc: 'Simple words, greetings, essential phrases', badgeColor: 'bg-[#E9F0EA] text-[#2D5438] border-[#C5DAC8]' },
  { level: 'A2', title: 'Elementary', desc: 'Basic everyday situations, routine tasks', badgeColor: 'bg-[#E7ECE8] text-[#34523E] border-[#BFCEC3]' },
  { level: 'B1', title: 'Intermediate', desc: 'Travel, work, expressing opinions and plans', badgeColor: 'bg-[#FDF6EE] text-[#A66324] border-[#F3DFC8]' },
  { level: 'B2', title: 'Upper Intermediate', desc: 'Fluent spontaneous discussions & nuanced topics', badgeColor: 'bg-[#F5EDE4] text-[#8B5E3C] border-[#DEC8B6]' },
  { level: 'C1', title: 'Advanced', desc: 'Complex, idiomatic, professional discourse', badgeColor: 'bg-[#EDEAE4] text-[#5A5043] border-[#CEC6B8]' }
];
