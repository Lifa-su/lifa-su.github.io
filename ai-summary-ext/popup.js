// ============================================================
// AI Summary - Popup Script
// ============================================================

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

let currentLength = 'medium';
let currentResult = null;

// ---- 初始化 ----
document.addEventListener('DOMContentLoaded', async () => {
  await loadSettings();
  await updateUsage();
  bindEvents();
});

// ---- 事件绑定 ----
function bindEvents() {
  // 摘要按钮
  $('#btn-summarize').addEventListener('click', doSummarize);

  // 长度选择
  $$('.length-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.length-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentLength = btn.dataset.length;
    });
  });

  // 设置面板
  $('#btn-settings').addEventListener('click', () => togglePanel('settings-panel', true));
  $('#close-settings').addEventListener('click', () => togglePanel('settings-panel', false));
  $('#save-settings').addEventListener('click', saveSettings);
  $('#toggle-key-vis').addEventListener('click', () => {
    const input = $('#api-key-input');
    input.type = input.type === 'password' ? 'text' : 'password';
  });

  // 历史面板
  $('#btn-history').addEventListener('click', () => {
    loadHistory();
    togglePanel('history-panel', true);
  });
  $('#close-history').addEventListener('click', () => togglePanel('history-panel', false));
  $('#clear-history').addEventListener('click', clearHistory);

  // 结果操作
  $('#btn-copy').addEventListener('click', copySummary);
  $('#btn-export').addEventListener('click', exportMarkdown);
  $('#btn-retry').addEventListener('click', doSummarize);

  // 升级链接
  $('#upgrade-link').addEventListener('click', (e) => {
    e.preventDefault();
    showToast('Pro 版即将上线，敬请期待！');
  });
}

// ---- 核心：执行摘要 ----
async function doSummarize() {
  const btn = $('#btn-summarize');
  const btnText = btn.querySelector('.btn-text');
  const btnLoading = btn.querySelector('.btn-loading');

  // 检查 API Key
  const { apiKey } = await chrome.storage.local.get('apiKey');
  if (!apiKey) {
    togglePanel('settings-panel', true);
    showToast('请先配置 API Key');
    return;
  }

  // UI: loading 状态
  btn.disabled = true;
  btnText.classList.add('hidden');
  btnLoading.classList.remove('hidden');
  $('#error-area').classList.add('hidden');
  $('#result-area').classList.add('hidden');

  try {
    // 获取当前 tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) throw new Error('无法获取当前标签页');

    // 注入 content script
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });
    } catch (e) {
      // chrome:// 等页面无法注入
      if (e.message.includes('Cannot access')) {
        throw new Error('无法在此页面使用（系统页面不支持）');
      }
    }

    // 提取内容
    const content = await chrome.tabs.sendMessage(tab.id, { action: 'extractContent' });
    if (!content || !content.text || content.text.length < 50) {
      throw new Error('页面内容太少，无法生成摘要');
    }

    // 调用 background 处理
    const result = await sendMessage({
      action: 'summarize',
      content: content.text,
      title: content.title,
      url: content.url,
      length: currentLength
    });

    if (result.error) throw new Error(result.error);

    // 显示结果
    currentResult = {
      title: content.title,
      url: content.url,
      summary: result.summary
    };

    $('#page-title').textContent = content.title;
    $('#summary-content').textContent = result.summary;
    $('#result-area').classList.remove('hidden');

    // 更新用量
    await updateUsage();

  } catch (err) {
    showError(err.message);
  } finally {
    btn.disabled = false;
    btnText.classList.remove('hidden');
    btnLoading.classList.add('hidden');
  }
}

// ---- 设置 ----
async function loadSettings() {
  const { apiKey, defaultLength } = await chrome.storage.local.get(['apiKey', 'defaultLength']);
  if (apiKey) $('#api-key-input').value = apiKey;
  if (defaultLength) {
    currentLength = defaultLength;
    $$('.length-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.length === defaultLength);
    });
    $('#default-length').value = defaultLength;
  }
}

async function saveSettings() {
  const apiKey = $('#api-key-input').value.trim();
  const defaultLength = $('#default-length').value;

  if (!apiKey) {
    showToast('请输入 API Key');
    return;
  }

  await chrome.storage.local.set({ apiKey, defaultLength });
  currentLength = defaultLength;
  $$('.length-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.length === defaultLength);
  });

  togglePanel('settings-panel', false);
  showToast('设置已保存 ✓');
}

// ---- 用量 ----
async function updateUsage() {
  const result = await sendMessage({ action: 'getUsage' });
  const remaining = result.isPro ? '∞' : `${result.limit - result.used}/${result.limit}`;
  $('#usage-text').textContent = `今日剩余: ${remaining} 次`;
  if (result.isPro) {
    $('#upgrade-link').textContent = 'Pro ✨';
    $('#upgrade-link').style.pointerEvents = 'none';
  }
}

// ---- 历史记录 ----
async function loadHistory() {
  const history = await sendMessage({ action: 'getHistory' });
  const list = $('#history-list');
  const empty = $('#history-empty');

  list.innerHTML = '';

  if (!history || history.length === 0) {
    empty.classList.remove('hidden');
    list.classList.add('hidden');
    return;
  }

  empty.classList.add('hidden');
  list.classList.remove('hidden');

  history.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'history-item';
    const date = new Date(item.timestamp);
    const timeStr = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
    div.innerHTML = `
      <div class="history-item-title">${escapeHtml(item.title || '无标题')}</div>
      <div class="history-item-summary">${escapeHtml(item.summary?.substring(0, 80) || '')}...</div>
      <div class="history-item-meta">${timeStr}</div>
    `;
    div.addEventListener('click', () => {
      currentResult = item;
      $('#page-title').textContent = item.title;
      $('#summary-content').textContent = item.summary;
      $('#result-area').classList.remove('hidden');
      togglePanel('history-panel', false);
    });
    list.appendChild(div);
  });
}

async function clearHistory() {
  await sendMessage({ action: 'clearHistory' });
  loadHistory();
  showToast('历史已清空');
}

// ---- 复制 & 导出 ----
function copySummary() {
  if (!currentResult) return;
  navigator.clipboard.writeText(currentResult.summary).then(() => {
    showToast('已复制到剪贴板 ✓');
  });
}

function exportMarkdown() {
  if (!currentResult) return;
  const md = `# ${currentResult.title}\n\n> 来源: ${currentResult.url}\n> 生成时间: ${new Date().toLocaleString()}\n\n## 摘要\n\n${currentResult.summary}\n`;

  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `summary-${Date.now()}.md`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('已导出 Markdown ✓');
}

// ---- 工具函数 ----
function togglePanel(id, show) {
  $(`#${id}`).classList.toggle('hidden', !show);
}

function showError(msg) {
  $('#error-msg').textContent = msg;
  $('#error-area').classList.remove('hidden');
}

function showToast(msg) {
  const toast = $('#toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 2000);
}

function sendMessage(msg) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(msg, (response) => {
      resolve(response || {});
    });
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
