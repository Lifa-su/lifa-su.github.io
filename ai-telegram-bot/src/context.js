// In-memory conversation context store (last N messages per user)
const MAX_HISTORY = 10;
const store = new Map();

function key(userId, chatId) {
  return `${userId}:${chatId}`;
}

export function getHistory(userId, chatId) {
  return store.get(key(userId, chatId)) || [];
}

export function addMessage(userId, chatId, role, content) {
  const k = key(userId, chatId);
  const history = store.get(k) || [];
  history.push({ role, content });
  if (history.length > MAX_HISTORY) history.splice(0, history.length - MAX_HISTORY);
  store.set(k, history);
}

export function clearHistory(userId, chatId) {
  store.delete(key(userId, chatId));
}
