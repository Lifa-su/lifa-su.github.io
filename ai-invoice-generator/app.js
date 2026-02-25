// ============================================================
// AI Invoice Generator - Main Application
// ============================================================

// === i18n Translations ===
const i18n = {
  zh: {
    appName: 'AI 发票生成器',
    history: '历史',
    template: '模板',
    tplMinimal: '简约',
    tplProfessional: '专业',
    tplCreative: '创意',
    currency: '币种',
    from: '发票方（您的信息）',
    to: '客户信息',
    companyName: '公司名称',
    clientName: '客户名称',
    address: '地址',
    phone: '电话',
    email: '邮箱',
    invoiceDetails: '发票详情',
    invoiceNo: '发票编号',
    invoiceDate: '开票日期',
    dueDate: '到期日期',
    lineItems: '项目明细',
    addItem: '+ 添加项目',
    description: '描述',
    qty: '数量',
    price: '单价',
    taxRate: '税率 (%)',
    discount: '折扣 (%)',
    notes: '备注',
    notesPlaceholder: '付款方式、备注信息等...',
    preview: '预览发票',
    exportPDF: '导出 PDF',
    save: '保存',
    clear: '清空',
    previewTitle: '发票预览',
    previewHint: '填写左侧表单后点击"预览发票"查看效果',
    historyTitle: '历史发票',
    settings: '设置',
    apiKeyHint: '用于AI自动补全功能，密钥仅存储在本地浏览器中',
    apiEndpoint: 'API 端点',
    saveSettings: '保存设置',
    aiThinking: 'AI 正在思考...',
    invoice: '发票',
    subtotal: '小计',
    tax: '税额',
    discountLabel: '折扣',
    total: '总计',
    billTo: '收票方',
    billFrom: '开票方',
    itemDesc: '项目描述',
    itemQty: '数量',
    itemPrice: '单价',
    itemAmount: '金额',
    dueDateLabel: '到期日期',
    notesLabel: '备注',
    noHistory: '暂无历史发票',
    loadInvoice: '加载',
    deleteInvoice: '删除',
    savedSuccess: '发票已保存！',
    deletedSuccess: '已删除！',
    clearConfirm: '确定要清空所有内容吗？',
    exportingPDF: '正在生成 PDF...',
    pdfSuccess: 'PDF 已生成！',
    aiOptimize: 'AI优化',
    aiNoKey: '请先在设置中配置 DeepSeek API Key',
    aiError: 'AI 请求失败，请检查 API Key 和网络',
  },
  en: {
    appName: 'AI Invoice Generator',
    history: 'History',
    template: 'Template',
    tplMinimal: 'Minimal',
    tplProfessional: 'Professional',
    tplCreative: 'Creative',
    currency: 'Currency',
    from: 'From (Your Info)',
    to: 'Bill To',
    companyName: 'Company Name',
    clientName: 'Client Name',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    invoiceDetails: 'Invoice Details',
    invoiceNo: 'Invoice No.',
    invoiceDate: 'Invoice Date',
    dueDate: 'Due Date',
    lineItems: 'Line Items',
    addItem: '+ Add Item',
    description: 'Description',
    qty: 'Qty',
    price: 'Price',
    taxRate: 'Tax Rate (%)',
    discount: 'Discount (%)',
    notes: 'Notes',
    notesPlaceholder: 'Payment terms, notes...',
    preview: 'Preview',
    exportPDF: 'Export PDF',
    save: 'Save',
    clear: 'Clear',
    previewTitle: 'Invoice Preview',
    previewHint: 'Fill in the form and click "Preview" to see the invoice',
    historyTitle: 'Invoice History',
    settings: 'Settings',
    apiKeyHint: 'For AI auto-complete. Key is stored locally in your browser only.',
    apiEndpoint: 'API Endpoint',
    saveSettings: 'Save Settings',
    aiThinking: 'AI is thinking...',
    invoice: 'INVOICE',
    subtotal: 'Subtotal',
    tax: 'Tax',
    discountLabel: 'Discount',
    total: 'Total',
    billTo: 'Bill To',
    billFrom: 'From',
    itemDesc: 'Description',
    itemQty: 'Qty',
    itemPrice: 'Unit Price',
    itemAmount: 'Amount',
    dueDateLabel: 'Due Date',
    notesLabel: 'Notes',
    noHistory: 'No invoices yet',
    loadInvoice: 'Load',
    deleteInvoice: 'Delete',
    savedSuccess: 'Invoice saved!',
    deletedSuccess: 'Deleted!',
    clearConfirm: 'Clear all fields?',
    exportingPDF: 'Generating PDF...',
    pdfSuccess: 'PDF generated!',
    aiOptimize: 'AI',
    aiNoKey: 'Please set DeepSeek API Key in Settings first',
    aiError: 'AI request failed. Check API Key and network.',
  }
};

