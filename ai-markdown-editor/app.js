/* ============================================
   AI Markdown Editor - Main Application
   ============================================ */

// === State ===
const state = {
  currentDocId: null,
  docs: {},           // { id: { name, content, updatedAt } }
  autoSaveTimer: null,
  aiSettings: { apiKey: '', apiUrl: 'https://api.deepseek.com/v1/chat/completions', model: 'deepseek-chat' },
  tocVisible: false,
  sidebarVisible: false,
};

// === DOM Refs ===
const $ = (sel) => document.querySelector(sel);
const editor = $('#editor');
const preview = $('#preview');
const docNameEl = $('#doc-name');
const tocPanel = $('#toc-panel');
const tocContent = $('#toc-content');
const saveStatus = $('#save-status');
const wordCountEl = $('#word-count');
const cursorPosEl = $('#cursor-pos');
const aiStatusEl = $('#ai-status');
const docSidebar = $('#doc-sidebar');
const docList = $('#doc-list');
const aiMenu = $('#ai-menu');

// === Init ===
function init() {
  loadAISettings();
  loadDocs();
  setupMarked();
  setupEditor();
  setupResizer();
  setupShortcuts();
  updatePreview();
  updateStats();
}

// === Marked Setup ===
function setupMarked() {
  marked.setOptions({
    highlight: (code, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    },
    breaks: true,
    gfm: true,
  });
}

// === Editor Setup ===
function setupEditor() {
  editor.addEventListener('input', onEditorInput);
  editor.addEventListener('keydown', onEditorKeydown);
  editor.addEventListener('click', () => hideAIMenu());
  editor.addEventListener('scroll', syncScroll);
  editor.addEventListener('keyup', updateCursorPos);
  editor.addEventListener('click', updateCursorPos);
  docNameEl.addEventListener('blur', () => {
    if (state.currentDocId) {
      state.docs[state.currentDocId].name = docNameEl.textContent.trim() || '未命名文档';
      saveDocs();
      renderDocList();
    }
  });
  docNameEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); docNameEl.blur(); } });
}

let renderTimeout = null;
function onEditorInput() {
  clearTimeout(renderTimeout);
  renderTimeout = setTimeout(() => {
    updatePreview();
    updateStats();
    updateTOC();
    scheduleSave();
  }, 150);
}

function onEditorKeydown(e) {
  // Tab support
  if (e.key === 'Tab') {
    e.preventDefault();
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    if (e.shiftKey) {
      // Unindent
      const before = editor.value.substring(0, start);
      const lastNewline = before.lastIndexOf('\n');
      const lineStart = lastNewline + 1;
      const linePrefix = editor.value.substring(lineStart, start);
      if (linePrefix.startsWith('  ')) {
        editor.value = editor.value.substring(0, lineStart) + editor.value.substring(lineStart + 2);
        editor.selectionStart = editor.selectionEnd = start - 2;
      }
    } else {
      editor.value = editor.value.substring(0, start) + '  ' + editor.value.substring(end);
      editor.selectionStart = editor.selectionEnd = start + 2;
    }
    onEditorInput();
  }
}

// === Preview ===
function updatePreview() {
  const md = editor.value;
  preview.innerHTML = marked.parse(md);
  // Re-highlight any code blocks
  preview.querySelectorAll('pre code').forEach(block => {
    hljs.highlightElement(block);
  });
}

function syncScroll() {
  const pct = editor.scrollTop / (editor.scrollHeight - editor.clientHeight || 1);
  preview.scrollTop = pct * (preview.scrollHeight - preview.clientHeight);
}

