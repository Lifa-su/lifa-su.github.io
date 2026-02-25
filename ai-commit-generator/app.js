// === State ===
const $ = (id) => document.getElementById(id);
const KEY_STORAGE = 'deepseek_api_key';

// Load saved API key
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem(KEY_STORAGE);
  if (saved) $('apiKey').value = saved;
  $('diffInput').addEventListener('input', updateStats);
});

// === Toggle API key visibility ===
function toggleKey() {
  const input = $('apiKey');
  input.type = input.type === 'password' ? 'text' : 'password';
}

// === Diff stats ===
function updateStats() {
  const diff = $('diffInput').value;
  if (!diff.trim()) {
    $('diffStats').innerHTML = '';
    return;
  }
  const lines = diff.split('\n');
  let adds = 0, dels = 0, files = new Set();
  for (const line of lines) {
    if (line.startsWith('+++ b/') || line.startsWith('--- a/')) {
      const f = line.slice(6);
      if (f && f !== '/dev/null') files.add(f);
    } else if (line.startsWith('+') && !line.startsWith('+++')) {
      adds++;
    } else if (line.startsWith('-') && !line.startsWith('---')) {
      dels++;
    }
  }
  $('diffStats').innerHTML =
    `<span>${files.size} 个文件</span>` +
    `<span class="add">+${adds} 行</span>` +
    `<span class="del">-${dels} 行</span>`;
}

// === Build prompt ===
function buildPrompt(diff, lang, detail) {
  const langInstr = lang === 'zh'
    ? '请用中文撰写 commit message。'
    : 'Write the commit message in English.';

  const detailInstr = {
    concise: '只需一行标题，不需要 body。保持极简。',
    standard: '包含一行标题和简短的 body（2-3 行），说明主要变更。',
    detailed: '包含标题、详细的 body 说明变更原因和内容，以及影响范围。如有 breaking changes 请注明。'
  }[detail];

  return `你是一个 Git commit message 专家。请根据以下 git diff 生成规范的 Conventional Commits 格式的 commit message。

规则：
1. 使用 Conventional Commits 格式：<type>(<scope>): <description>
2. type 包括：feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
3. scope 是可选的，表示影响范围
4. description 用祈使语气，首字母小写，不加句号
5. ${detailInstr}
6. ${langInstr}
7. 只输出 commit message 本身，不要加任何解释或 markdown 格式

Git Diff:
\`\`\`
${diff.slice(0, 12000)}
\`\`\``;
}

// === Show error ===
function showError(msg) {
  const el = $('errorMsg');
  el.textContent = msg;
  el.classList.add('visible');
}

function hideError() {
  $('errorMsg').classList.remove('visible');
}

// === Generate ===
async function generate() {
  hideError();
  const apiKey = $('apiKey').value.trim();
  const diff = $('diffInput').value.trim();
  const lang = $('lang').value;
  const detail = $('detail').value;

  if (!apiKey) { showError('请输入 DeepSeek API Key'); return; }
  if (!diff) { showError('请粘贴 git diff 内容'); return; }

  // Save key
  localStorage.setItem(KEY_STORAGE, apiKey);

  // UI loading state
  const btn = $('generateBtn');
  const spinner = $('spinner');
  const btnText = $('btnText');
  btn.disabled = true;
  spinner.style.display = 'block';
  btnText.textContent = '生成中...';

  try {
    const resp = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that generates git commit messages.' },
          { role: 'user', content: buildPrompt(diff, lang, detail) }
        ],
        temperature: 0.3,
        max_tokens: 500
      })
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(err.error?.message || `API 请求失败 (${resp.status})`);
    }

    const data = await resp.json();
    const message = data.choices?.[0]?.message?.content?.trim();
    if (!message) throw new Error('API 返回为空');

    // Show result
    $('commitOutput').textContent = message;
    $('resultCard').classList.add('visible');
    $('resultCard').scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  } catch (err) {
    showError(err.message || '生成失败，请检查 API Key 和网络');
  } finally {
    btn.disabled = false;
    spinner.style.display = 'none';
    btnText.textContent = '✨ 生成 Commit Message';
  }
}

// === Copy ===
async function copyResult() {
  const text = $('commitOutput').textContent;
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    $('copyIcon').textContent = '✅';
    $('copyText').textContent = '已复制';
    const btn = $('copyIcon').parentElement;
    btn.classList.add('copied');
    setTimeout(() => {
      $('copyIcon').textContent = '📋';
      $('copyText').textContent = '复制';
      btn.classList.remove('copied');
    }, 2000);
  } catch {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    $('copyText').textContent = '已复制';
    setTimeout(() => { $('copyText').textContent = '复制'; }, 2000);
  }
}

// === Keyboard shortcut ===
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
    e.preventDefault();
    generate();
  }
});
