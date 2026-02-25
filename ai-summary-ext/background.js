// ============================================================
// AI Summary - Background Service Worker
// 处理快捷键、API调用、使用量管理
// ============================================================

const DAILY_FREE_LIMIT = 5;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

// 摘要长度 prompt 映射
const LENGTH_PROMPTS = {
  short: '请用约100字简洁概括以下网页内容的核心要点。',
  medium: '请用约300字总结以下网页内容，包含主要观点和关键信息。',
  long: '请用约600字详细总结以下网页内容，涵盖所有重要观点、论据和结论。'
};

// ---- 快捷键监听 ----
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'summarize') {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return;

    // 注入 content script
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });
    } catch (e) {
      // 可能已注入，忽略
    }

    // 提取内容
    const response = await chrome.tabs.sendMessage(tab.id, { action: 'extractContent' });
    if (!response || !response.text) return;

    // 获取设置
    const settings = await chrome.storage.local.get(['apiKey', 'defaultLength']);
    if (!settings.apiKey) {
      // 打开 popup 提示设置
      chrome.action.openPopup();
      return;
    }

    // 检查用量
    const canUse = await checkUsage();
    if (!canUse) return;

    // 调用 API
    const summary = await callDeepSeek(
      settings.apiKey,
      response.text,
      settings.defaultLength || 'medium'
    );

    if (summary) {
      await incrementUsage();
      await saveHistory({
        title: response.title,
        url: response.url,
        summary: summary,
        length: settings.defaultLength || 'medium',
        timestamp: Date.now()
      });
    }
  }
});

// ---- DeepSeek API 调用 ----
async function callDeepSeek(apiKey, content, length) {
  const systemPrompt = `你是一个专业的内容摘要助手。请根据用户提供的网页内容生成高质量摘要。
规则：
1. 自动识别内容语言，用相同语言输出摘要
2. 保持客观准确，不添加原文没有的信息
3. 结构清晰，重点突出
4. 如果内容包含代码，简要说明代码功能`;

  const userPrompt = `${LENGTH_PROMPTS[length] || LENGTH_PROMPTS.medium}\n\n---\n\n${content}`;

  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 1500,
      temperature: 0.3,
      stream: false
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `API 错误: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

// ---- 使用量管理 ----
function getTodayKey() {
  return 'usage_' + new Date().toISOString().slice(0, 10);
}

async function checkUsage() {
  const { isPro } = await chrome.storage.local.get('isPro');
  if (isPro) return true;

  const key = getTodayKey();
  const data = await chrome.storage.local.get(key);
  const used = data[key] || 0;
  return used < DAILY_FREE_LIMIT;
}

async function getUsage() {
  const key = getTodayKey();
  const data = await chrome.storage.local.get(key);
  return data[key] || 0;
}

async function incrementUsage() {
  const key = getTodayKey();
  const data = await chrome.storage.local.get(key);
  const used = data[key] || 0;
  await chrome.storage.local.set({ [key]: used + 1 });
}

// ---- 历史记录管理 ----
async function saveHistory(item) {
  const { history = [] } = await chrome.storage.local.get('history');
  history.unshift(item);
  // 最多保留50条
  if (history.length > 50) history.length = 50;
  await chrome.storage.local.set({ history });
}

// ---- 消息处理（来自 popup） ----
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'summarize') {
    handleSummarize(msg).then(sendResponse).catch(err => {
      sendResponse({ error: err.message });
    });
    return true; // async
  }

  if (msg.action === 'getUsage') {
    getUsage().then(used => {
      chrome.storage.local.get('isPro', ({ isPro }) => {
        sendResponse({ used, limit: DAILY_FREE_LIMIT, isPro: !!isPro });
      });
    });
    return true;
  }

  if (msg.action === 'getHistory') {
    chrome.storage.local.get('history', ({ history = [] }) => {
      sendResponse(history);
    });
    return true;
  }

  if (msg.action === 'clearHistory') {
    chrome.storage.local.set({ history: [] }, () => {
      sendResponse({ ok: true });
    });
    return true;
  }
});

async function handleSummarize({ content, title, url, length }) {
  const { apiKey } = await chrome.storage.local.get('apiKey');
  if (!apiKey) {
    throw new Error('请先在设置中配置 DeepSeek API Key');
  }

  const canUse = await checkUsage();
  if (!canUse) {
    throw new Error('今日免费次数已用完，升级 Pro 解锁无限次数 ✨');
  }

  const summary = await callDeepSeek(apiKey, content, length || 'medium');
  await incrementUsage();

  const historyItem = { title, url, summary, length, timestamp: Date.now() };
  await saveHistory(historyItem);

  const used = await getUsage();
  return { summary, used };
}