let currentLang = 'zh';

function t(key) {
  return i18n[currentLang][key] || key;
}

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[currentLang][key]) el.textContent = i18n[currentLang][key];
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (i18n[currentLang][key]) el.placeholder = i18n[currentLang][key];
  });
  // Update select options
  document.querySelectorAll('select option[data-i18n]').forEach(opt => {
    const key = opt.getAttribute('data-i18n');
    if (i18n[currentLang][key]) opt.textContent = i18n[currentLang][key];
  });
  document.getElementById('btnLang').textContent = currentLang === 'zh' ? '🌐 EN' : '🌐 中文';
}

// === Currency Formatting ===
const currencySymbols = {
  CNY: '¥', USD: '$', EUR: '€', GBP: '£', JPY: '¥', KRW: '₩', HKD: 'HK$'
};
const currencyLocales = {
  CNY: 'zh-CN', USD: 'en-US', EUR: 'de-DE', GBP: 'en-GB', JPY: 'ja-JP', KRW: 'ko-KR', HKD: 'zh-HK'
};

function formatCurrency(amount, currency) {
  const locale = currencyLocales[currency] || 'en-US';
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
  } catch {
    return currencySymbols[currency] + amount.toFixed(2);
  }
}

// === Line Items Management ===
let lineItems = [{ description: '', qty: 1, price: 0 }];

function renderLineItems() {
  const container = document.getElementById('itemsContainer');
  container.innerHTML = `
    <div class="line-item-labels">
      <span>${t('description')}</span>
      <span>${t('qty')}</span>
      <span>${t('price')}</span>
      <span></span>
    </div>
  `;
  lineItems.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'line-item';
    div.innerHTML = `
      <div class="line-item-desc">
        <input type="text" value="${escapeHtml(item.description)}" placeholder="${t('description')}"
          data-idx="${idx}" data-field="description">
        <button class="btn-ai" onclick="aiOptimizeItem(${idx})" title="${t('aiOptimize')}">✨</button>
      </div>
      <input type="number" value="${item.qty}" min="1" step="1"
        data-idx="${idx}" data-field="qty">
      <input type="number" value="${item.price}" min="0" step="0.01"
        data-idx="${idx}" data-field="price">
      <button class="btn-danger-sm" onclick="removeItem(${idx})" ${lineItems.length === 1 ? 'disabled' : ''}>✕</button>
    `;
    container.appendChild(div);
  });

  // Bind input events
  container.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.idx);
      const field = e.target.dataset.field;
      if (field === 'description') {
        lineItems[idx].description = e.target.value;
      } else if (field === 'qty') {
        lineItems[idx].qty = parseFloat(e.target.value) || 0;
      } else if (field === 'price') {
        lineItems[idx].price = parseFloat(e.target.value) || 0;
      }
    });
  });
}

function addItem() {
  lineItems.push({ description: '', qty: 1, price: 0 });
  renderLineItems();
}

