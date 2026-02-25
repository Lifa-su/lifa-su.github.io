// === Templates ===
const TEMPLATES = [
  { name: '📧 邮箱地址', regex: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', desc: 'Email address' },
  { name: '📱 中国手机号', regex: '1[3-9]\\d{9}', desc: 'China mobile' },
  { name: '🌐 URL', regex: 'https?://[\\w\\-]+(\\.[\\w\\-]+)+[/\\w\\-.~:/?#\\[\\]@!$&\'()*+,;=%]*', desc: 'HTTP(S) URL' },
  { name: '🔢 IPv4 地址', regex: '(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)', desc: 'IPv4' },
  { name: '🆔 身份证号', regex: '[1-9]\\d{5}(?:19|20)\\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\\d|3[01])\\d{3}[\\dXx]', desc: '18-digit ID' },
  { name: '📮 邮政编码', regex: '[1-9]\\d{5}(?!\\d)', desc: 'China postal code' },
  { name: '🔤 中文字符', regex: '[\\u4e00-\\u9fa5]+', desc: 'Chinese characters' },
  { name: '#️⃣ 整数', regex: '-?\\d+', desc: 'Integer' },
  { name: '💰 金额', regex: '\\d+(?:\\.\\d{1,2})?', desc: 'Amount (2 decimals)' },
  { name: '📅 日期 YYYY-MM-DD', regex: '\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])', desc: 'Date format' },
  { name: '⏰ 时间 HH:MM', regex: '(?:[01]\\d|2[0-3]):[0-5]\\d', desc: 'Time 24h' },
  { name: '🏷️ HTML 标签', regex: '<([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*>.*?</\\1>', desc: 'HTML tag pair' },
];

// === State ===
let currentRegex = '';

// === Init ===
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('deepseek_api_key');
  if (saved) document.getElementById('apiKey').value = saved;
  document.getElementById('apiKey').addEventListener('change', e => {
    localStorage.setItem('deepseek_api_key', e.target.value.trim());
  });
  document.getElementById('regexInput').addEventListener('input', runTest);
  renderTemplates();
});

// === Render Templates ===
function renderTemplates() {
  const grid = document.getElementById('templatesGrid');
  grid.innerHTML = TEMPLATES.map((t, i) => `
    <div class="tpl-btn" onclick="useTemplate(${i})">
      <div class="tpl-name">${t.name}</div>
      <div class="tpl-regex">${escapeHtml(t.regex)}</div>
    </div>
  `).join('');
}

function useTemplate(i) {
  const t = TEMPLATES[i];
  currentRegex = t.regex;
  document.getElementById('regexInput').value = t.regex;
  document.getElementById('resultBox').style.display = 'block';
  document.getElementById('regexDisplay').textContent = t.regex;
  document.getElementById('explanation').textContent = '';
  runTest();
  showToast(`已加载模板: ${t.name}`);
}

// === Generate ===
async function generate() {
  const apiKey = document.getElementById('apiKey').value.trim();
  if (!apiKey) { showToast('⚠️ 请先输入 DeepSeek API Key'); return; }
  const desc = document.getElementById('nlInput').value.trim();
  if (!desc) { showToast('⚠️ 请输入自然语言描述'); return; }
  const lang = document.getElementById('langSelect').value;
  const btn = document.getElementById('generateBtn');
  const genText = document.getElementById('genText');
  btn.disabled = true;
  genText.innerHTML = '<span class="spinner"></span> 生成中...';
  document.getElementById('explanation').textContent = '';
  document.getElementById('resultBox').style.display = 'none';

  const langNames = { javascript: 'JavaScript', python: 'Python', java: 'Java' };
  const prompt = `你是正则表达式专家。根据用户的自然语言描述，生成对应的正则表达式。

要求：
1. 生成适用于 ${langNames[lang]} 的正则表达式
2. 只输出正则表达式本体（不要包含语言特定的定界符，如 JS 的 /.../ 或 Python 的 r"..."）
3. 然后换行输出 "---"
4. 最后用中文逐段解释正则表达式每个部分的含义

用户描述：${desc}`;

  try {
    const resp = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 1024,
      }),
    });
    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(err.error?.message || `API 错误: ${resp.status}`);
    }
    const data = await resp.json();
    const text = data.choices?.[0]?.message?.content || '';
    parseResult(text);
  } catch (e) {
    showToast('❌ ' + e.message);
  } finally {
    btn.disabled = false;
    genText.textContent = '🚀 生成正则';
  }
}

