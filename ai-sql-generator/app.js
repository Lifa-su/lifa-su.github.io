// ---- State ----
let rawSQL = '';

// ---- DOM helpers ----
const $ = (id) => document.getElementById(id);
const show = (el, cls = 'visible') => el.classList.add(cls);
const hide = (el, cls = 'visible') => el.classList.remove(cls);

// ---- Toast ----
function toast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ---- API Key persistence ----
const apiKeyInput = $('apiKey');
const savedKey = localStorage.getItem('deepseek_api_key');
if (savedKey) {
  apiKeyInput.value = savedKey;
  updateKeyStatus(true);
}
apiKeyInput.addEventListener('input', () => {
  const key = apiKeyInput.value.trim();
  localStorage.setItem('deepseek_api_key', key);
  updateKeyStatus(key.startsWith('sk-'));
});

function updateKeyStatus(ok) {
  $('statusDot').className = 'status-dot ' + (ok ? 'on' : 'off');
  $('statusText').textContent = ok ? '已配置' : '未连接';
}

function getApiKey() {
  const key = apiKeyInput.value.trim();
  if (!key) { toast('请先输入 DeepSeek API Key'); return null; }
  return key;
}

// ---- Tabs ----
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    $('panel-' + tab.dataset.tab).classList.add('active');
  });
});

// ---- Schema toggle ----
$('schemaToggle').addEventListener('click', () => {
  $('schemaBody').classList.toggle('open');
  $('schemaArrow').classList.toggle('open');
});

// ---- Example chips ----
document.querySelectorAll('.example-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    $('nlInput').value = chip.dataset.text;
    $('nlInput').focus();
  });
});

// ---- DeepSeek API call ----
async function callDeepSeek(messages) {
  const key = getApiKey();
  if (!key) throw new Error('NO_KEY');
  const res = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
    body: JSON.stringify({ model: 'deepseek-chat', messages, temperature: 0.1, max_tokens: 2048 })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'API 请求失败: ' + res.status);
  }
  const data = await res.json();
  return data.choices[0].message.content.trim();
}

// ---- SQL Syntax Highlighting ----
function highlightSQL(sql) {
  const esc = sql.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return esc
    // comments
    .replace(/(--.*$)/gm, '<span class="cm">$1</span>')
    .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="cm">$1</span>')
    // strings
    .replace(/('(?:[^'\\]|\\.)*')/g, '<span class="str">$1</span>')
    // numbers
    .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="num">$1</span>')
    // keywords
    .replace(/\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|CROSS|ON|AND|OR|NOT|IN|EXISTS|BETWEEN|LIKE|IS|NULL|AS|ORDER|BY|GROUP|HAVING|LIMIT|OFFSET|UNION|ALL|DISTINCT|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|ALTER|DROP|INDEX|PRIMARY|KEY|FOREIGN|REFERENCES|DEFAULT|AUTO_INCREMENT|SERIAL|IF|ELSE|THEN|END|CASE|WHEN|WITH|RECURSIVE|OVER|PARTITION|ROW_NUMBER|RANK|DENSE_RANK|ASC|DESC|CASCADE|CONSTRAINT|UNIQUE|CHECK|GRANT|REVOKE|TRUNCATE|EXPLAIN|ANALYZE|RETURNING|CONFLICT|DO|NOTHING|REPLACE|IGNORE|TEMPORARY|VIEW|TRIGGER|PROCEDURE|FUNCTION|BEGIN|COMMIT|ROLLBACK|TRANSACTION|FETCH|NEXT|ROWS|ONLY|LATERAL|NATURAL|USING|EXCEPT|INTERSECT|TOP|PIVOT|UNPIVOT|MERGE|MATCHED|OUTPUT|DECLARE|CURSOR|OPEN|CLOSE|DEALLOCATE)\b/gi,
      '<span class="kw">$&</span>')
    // types
    .replace(/\b(INT|INTEGER|BIGINT|SMALLINT|TINYINT|FLOAT|DOUBLE|DECIMAL|NUMERIC|VARCHAR|CHAR|TEXT|BLOB|DATE|DATETIME|TIMESTAMP|TIME|BOOLEAN|BOOL|JSON|JSONB|UUID|BYTEA|REAL|MONEY|INTERVAL|ARRAY|ENUM|SERIAL|BIGSERIAL)\b/gi,
      '<span class="tp">$1</span>')
    // functions
    .replace(/\b(COUNT|SUM|AVG|MIN|MAX|COALESCE|IFNULL|NULLIF|CAST|CONVERT|CONCAT|SUBSTRING|SUBSTR|LENGTH|TRIM|UPPER|LOWER|REPLACE|ROUND|CEIL|FLOOR|ABS|NOW|CURRENT_TIMESTAMP|CURRENT_DATE|DATE_FORMAT|EXTRACT|DATEDIFF|DATEADD|STRFTIME|GROUP_CONCAT|STRING_AGG|ARRAY_AGG|JSON_AGG|ROW_NUMBER|RANK|DENSE_RANK|LAG|LEAD|FIRST_VALUE|LAST_VALUE|NTH_VALUE|NTILE|CUME_DIST|PERCENT_RANK)\b/gi,
      '<span class="fn">$1</span>')
    // operators
    .replace(/([=!<>]+|::|->|->>|\|\|)/g, '<span class="op">$1</span>');
}

