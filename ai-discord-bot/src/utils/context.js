const config = require('../config');

// channelId -> [{ role, content }]
const contextMap = new Map();

function getContext(channelId) {
  return contextMap.get(channelId) || [];
}

function addMessage(channelId, role, content) {
  if (!contextMap.has(channelId)) contextMap.set(channelId, []);
  const ctx = contextMap.get(channelId);
  ctx.push({ role, content });
  // Trim to max
  while (ctx.length > config.maxContextMessages) ctx.shift();
}

function clearContext(channelId) {
  contextMap.delete(channelId);
}

module.exports = { getContext, addMessage, clearContext };