function parseResult(text) {
  const parts = text.split('---');
  let regex = '', explanation = '';
  if (parts.length >= 2) {
    regex = parts[0].trim().replace(/^```[a-z]*\n?/gm, '').replace(/```$/gm, '').trim();
    explanation = parts.slice(1).join('---').trim();
  } else {
    const lines = text.trim().split('\n');
    regex = lines[0].replace(/^```[a-z]*\n?/gm, '').replace(/```$/gm, '').replace(/^`|`$/g, '').trim();
    explanation = lines.slice(1).join('\n').trim();
  }
  // Clean up common wrapping
  regex = regex.replace(/^\/(.*)\/[gimsuy]*$/, '$1');
  regex = regex.replace(/^r?"(.*)"$/, '$1').replace(/^r?'(.*)'$/, '$1');

  currentRegex = regex;
  document.getElementById('resultBox').style.display = 'block';
  document.getElementById('regexDisplay').textContent = regex;
  document.getElementById('regexInput').value = regex;
  document.getElementById('explanation').textContent = explanation;
  runTest();
}

// === Test ===
function runTest() {
  const regexStr = document.getElementById('regexInput').value.trim();
  const testText = document.getElementById('testInput').value;
  const resultsEl = document.getElementById('matchResults');
  const countEl = document.getElementById('matchCount');

  if (!regexStr || !testText) {
    resultsEl.innerHTML = '<span style="color:var(--text2)">匹配结果将在此显示...</span>';
    countEl.textContent = '';
    return;
  }

  let flags = '';
  if (document.getElementById('flagG').checked) flags += 'g';
  if (document.getElementById('flagI').checked) flags += 'i';
  if (document.getElementById('flagM').checked) flags += 'm';
  if (document.getElementById('flagS').checked) flags += 's';

  try {
    const re = new RegExp(regexStr, flags);
    const matches = [];
    let m;
    if (flags.includes('g')) {
      while ((m = re.exec(testText)) !== null) {
        matches.push({ start: m.index, end: m.index + m[0].length, text: m[0] });
        if (m[0].length === 0) re.lastIndex++;
      }
    } else {
      m = re.exec(testText);
      if (m) matches.push({ start: m.index, end: m.index + m[0].length, text: m[0] });
    }

    if (matches.length === 0) {
      resultsEl.innerHTML = '<span style="color:var(--red)">无匹配结果</span>';
      countEl.textContent = '';
      return;
    }

    // Build highlighted text
    let html = '';
    let last = 0;
    for (const mt of matches) {
      html += escapeHtml(testText.slice(last, mt.start));
      html += '<mark>' + escapeHtml(mt.text) + '</mark>';
      last = mt.end;
    }
    html += escapeHtml(testText.slice(last));
    resultsEl.innerHTML = html;
    countEl.innerHTML = `找到 <span>${matches.length}</span> 个匹配`;
  } catch (e) {
    resultsEl.innerHTML = `<span style="color:var(--red)">正则语法错误: ${escapeHtml(e.message)}</span>`;
    countEl.textContent = '';
  }
}

// === Copy ===
function copyRegex() {
  const text = document.getElementById('regexDisplay').textContent;
  navigator.clipboard.writeText(text).then(() => showToast('✅ 已复制到剪贴板'));
}

// === Utils ===
function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}
