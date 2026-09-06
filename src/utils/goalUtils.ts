import { DailyGoal, GoalMetric } from '../types';

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDefaultDailyGoal(): DailyGoal {
  const today = getTodayDateString();
  
  // Seed initial realistic 7-day past history
  const history = [];
  const dayMs = 24 * 60 * 60 * 1000;
  for (let i = 6; i >= 1; i--) {
    const d = new Date(Date.now() - i * dayMs);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const completed = i !== 3; // simulate 5 of 6 past days completed
    history.push({
      date: dateStr,
      completed,
      minutes: completed ? 18 : 6,
      conversations: completed ? 2 : 1,
      targetType: 'minutes' as GoalMetric,
      targetValue: 15,
    });
  }

  return {
    targetType: 'minutes',
    targetValue: 15,
    todayMinutesCompleted: 8,
    todayConversationsCompleted: 1,
    lastActiveDate: today,
    goalStreakDays: 3,
    history,
  };
}

/**
 * Ensures today's date matches lastActiveDate. If a new day has started,
 * archives the previous day into history, updates streaks, and resets today's counters.
 */
export function syncDailyGoalWithDate(goal: DailyGoal): DailyGoal {
  const today = getTodayDateString();
  if (goal.lastActiveDate === today) {
    return goal;
  }

  // Check if yesterday or previous session met its goal
  const prevTarget = goal.targetValue;
  const prevCurrent = goal.targetType === 'minutes' ? goal.todayMinutesCompleted : goal.todayConversationsCompleted;
  const prevCompleted = prevCurrent >= prevTarget;

  const updatedHistory = [...(goal.history || [])];
  
  // Check if we already have an entry for lastActiveDate
  const existingIdx = updatedHistory.findIndex((h) => h.date === goal.lastActiveDate);
  const entry = {
    date: goal.lastActiveDate,
    completed: prevCompleted,
    minutes: goal.todayMinutesCompleted,
    conversations: goal.todayConversationsCompleted,
    targetType: goal.targetType,
    targetValue: goal.targetValue,
  };

  if (existingIdx >= 0) {
    updatedHistory[existingIdx] = entry;
  } else {
    updatedHistory.push(entry);
  }

  // Calculate new streak
  let newStreak = goal.goalStreakDays;
  if (prevCompleted) {
    newStreak = goal.goalStreakDays + 1;
  } else if (goal.todayMinutesCompleted === 0 && goal.todayConversationsCompleted === 0) {
    // No activity recorded on previous date
    newStreak = 0;
  }

  return {
    ...goal,
    todayMinutesCompleted: 0,
    todayConversationsCompleted: 0,
    lastActiveDate: today,
    goalStreakDays: newStreak,
    history: updatedHistory.slice(-14), // Keep last 14 days
  };
}

/**
 * Calculate progress statistics for the daily goal
 */
export function calculateGoalProgress(goal: DailyGoal) {
  const current = goal.targetType === 'minutes' ? goal.todayMinutesCompleted : goal.todayConversationsCompleted;
  const target = Math.max(1, goal.targetValue);
  const percentage = Math.min(100, Math.round((current / target) * 100));
  const isCompleted = current >= target;
  const remaining = Math.max(0, target - current);
  const unit = goal.targetType === 'minutes' ? 'min' : goal.targetValue === 1 ? 'conversation' : 'conversations';

  return {
    current,
    target,
    percentage,
    isCompleted,
    remaining,
    unit,
    metricName: goal.targetType === 'minutes' ? 'Minutes' : 'Conversations',
  };
}

/**
 * Record new practice activity into the goal
 */
export function recordGoalActivity(
  currentGoal: DailyGoal,
  additionalMinutes: number,
  additionalConversations: number = 1
): { updatedGoal: DailyGoal; newlyCompleted: boolean } {
  const syncedGoal = syncDailyGoalWithDate(currentGoal);
  
  const prevProgress = calculateGoalProgress(syncedGoal);
  
  const newMinutes = syncedGoal.todayMinutesCompleted + additionalMinutes;
  const newConversations = syncedGoal.todayConversationsCompleted + additionalConversations;

  const updatedGoal: DailyGoal = {
    ...syncedGoal,
    todayMinutesCompleted: newMinutes,
    todayConversationsCompleted: newConversations,
  };

  const newProgress = calculateGoalProgress(updatedGoal);
  const newlyCompleted = !prevProgress.isCompleted && newProgress.isCompleted;

  if (newlyCompleted) {
    updatedGoal.goalStreakDays = (syncedGoal.goalStreakDays || 0) + 1;
  }

  return {
    updatedGoal,
    newlyCompleted,
  };
}
