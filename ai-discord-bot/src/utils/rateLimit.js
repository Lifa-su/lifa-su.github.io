const config = require('../config');

// userId -> [timestamp, ...]
const usageMap = new Map();

function checkLimit(userId) {
  const now = Date.now();
  const windowMs = config.rateLimit.windowMinutes * 60 * 1000;

  if (!usageMap.has(userId)) usageMap.set(userId, []);
  const timestamps = usageMap.get(userId).filter(t => now - t < windowMs);
  usageMap.set(userId, timestamps);

  if (timestamps.length >= config.rateLimit.maxRequests) {
    const oldestInWindow = timestamps[0];
    const resetIn = Math.ceil((oldestInWindow + windowMs - now) / 60000);
    return { allowed: false, remaining: 0, resetIn };
  }

  timestamps.push(now);
  return { allowed: true, remaining: config.rateLimit.maxRequests - timestamps.length };
}

function getUsage(userId) {
  const now = Date.now();
  const windowMs = config.rateLimit.windowMinutes * 60 * 1000;
  const timestamps = (usageMap.get(userId) || []).filter(t => now - t < windowMs);
  return { used: timestamps.length, max: config.rateLimit.maxRequests };
}

module.exports = { checkLimit, getUsage };