function removeItem(idx) {
  if (lineItems.length > 1) {
    lineItems.splice(idx, 1);
    renderLineItems();
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// === Form Data ===
function getFormData() {
  return {
    template: document.getElementById('selTemplate').value,
    currency: document.getElementById('selCurrency').value,
    from: {
      name: document.getElementById('fromName').value,
      address: document.getElementById('fromAddress').value,
      phone: document.getElementById('fromPhone').value,
      email: document.getElementById('fromEmail').value,
    },
    to: {
      name: document.getElementById('toName').value,
      address: document.getElementById('toAddress').value,
      phone: document.getElementById('toPhone').value,
      email: document.getElementById('toEmail').value,
    },
    invoiceNo: document.getElementById('invoiceNo').value,
    invoiceDate: document.getElementById('invoiceDate').value,
    dueDate: document.getElementById('dueDate').value,
    items: lineItems.map(i => ({ ...i })),
    taxRate: parseFloat(document.getElementById('taxRate').value) || 0,
    discount: parseFloat(document.getElementById('discount').value) || 0,
    notes: document.getElementById('notes').value,
  };
}

function setFormData(data) {
  document.getElementById('selTemplate').value = data.template || 'professional';
  document.getElementById('selCurrency').value = data.currency || 'CNY';
  document.getElementById('fromName').value = data.from?.name || '';
  document.getElementById('fromAddress').value = data.from?.address || '';
  document.getElementById('fromPhone').value = data.from?.phone || '';
  document.getElementById('fromEmail').value = data.from?.email || '';
  document.getElementById('toName').value = data.to?.name || '';
  document.getElementById('toAddress').value = data.to?.address || '';
  document.getElementById('toPhone').value = data.to?.phone || '';
  document.getElementById('toEmail').value = data.to?.email || '';
  document.getElementById('invoiceNo').value = data.invoiceNo || '';
  document.getElementById('invoiceDate').value = data.invoiceDate || '';
  document.getElementById('dueDate').value = data.dueDate || '';
  document.getElementById('taxRate').value = data.taxRate || 0;
  document.getElementById('discount').value = data.discount || 0;
  document.getElementById('notes').value = data.notes || '';
  lineItems = data.items && data.items.length ? data.items : [{ description: '', qty: 1, price: 0 }];
  renderLineItems();
}

function clearForm() {
  if (!confirm(t('clearConfirm'))) return;
  setFormData({});
  document.getElementById('invoicePreview').innerHTML =
    `<div class="preview-placeholder">${t('previewHint')}</div>`;
}

// === Calculations ===
function calculate(data) {
  const subtotal = data.items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const discountAmount = subtotal * (data.discount / 100);
  const afterDiscount = subtotal - discountAmount;
  const taxAmount = afterDiscount * (data.taxRate / 100);
  const total = afterDiscount + taxAmount;
  return { subtotal, discountAmount, afterDiscount, taxAmount, total };
}

// === Invoice Template Rendering ===
function renderInvoice(data) {
  const calc = calculate(data);
  const cur = data.currency;
  const tpl = data.template;

  const itemsRows = data.items.map(item => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #eee;">${escapeHtml(item.description) || '-'}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #eee;text-align:center;">${item.qty}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #eee;text-align:right;">${formatCurrency(item.price, cur)}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #eee;text-align:right;">${formatCurrency(item.qty * item.price, cur)}</td>
    </tr>
  `).join('');

  // Template-specific styles
  const styles = {
    minimal: {
      accent: '#111827',
      headerBg: 'transparent',
      headerColor: '#111827',
      tableBorder: '#e5e7eb',
      font: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    },
    professional: {
      accent: '#1e40af',
      headerBg: '#1e40af',
      headerColor: '#ffffff',
      tableBorder: '#dbeafe',
      font: "'Segoe UI', Roboto, sans-serif",
    },
    creative: {
      accent: '#7c3aed',
      headerBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      headerColor: '#ffffff',
      tableBorder: '#ede9fe',
      font: "'Inter', 'Noto Sans SC', sans-serif",
    }
  };
  const s = styles[tpl] || styles.professional;
  const isMinimal = tpl === 'minimal';
  const isCreative = tpl === 'creative';

  const headerStyle = isMinimal
    ? `border-bottom: 3px solid ${s.accent}; padding-bottom: 20px;`
    : isCreative
    ? `background: ${s.headerBg}; color: ${s.headerColor}; padding: 28px; border-radius: 12px; margin: -24px -24px 24px -24px;`
    : `background: ${s.headerBg}; color: ${s.headerColor}; padding: 24px; margin: -24px -24px 24px -24px;`;

  const thStyle = isMinimal
    ? `padding:10px 12px;text-align:left;border-bottom:2px solid #111;font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:1px;`
    : `padding:10px 12px;text-align:left;background:${s.accent}11;color:${s.accent};font-weight:600;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;border-bottom:2px solid ${s.tableBorder};`;

  return `
    <div class="invoice-render" style="font-family:${s.font};color:#1f2937;padding:24px;background:#fff;min-height:800px;width:680px;position:relative;">
      <!-- Header -->
      <div class="invoice-header" style="display:flex;justify-content:space-between;align-items:flex-start;${headerStyle}">
        <div>
          <h1 style="font-size:${isMinimal ? '28px' : '24px'};font-weight:${isMinimal ? '300' : '700'};margin:0;${isMinimal ? 'letter-spacing:4px;text-transform:uppercase;' : ''}">${t('invoice')}</h1>
          ${data.from.name ? `<p style="margin:4px 0 0;font-size:14px;opacity:0.8;">${escapeHtml(data.from.name)}</p>` : ''}
        </div>
        <div class="invoice-meta" style="text-align:right;font-size:13px;">
          ${data.invoiceNo ? `<p style="margin:2px 0;"><strong>#${escapeHtml(data.invoiceNo)}</strong></p>` : ''}
          ${data.invoiceDate ? `<p style="margin:2px 0;">${data.invoiceDate}</p>` : ''}
          ${data.dueDate ? `<p style="margin:2px 0;opacity:0.7;">${t('dueDateLabel')}: ${data.dueDate}</p>` : ''}
        </div>
      </div>

      <!-- Parties -->
      <div class="parties" style="display:flex;gap:40px;margin:24px 0;">
        <div class="party" style="flex:1;">
          <h4 style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:${s.accent};margin:0 0 8px;font-weight:700;">${t('billFrom')}</h4>
          <p style="margin:2px 0;font-weight:600;">${escapeHtml(data.from.name) || '-'}</p>
          <p style="margin:2px 0;font-size:13px;color:#6b7280;">${escapeHtml(data.from.address)}</p>
          <p style="margin:2px 0;font-size:13px;color:#6b7280;">${escapeHtml(data.from.phone)}</p>
          <p style="margin:2px 0;font-size:13px;color:#6b7280;">${escapeHtml(data.from.email)}</p>
        </div>
        <div class="party" style="flex:1;">
          <h4 style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:${s.accent};margin:0 0 8px;font-weight:700;">${t('billTo')}</h4>
          <p style="margin:2px 0;font-weight:600;">${escapeHtml(data.to.name) || '-'}</p>
          <p style="margin:2px 0;font-size:13px;color:#6b7280;">${escapeHtml(data.to.address)}</p>
          <p style="margin:2px 0;font-size:13px;color:#6b7280;">${escapeHtml(data.to.phone)}</p>
          <p style="margin:2px 0;font-size:13px;color:#6b7280;">${escapeHtml(data.to.email)}</p>
        </div>
      </div>

      <!-- Items Table -->
      <table style="width:100%;border-collapse:collapse;margin:20px 0;">
        <thead>
          <tr>
            <th style="${thStyle}">${t('itemDesc')}</th>
            <th style="${thStyle}text-align:center;">${t('itemQty')}</th>
            <th style="${thStyle}text-align:right;">${t('itemPrice')}</th>
            <th style="${thStyle}text-align:right;">${t('itemAmount')}</th>
          </tr>
        </thead>
        <tbody>${itemsRows}</tbody>
      </table>

      <!-- Totals -->
      <div style="display:flex;justify-content:flex-end;margin-top:20px;">
        <div style="width:260px;">
          <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:14px;">
            <span>${t('subtotal')}</span><span>${formatCurrency(calc.subtotal, cur)}</span>
          </div>
          ${data.discount > 0 ? `
          <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:14px;color:#dc2626;">
            <span>${t('discountLabel')} (${data.discount}%)</span><span>-${formatCurrency(calc.discountAmount, cur)}</span>
          </div>` : ''}
          ${data.taxRate > 0 ? `
          <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:14px;">
            <span>${t('tax')} (${data.taxRate}%)</span><span>${formatCurrency(calc.taxAmount, cur)}</span>
          </div>` : ''}
          <div style="display:flex;justify-content:space-between;padding:12px 0 6px;font-size:18px;font-weight:700;border-top:2px solid ${s.accent};margin-top:8px;">
            <span>${t('total')}</span>
            <span style="color:${s.accent};">${formatCurrency(calc.total, cur)}</span>
          </div>
        </div>
      </div>

      <!-- Notes -->
      ${data.notes ? `
      <div style="margin-top:32px;padding-top:16px;border-top:1px solid #e5e7eb;">
        <h4 style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;margin:0 0 6px;">${t('notesLabel')}</h4>
        <p style="font-size:13px;color:#6b7280;white-space:pre-wrap;">${escapeHtml(data.notes)}</p>
      </div>` : ''}

      <!-- Creative template footer decoration -->
      ${isCreative ? `<div style="position:absolute;bottom:0;left:0;right:0;height:6px;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);border-radius:0 0 4px 4px;"></div>` : ''}
    </div>
  `;
}

function previewInvoice() {
  const data = getFormData();
  const html = renderInvoice(data);
  document.getElementById('invoicePreview').innerHTML = html;
}

// === AI Integration (DeepSeek) ===
function getApiKey() {
  return localStorage.getItem('deepseek_api_key') || '';
}
function getApiEndpoint() {
  return localStorage.getItem('deepseek_endpoint') || 'https://api.deepseek.com/v1/chat/completions';
}

async function aiOptimizeItem(idx) {
  const apiKey = getApiKey();
  if (!apiKey) {
    showToast(t('aiNoKey'), 'warning');
    return;
  }

  const desc = lineItems[idx].description;
  if (!desc.trim()) return;

  const loading = document.getElementById('aiLoading');
  loading.style.display = 'flex';

  // Disable the AI button
  const btns = document.querySelectorAll('.btn-ai');
  btns.forEach(b => b.disabled = true);

  try {
    const prompt = currentLang === 'zh'
      ? `你是一个专业的发票描述优化助手。请将以下发票项目描述优化为更专业、清晰的表述，保持简洁（不超过50字）。只返回优化后的描述文本，不要加任何解释。\n\n原始描述：${desc}`
      : `You are a professional invoice description optimizer. Improve the following invoice item description to be more professional and clear. Keep it concise (under 80 chars). Return only the optimized text, no explanation.\n\nOriginal: ${desc}`;

    const resp = await fetch(getApiEndpoint(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100,
        temperature: 0.7,
      }),
    });

    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const result = await resp.json();
    const optimized = result.choices?.[0]?.message?.content?.trim();
    if (optimized) {
      lineItems[idx].description = optimized;
      renderLineItems();
      showToast('✨ AI ' + (currentLang === 'zh' ? '优化完成' : 'optimized'), 'success');
    }
  } catch (err) {
    console.error('AI error:', err);
    showToast(t('aiError'), 'error');
  } finally {
    loading.style.display = 'none';
    btns.forEach(b => b.disabled = false);
  }
}

// === PDF Export ===
async function exportPDF() {
  const data = getFormData();
  const previewEl = document.getElementById('invoicePreview');

  // Ensure preview is rendered
  previewEl.innerHTML = renderInvoice(data);

  showToast(t('exportingPDF'), 'info');

  try {
    const invoiceEl = previewEl.querySelector('.invoice-render');
    if (!invoiceEl) return;

    const canvas = await html2canvas(invoiceEl, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    const filename = `invoice-${data.invoiceNo || 'draft'}-${data.invoiceDate || 'undated'}.pdf`;
    pdf.save(filename);

    showToast(t('pdfSuccess'), 'success');
  } catch (err) {
    console.error('PDF export error:', err);
    showToast('PDF export failed: ' + err.message, 'error');
  }
}

// === History Management (localStorage) ===
const STORAGE_KEY = 'ai_invoice_history';

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch { return []; }
}

function saveToHistory() {
  const data = getFormData();
  data.id = Date.now().toString();
  data.savedAt = new Date().toLocaleString();
  const history = getHistory();
  history.unshift(data);
  // Keep max 50
  if (history.length > 50) history.length = 50;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  showToast(t('savedSuccess'), 'success');
  renderHistory();
}

function deleteFromHistory(id) {
  let history = getHistory();
  history = history.filter(h => h.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  showToast(t('deletedSuccess'), 'success');
  renderHistory();
}

function loadFromHistory(id) {
  const history = getHistory();
  const data = history.find(h => h.id === id);
  if (data) {
    setFormData(data);
    closeHistoryPanel();
    previewInvoice();
  }
}

function renderHistory() {
  const list = document.getElementById('historyList');
  const history = getHistory();
  if (!history.length) {
    list.innerHTML = `<div class="history-empty">${t('noHistory')}</div>`;
    return;
  }
  list.innerHTML = history.map(h => `
    <div class="history-item">
      <div class="history-item-info">
        <strong>${escapeHtml(h.invoiceNo || 'Draft')}</strong>
        <span>${escapeHtml(h.to?.name || '-')} · ${formatCurrency(
          h.items?.reduce((s, i) => s + i.qty * i.price, 0) || 0, h.currency || 'CNY'
        )}</span>
        <small>${h.savedAt || ''}</small>
      </div>
      <div class="history-item-actions">
        <button class="btn-sm" onclick="loadFromHistory('${h.id}')">${t('loadInvoice')}</button>
        <button class="btn-danger-sm" onclick="deleteFromHistory('${h.id}')">${t('deleteInvoice')}</button>
      </div>
    </div>
  `).join('');
}

// === Toast Notifications ===
function showToast(msg, type = 'info') {
  // Remove existing
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// === Panel & Modal Controls ===
function openHistoryPanel() {
  renderHistory();
  document.getElementById('historyPanel').classList.add('open');
  document.getElementById('overlay').classList.add('show');
}
function closeHistoryPanel() {
  document.getElementById('historyPanel').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}
function openSettings() {
  document.getElementById('apiKey').value = getApiKey();
  document.getElementById('apiEndpoint').value = getApiEndpoint();
  document.getElementById('settingsModal').classList.add('open');
  document.getElementById('overlay').classList.add('show');
}
function closeSettings() {
  document.getElementById('settingsModal').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}
function saveSettings() {
  localStorage.setItem('deepseek_api_key', document.getElementById('apiKey').value.trim());
  localStorage.setItem('deepseek_endpoint', document.getElementById('apiEndpoint').value.trim());
  closeSettings();
  showToast(currentLang === 'zh' ? '设置已保存' : 'Settings saved', 'success');
}

// === Event Bindings ===
document.addEventListener('DOMContentLoaded', () => {
  // Set today's date
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('invoiceDate').value = today;
  // Due date = 30 days later
  const due = new Date();
  due.setDate(due.getDate() + 30);
  document.getElementById('dueDate').value = due.toISOString().split('T')[0];
  // Default invoice number
  document.getElementById('invoiceNo').value = 'INV-' + Date.now().toString().slice(-6);

  // Render initial line items
  renderLineItems();
  applyI18n();

  // Buttons
  document.getElementById('btnPreview').addEventListener('click', previewInvoice);
  document.getElementById('btnExportPDF').addEventListener('click', exportPDF);
  document.getElementById('btnSave').addEventListener('click', saveToHistory);
  document.getElementById('btnClear').addEventListener('click', clearForm);
  document.getElementById('btnAddItem').addEventListener('click', addItem);

  // History
  document.getElementById('btnHistory').addEventListener('click', openHistoryPanel);
  document.getElementById('btnCloseHistory').addEventListener('click', closeHistoryPanel);

  // Settings
  document.getElementById('btnSettings').addEventListener('click', openSettings);
  document.getElementById('btnCloseSettings').addEventListener('click', closeSettings);
  document.getElementById('btnSaveSettings').addEventListener('click', saveSettings);

  // Overlay close
  document.getElementById('overlay').addEventListener('click', () => {
    closeHistoryPanel();
    closeSettings();
  });

  // Language toggle
  document.getElementById('btnLang').addEventListener('click', () => {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    applyI18n();
    renderLineItems();
    // Re-render preview if visible
    const preview = document.getElementById('invoicePreview');
    if (preview.querySelector('.invoice-render')) {
      previewInvoice();
    }
  });
});
