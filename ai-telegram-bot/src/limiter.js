import { config } from './config.js';

// { userId: { date: 'YYYY-MM-DD', count: N } }
const usage = new Map();

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function checkLimit(userId) {
  const today = todayStr();
  const rec = usage.get(userId);
  if (!rec || rec.date !== today) return { allowed: true, remaining: config.dailyLimit };
  const remaining = config.dailyLimit - rec.count;
  return { allowed: remaining > 0, remaining: Math.max(0, remaining) };
}

export function increment(userId) {
  const today = todayStr();
  const rec = usage.get(userId);
  if (!rec || rec.date !== today) {
    usage.set(userId, { date: today, count: 1 });
  } else {
    rec.count++;
  }
}

export function getUsage(userId) {
  const today = todayStr();
  const rec = usage.get(userId);
  if (!rec || rec.date !== today) return 0;
  return rec.count;
}