// === Stats ===
function updateStats() {
  const text = editor.value;
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  // Chinese character count
  const cjk = (text.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length;
  const totalWords = words + cjk;
  const readMin = Math.max(1, Math.ceil(totalWords / 300));
  wordCountEl.textContent = `${chars} 字符 · ${totalWords} 词 · 约 ${readMin} 分钟`;
  $('#stats').textContent = `${totalWords} 词 · ${readMin} min`;
}

function updateCursorPos() {
  const pos = editor.selectionStart;
  const lines = editor.value.substring(0, pos).split('\n');
  const line = lines.length;
  const col = lines[lines.length - 1].length + 1;
  cursorPosEl.textContent = `行 ${line}, 列 ${col}`;
}

// === TOC ===
function toggleTOC() {
  state.tocVisible = !state.tocVisible;
  tocPanel.classList.toggle('hidden', !state.tocVisible);
  if (state.tocVisible) updateTOC();
}

function updateTOC() {
  if (!state.tocVisible) return;
  const headings = editor.value.match(/^#{1,6}\s+.+$/gm) || [];
  tocContent.innerHTML = headings.map((h, i) => {
    const level = h.match(/^#+/)[0].length;
    const text = h.replace(/^#+\s+/, '');
    return `<a class="toc-h${level}" style="padding-left:${(level - 1) * 12}px" onclick="scrollToHeading(${i})">${text}</a>`;
  }).join('');
}

function scrollToHeading(index) {
  const headings = preview.querySelectorAll('h1, h2, h3, h4, h5, h6');
  if (headings[index]) {
    headings[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// === Toolbar Insert ===
function insertMarkdown(type) {
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const selected = editor.value.substring(start, end);
  let before = '', after = '', newCursorOffset = 0;

  switch (type) {
    case 'heading':
      before = '## '; newCursorOffset = 3; break;
    case 'bold':
      before = '**'; after = '**';
      newCursorOffset = selected ? selected.length + 4 : 2; break;
    case 'italic':
      before = '*'; after = '*';
      newCursorOffset = selected ? selected.length + 2 : 1; break;
    case 'strikethrough':
      before = '~~'; after = '~~';
      newCursorOffset = selected ? selected.length + 4 : 2; break;
    case 'link':
      before = '['; after = '](url)';
      newCursorOffset = selected ? selected.length + 3 : 1; break;
    case 'image':
      before = '![alt]('; after = ')';
      newCursorOffset = 7; break;
    case 'code':
      before = '\n```\n'; after = '\n```\n';
      newCursorOffset = 5; break;
    case 'table':
      before = '\n| 列1 | 列2 | 列3 |\n| --- | --- | --- |\n| 内容 | 内容 | 内容 |\n';
      newCursorOffset = before.length; break;
    case 'quote':
      before = '> '; newCursorOffset = 2; break;
    case 'list':
      before = '- '; newCursorOffset = 2; break;
    case 'hr':
      before = '\n---\n'; newCursorOffset = 5; break;
  }

  editor.value = editor.value.substring(0, start) + before + selected + after + editor.value.substring(end);
  editor.selectionStart = editor.selectionEnd = start + newCursorOffset;
  editor.focus();
  onEditorInput();
}

// === Keyboard Shortcuts ===
function setupShortcuts() {
  document.addEventListener('keydown', (e) => {
    const mod = e.ctrlKey || e.metaKey;
    if (!mod) return;

    switch (e.key.toLowerCase()) {
      case 'b': e.preventDefault(); insertMarkdown('bold'); break;
      case 'i': e.preventDefault(); insertMarkdown('italic'); break;
      case 'k': e.preventDefault(); insertMarkdown('link'); break;
      case 's': e.preventDefault(); saveNow(); break;
      case 'e': e.preventDefault(); exportHTML(); break;
      case '1': e.preventDefault(); insertHeading(1); break;
      case '2': e.preventDefault(); insertHeading(2); break;
      case '3': e.preventDefault(); insertHeading(3); break;
      case 'n':
        if (e.shiftKey) { e.preventDefault(); newDocument(); }
        break;
    }
  });
}

function insertHeading(level) {
  const start = editor.selectionStart;
  const prefix = '#'.repeat(level) + ' ';
  // Find line start
  const before = editor.value.substring(0, start);
  const lineStart = before.lastIndexOf('\n') + 1;
  const lineEnd = editor.value.indexOf('\n', start);
  const line = editor.value.substring(lineStart, lineEnd === -1 ? undefined : lineEnd);
  const cleaned = line.replace(/^#+\s*/, '');
  const newLine = prefix + cleaned;
  editor.value = editor.value.substring(0, lineStart) + newLine + editor.value.substring(lineEnd === -1 ? editor.value.length : lineEnd);
  editor.selectionStart = editor.selectionEnd = lineStart + newLine.length;
  editor.focus();
  onEditorInput();
}

// === Resizer ===
function setupResizer() {
  const resizer = $('#resizer');
  const editorPane = $('.editor-pane');
  const previewPane = $('.preview-pane');
  let isResizing = false;

  resizer.addEventListener('mousedown', (e) => {
    isResizing = true;
    resizer.classList.add('active');
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    const container = $('.editor-container');
    const rect = container.getBoundingClientRect();
    const tocWidth = state.tocVisible ? tocPanel.offsetWidth : 0;
    const available = rect.width - tocWidth - 4; // 4 = resizer width
    const offset = e.clientX - rect.left - tocWidth;
    const pct = Math.max(0.2, Math.min(0.8, offset / available));
    editorPane.style.flex = 'none';
    previewPane.style.flex = 'none';
    editorPane.style.width = (pct * available) + 'px';
    previewPane.style.width = ((1 - pct) * available) + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (isResizing) {
      isResizing = false;
      resizer.classList.remove('active');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
  });
}

// === Document Management ===
function loadDocs() {
  try {
    const saved = localStorage.getItem('md-editor-docs');
    if (saved) state.docs = JSON.parse(saved);
    const currentId = localStorage.getItem('md-editor-current');
    if (currentId && state.docs[currentId]) {
      switchDoc(currentId);
    } else {
      const ids = Object.keys(state.docs);
      if (ids.length > 0) {
        switchDoc(ids[0]);
      } else {
        newDocument();
      }
    }
  } catch {
    newDocument();
  }
  renderDocList();
}

function saveDocs() {
  if (state.currentDocId) {
    state.docs[state.currentDocId].content = editor.value;
    state.docs[state.currentDocId].updatedAt = Date.now();
  }
  localStorage.setItem('md-editor-docs', JSON.stringify(state.docs));
  localStorage.setItem('md-editor-current', state.currentDocId);
}

function newDocument() {
  const id = 'doc_' + Date.now();
  state.docs[id] = { name: '未命名文档', content: '', updatedAt: Date.now() };
  switchDoc(id);
  saveDocs();
  renderDocList();
}

function switchDoc(id) {
  // Save current first
  if (state.currentDocId && state.docs[state.currentDocId]) {
    state.docs[state.currentDocId].content = editor.value;
  }
  state.currentDocId = id;
  const doc = state.docs[id];
  editor.value = doc.content;
  docNameEl.textContent = doc.name;
  updatePreview();
  updateStats();
  updateTOC();
  renderDocList();
  saveDocs();
}

function deleteDoc(id) {
  if (Object.keys(state.docs).length <= 1) return; // Keep at least one
  delete state.docs[id];
  if (state.currentDocId === id) {
    const ids = Object.keys(state.docs);
    switchDoc(ids[0]);
  }
  saveDocs();
  renderDocList();
}

function renderDocList() {
  const ids = Object.keys(state.docs).sort((a, b) => (state.docs[b].updatedAt || 0) - (state.docs[a].updatedAt || 0));
  docList.innerHTML = ids.map(id => {
    const doc = state.docs[id];
    const active = id === state.currentDocId ? 'active' : '';
    const date = new Date(doc.updatedAt || 0).toLocaleString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const preview = (doc.content || '').substring(0, 60).replace(/\n/g, ' ') || '空文档';
    return `<div class="doc-item ${active}" onclick="switchDoc('${id}')">
      <div class="doc-item-name">${escapeHtml(doc.name)}</div>
      <div class="doc-item-preview">${escapeHtml(preview)}</div>
      <div class="doc-item-meta">
        <span>${date}</span>
        ${ids.length > 1 ? `<button class="doc-delete" onclick="event.stopPropagation();deleteDoc('${id}')">🗑️</button>` : ''}
      </div>
    </div>`;
  }).join('');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// === Auto Save ===
function scheduleSave() {
  clearTimeout(state.autoSaveTimer);
  saveStatus.textContent = '💾 保存中...';
  state.autoSaveTimer = setTimeout(saveNow, 1000);
}

function saveNow() {
  saveDocs();
  saveStatus.textContent = '✅ 已保存';
}

// === Document Sidebar ===
function toggleDocSidebar() {
  state.sidebarVisible = !state.sidebarVisible;
  docSidebar.classList.toggle('hidden', !state.sidebarVisible);
  if (state.sidebarVisible) renderDocList();
}

// === Export ===
function exportHTML() {
  const html = `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="UTF-8"><title>${escapeHtml(state.docs[state.currentDocId]?.name || 'Document')}</title>
<style>body{max-width:800px;margin:40px auto;padding:0 20px;font-family:-apple-system,system-ui,sans-serif;line-height:1.8;color:#333}
h1,h2,h3{margin-top:1.5em}code{background:#f4f4f4;padding:2px 6px;border-radius:3px;font-size:0.9em}
pre{background:#282c34;color:#abb2bf;padding:16px;border-radius:8px;overflow-x:auto}
pre code{background:transparent;color:inherit}blockquote{border-left:4px solid #7c6ff7;padding:0.5em 1em;margin:1em 0;color:#666}
table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:8px 12px}th{background:#f8f8f8}
img{max-width:100%}</style></head><body>${preview.innerHTML}</body></html>`;
  downloadFile(html, (state.docs[state.currentDocId]?.name || 'document') + '.html', 'text/html');
}

function exportPDF() {
  const el = preview.cloneNode(true);
  el.style.padding = '20px';
  el.style.background = 'white';
  el.style.color = '#333';
  const opt = {
    margin: [10, 10],
    filename: (state.docs[state.currentDocId]?.name || 'document') + '.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };
  html2pdf().set(opt).from(el).save();
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// === AI Features ===
function loadAISettings() {
  try {
    const saved = localStorage.getItem('md-editor-ai');
    if (saved) Object.assign(state.aiSettings, JSON.parse(saved));
  } catch {}
}

function openAISettings() {
  $('#api-key-input').value = state.aiSettings.apiKey;
  $('#api-url-input').value = state.aiSettings.apiUrl;
  $('#api-model-input').value = state.aiSettings.model;
  $('#ai-settings-modal').classList.remove('hidden');
}

function closeAISettings() {
  $('#ai-settings-modal').classList.add('hidden');
}

function saveAISettings() {
  state.aiSettings.apiKey = $('#api-key-input').value.trim();
  state.aiSettings.apiUrl = $('#api-url-input').value.trim();
  state.aiSettings.model = $('#api-model-input').value.trim();
  localStorage.setItem('md-editor-ai', JSON.stringify(state.aiSettings));
  closeAISettings();
}

function showAIMenu() {
  const btn = $('.ai-btn');
  const rect = btn.getBoundingClientRect();
  aiMenu.style.top = (rect.bottom + 4) + 'px';
  aiMenu.style.left = rect.left + 'px';
  aiMenu.classList.toggle('hidden');
}

function hideAIMenu() {
  aiMenu.classList.add('hidden');
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.ai-btn') && !e.target.closest('.ai-menu')) {
    hideAIMenu();
  }
});

async function aiAction(action) {
  hideAIMenu();
  if (!state.aiSettings.apiKey) {
    openAISettings();
    return;
  }

  const selected = editor.value.substring(editor.selectionStart, editor.selectionEnd);
  const context = selected || editor.value.substring(Math.max(0, editor.selectionStart - 2000), editor.selectionStart);

  if (!context.trim()) {
    aiStatusEl.textContent = '⚠️ 请先输入或选择文本';
    setTimeout(() => aiStatusEl.textContent = '', 3000);
    return;
  }

  const prompts = {
    continue: `请续写以下Markdown内容，保持相同的风格和语气，直接输出续写内容（Markdown格式），不要解释：\n\n${context}`,
    rewrite: `请改写以下内容，使其更加流畅、专业，保持原意，直接输出改写后的内容（Markdown格式），不要解释：\n\n${context}`,
    translate: `请将以下内容翻译为${detectLang(context) === 'zh' ? '英文' : '中文'}，直接输出翻译结果（Markdown格式），不要解释：\n\n${context}`,
    summarize: `请为以下内容生成简洁的摘要，直接输出摘要（Markdown格式），不要解释：\n\n${context}`,
  };

  aiStatusEl.innerHTML = '<span class="ai-loading">🤖 AI 思考中...</span>';

  try {
    const response = await fetch(state.aiSettings.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.aiSettings.apiKey}`,
      },
      body: JSON.stringify({
        model: state.aiSettings.model,
        messages: [
          { role: 'system', content: '你是一个专业的写作助手，擅长Markdown格式的内容创作。' },
          { role: 'user', content: prompts[action] },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`API 错误 (${response.status}): ${err}`);
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || '';

    if (!result) throw new Error('AI 返回为空');

    // Insert result
    const pos = editor.selectionEnd || editor.value.length;
    if (selected && (action === 'rewrite' || action === 'translate' || action === 'summarize')) {
      // Replace selection
      editor.value = editor.value.substring(0, editor.selectionStart) + result + editor.value.substring(editor.selectionEnd);
    } else {
      // Insert at cursor
      const insert = '\n\n' + result;
      editor.value = editor.value.substring(0, pos) + insert + editor.value.substring(pos);
      editor.selectionStart = editor.selectionEnd = pos + insert.length;
    }

    onEditorInput();
    aiStatusEl.textContent = '✅ AI 完成';
    setTimeout(() => aiStatusEl.textContent = '', 3000);
  } catch (err) {
    aiStatusEl.textContent = '❌ ' + err.message;
    console.error('AI Error:', err);
    setTimeout(() => aiStatusEl.textContent = '', 5000);
  }
}

function detectLang(text) {
  const cjk = (text.match(/[\u4e00-\u9fff]/g) || []).length;
  return cjk > text.length * 0.1 ? 'zh' : 'en';
}

// === Start ===
init();