// ---- MongoDB output (no SQL highlighting) ----
function highlightMongo(code) {
  const esc = code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return esc
    .replace(/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g, '<span class="str">$1</span>')
    .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="num">$1</span>')
    .replace(/(\$\w+)/g, '<span class="kw">$1</span>')
    .replace(/\b(db|aggregate|find|findOne|insertOne|insertMany|updateOne|updateMany|deleteOne|deleteMany|sort|limit|skip|project|match|group|lookup|unwind|addFields|replaceRoot|count|countDocuments)\b/g,
      '<span class="fn">$1</span>');
}

// ---- Extract raw code from markdown fences ----
function extractCode(text) {
  const m = text.match(/```(?:sql|javascript|js|mongo|json)?\s*\n?([\s\S]*?)```/);
  return m ? m[1].trim() : text.trim();
}

// ---- Generate SQL ----
async function generateSQL() {
  const nl = $('nlInput').value.trim();
  if (!nl) { toast('请输入需求描述'); return; }
  const db = $('dbType').value;
  const qtype = $('queryType').value;
  const schema = $('schemaInput').value.trim();

  let sysPrompt = `你是一个专业的数据库专家。根据用户的自然语言描述生成 ${db} 的查询语句。`;
  if (db === 'MongoDB') {
    sysPrompt += '\n生成 MongoDB 聚合管道或查询语句（JavaScript 格式）。';
  }
  sysPrompt += '\n只输出代码，不要解释。用 ``` 包裹代码。';
  if (qtype !== 'auto') sysPrompt += `\n查询类型: ${qtype}`;

  let userMsg = nl;
  if (schema) userMsg += '\n\n表结构:\n' + schema;

  const btn = $('generateBtn');
  const loading = $('genLoading');
  const output = $('genOutput');

  btn.disabled = true;
  show(loading, 'visible');
  hide(output, 'visible');

  try {
    const result = await callDeepSeek([
      { role: 'system', content: sysPrompt },
      { role: 'user', content: userMsg }
    ]);
    rawSQL = extractCode(result);
    const highlighted = db === 'MongoDB' ? highlightMongo(rawSQL) : highlightSQL(rawSQL);
    $('sqlResult').innerHTML = highlighted;
    show(output, 'visible');
  } catch (e) {
    if (e.message !== 'NO_KEY') toast('生成失败: ' + e.message);
  } finally {
    btn.disabled = false;
    hide(loading, 'visible');
  }
}

// ---- Copy SQL ----
function copySQL() {
  if (!rawSQL) return;
  navigator.clipboard.writeText(rawSQL).then(() => toast('已复制到剪贴板'));
}

// ---- Explain generated SQL ----
function explainGenerated() {
  if (!rawSQL) return;
  // Switch to explain tab
  document.querySelectorAll('.tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  const expTab = document.querySelector('[data-tab="explain"]');
  expTab.classList.add('active');
  expTab.setAttribute('aria-selected','true');
  $('panel-explain').classList.add('active');
  $('sqlInput').value = rawSQL;
  explainSQL();
}

// ---- Explain SQL ----
async function explainSQL() {
  const sql = $('sqlInput').value.trim();
  if (!sql) { toast('请输入 SQL 语句'); return; }

  const btn = $('explainBtn');
  const loading = $('expLoading');
  const output = $('expOutput');

  btn.disabled = true;
  show(loading, 'visible');
  hide(output, 'visible');

  try {
    const result = await callDeepSeek([
      { role: 'system', content: '你是一个数据库专家。请用中文详细解释以下 SQL 语句的含义、执行逻辑和每个关键部分的作用。使用清晰的分点说明。' },
      { role: 'user', content: sql }
    ]);
    $('explainResult').textContent = result;
    show(output, 'visible');
  } catch (e) {
    if (e.message !== 'NO_KEY') toast('解释失败: ' + e.message);
  } finally {
    btn.disabled = false;
    hide(loading, 'visible');
  }
}

// ---- Keyboard shortcut ----
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
    const genPanel = $('panel-generate');
    if (genPanel.classList.contains('active')) generateSQL();
    else explainSQL();
  }
});
