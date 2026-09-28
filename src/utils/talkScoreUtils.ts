import { CEFRLevel, SessionReport, TalkScore, DailyMission, UserStats, DailyGoal } from '../types';

export const getTalkScoreTier = (score: number): { tier: string; badge: string; level: CEFRLevel; color: string; desc: string } => {
  if (score >= 90) {
    return {
      tier: 'Master Communicator',
      badge: '🏆 C1 Expert',
      level: 'C1',
      color: '#2D5438',
      desc: 'Spontaneous fluency, nuanced idioms, and high grammatical precision across academic & professional contexts.'
    };
  }
  if (score >= 80) {
    return {
      tier: 'Fluent Practitioner',
      badge: '🌟 B2 Upper-Int',
      level: 'B2',
      color: '#4A6B53',
      desc: 'Confident spontaneous dialogue with authentic cadence and rich vocabulary in diverse real-world settings.'
    };
  }
  if (score >= 65) {
    return {
      tier: 'Independent Speaker',
      badge: '⚡ B1 Intermediate',
      level: 'B1',
      color: '#326B88',
      desc: 'Able to handle common travel, work, and social interactions with minimal hesitation and good comprehension.'
    };
  }
  if (score >= 45) {
    return {
      tier: 'Conversational Explorer',
      badge: '🌱 A2 Elementary',
      level: 'A2',
      color: '#C28E58',
      desc: 'Building essential daily vocabulary, routine questions, basic café & transit exchanges.'
    };
  }
  return {
    tier: 'Novice Starter',
    badge: '🐣 A1 Beginner',
    level: 'A1',
    color: '#8A8A7A',
    desc: 'Acquiring high-frequency survival phrases, greetings, pronunciation fundamentals, and core vocabulary.'
  };
};

export const getDefaultTalkScore = (level: CEFRLevel = 'A2'): TalkScore => {
  let baseOverall = 78;
  let fluency = 76;
  let pronunciation = 80;
  let vocabulary = 78;
  let grammar = 77;

  switch (level) {
    case 'A1':
      baseOverall = 42;
      fluency = 40;
      pronunciation = 45;
      vocabulary = 42;
      grammar = 41;
      break;
    case 'A2':
      baseOverall = 62;
      fluency = 60;
      pronunciation = 64;
      vocabulary = 63;
      grammar = 61;
      break;
    case 'B1':
      baseOverall = 74;
      fluency = 72;
      pronunciation = 75;
      vocabulary = 76;
      grammar = 73;
      break;
    case 'B2':
      baseOverall = 84;
      fluency = 83;
      pronunciation = 86;
      vocabulary = 85;
      grammar = 82;
      break;
    case 'C1':
      baseOverall = 92;
      fluency = 91;
      pronunciation = 94;
      vocabulary = 93;
      grammar = 90;
      break;
  }

  const tierInfo = getTalkScoreTier(baseOverall);

  return {
    overall: baseOverall,
    fluency,
    pronunciation,
    vocabulary,
    grammar,
    level: tierInfo.level,
    tierLabel: tierInfo.tier,
    nextLevelTarget: level === 'A1' ? 'A2' : level === 'A2' ? 'B1' : level === 'B1' ? 'B2' : 'C1',
    pointsToNextLevel: Math.max(5, 85 - baseOverall),
    lastUpdated: new Date().toISOString(),
    history: [
      { date: 'Day 1', score: Math.max(30, baseOverall - 8) },
      { date: 'Day 2', score: Math.max(32, baseOverall - 5) },
      { date: 'Day 3', score: Math.max(35, baseOverall - 3) },
      { date: 'Day 4', score: baseOverall }
    ]
  };
};

export const updateTalkScoreFromSession = (
  prev: TalkScore,
  report: SessionReport
): TalkScore => {
  // Weighted blend: 85% previous cumulative, 15% new session performance
  const sessionFluency = report.fluencyScore || 80;
  const sessionPronunciation = report.accuracyScore || 80;
  const sessionVocab = report.vocabularyScore || 80;
  const sessionGrammar = report.accuracyScore || 80;

  const newFluency = Math.round(prev.fluency * 0.85 + sessionFluency * 0.15);
  const newPronunciation = Math.round(prev.pronunciation * 0.85 + sessionPronunciation * 0.15);
  const newVocab = Math.round(prev.vocabulary * 0.85 + sessionVocab * 0.15);
  const newGrammar = Math.round(prev.grammar * 0.85 + sessionGrammar * 0.15);

  const newOverall = Math.round((newFluency + newPronunciation + newVocab + newGrammar) / 4);
  const tierInfo = getTalkScoreTier(newOverall);

  const todayStr = new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  const updatedHistory = [...(prev.history || [])];
  if (updatedHistory.length > 0 && updatedHistory[updatedHistory.length - 1].date === todayStr) {
    updatedHistory[updatedHistory.length - 1].score = newOverall;
  } else {
    updatedHistory.push({ date: todayStr, score: newOverall });
    if (updatedHistory.length > 7) updatedHistory.shift();
  }

  return {
    overall: newOverall,
    fluency: newFluency,
    pronunciation: newPronunciation,
    vocabulary: newVocab,
    grammar: newGrammar,
    level: tierInfo.level,
    tierLabel: tierInfo.tier,
    nextLevelTarget: tierInfo.level === 'A1' ? 'A2' : tierInfo.level === 'A2' ? 'B1' : tierInfo.level === 'B1' ? 'B2' : 'C1',
    pointsToNextLevel: Math.max(2, 90 - newOverall),
    lastUpdated: new Date().toISOString(),
    history: updatedHistory
  };
};

export const getDefaultDailyMissions = (
  goal: DailyGoal,
  savedWordsCount: number,
  lastPronunciationScore: number = 88
): DailyMission[] => {
  const isRoleplayDone = goal.todayConversationsCompleted >= 1;
  const isTimeMet = goal.todayMinutesCompleted >= 10;
  const isVocabDone = savedWordsCount >= 3;
  const isPronunciationDone = lastPronunciationScore >= 80;

  return [
    {
      id: 'mission-roleplay',
      title: 'Spoken Scenario Practice',
      description: 'Complete 1 full AI roleplay session',
      icon: '🎙️',
      targetCount: 1,
      currentCount: Math.min(1, goal.todayConversationsCompleted),
      unit: 'session',
      completed: isRoleplayDone,
      xpReward: 25
    },
    {
      id: 'mission-talking-time',
      title: 'Active Speaking Time',
      description: 'Practice speaking for at least 10 minutes',
      icon: '⏱️',
      targetCount: 10,
      currentCount: Math.min(10, goal.todayMinutesCompleted),
      unit: 'mins',
      completed: isTimeMet,
      xpReward: 30
    },
    {
      id: 'mission-vocab',
      title: 'Vocabulary Builder',
      description: 'Inspect and save 3 words to Vocab Bank',
      icon: '📚',
      targetCount: 3,
      currentCount: Math.min(3, savedWordsCount),
      unit: 'words',
      completed: isVocabDone,
      xpReward: 20
    },
    {
      id: 'mission-pronunciation',
      title: 'Acoustic Pronunciation Coach',
      description: 'Score 80%+ on any pronunciation exercise',
      icon: '🎯',
      targetCount: 1,
      currentCount: isPronunciationDone ? 1 : 0,
      unit: 'check',
      completed: isPronunciationDone,
      xpReward: 25
    }
  ];
};
