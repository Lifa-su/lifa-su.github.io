// ============================================================
// AI Summary - Content Script
// 提取当前网页正文内容
// ============================================================

(() => {
  // 需要移除的标签
  const REMOVE_TAGS = ['script', 'style', 'nav', 'footer', 'header', 'aside', 'iframe', 'noscript', 'svg', 'form'];
  
  // 常见正文容器选择器（优先级从高到低）
  const ARTICLE_SELECTORS = [
    'article',
    '[role="main"]',
    'main',
    '.post-content',
    '.article-content',
    '.entry-content',
    '.content',
    '#content',
    '.post-body',
    '.article-body',
    '.story-body',
  ];

  function extractContent() {
    const title = document.title || '';
    const url = window.location.href;
    let text = '';

    // 1. 尝试用常见选择器找正文容器
    for (const selector of ARTICLE_SELECTORS) {
      const el = document.querySelector(selector);
      if (el) {
        text = cleanElement(el);
        if (text.length > 200) break;
      }
    }

    // 2. 如果没找到足够内容，用启发式方法：找文本密度最高的节点
    if (text.length < 200) {
      text = extractByDensity();
    }

    // 3. 兜底：取 body 全文
    if (text.length < 100) {
      text = cleanElement(document.body);
    }

    // 截断过长内容（DeepSeek token 限制）
    const MAX_CHARS = 12000;
    if (text.length > MAX_CHARS) {
      text = text.substring(0, MAX_CHARS) + '\n\n[内容已截断...]';
    }

    return { title, url, text };
  }

  function cleanElement(el) {
    const clone = el.cloneNode(true);
    // 移除无关标签
    REMOVE_TAGS.forEach(tag => {
      clone.querySelectorAll(tag).forEach(n => n.remove());
    });
    // 移除隐藏元素
    clone.querySelectorAll('[style*="display:none"], [style*="display: none"], [hidden], .hidden').forEach(n => n.remove());
    
    // 提取文本，保留段落结构
    const blocks = clone.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, blockquote, pre, td, th, dd, dt');
    if (blocks.length > 3) {
      return Array.from(blocks)
        .map(b => b.textContent.trim())
        .filter(t => t.length > 0)
        .join('\n\n');
    }
    
    return clone.textContent.replace(/\s+/g, ' ').trim();
  }

  function extractByDensity() {
    const candidates = [];
    const allDivs = document.querySelectorAll('div, section');
    
    allDivs.forEach(div => {
      const text = div.textContent || '';
      const textLen = text.trim().length;
      const linkText = Array.from(div.querySelectorAll('a'))
        .reduce((sum, a) => sum + (a.textContent || '').length, 0);
      const density = textLen > 0 ? (textLen - linkText) / textLen : 0;
      const pCount = div.querySelectorAll('p').length;
      
      if (textLen > 200 && density > 0.5 && pCount >= 2) {
        candidates.push({ el: div, score: textLen * density * (pCount / 2) });
      }
    });

    candidates.sort((a, b) => b.score - a.score);
    if (candidates.length > 0) {
      return cleanElement(candidates[0].el);
    }
    return '';
  }

  // 响应来自 background/popup 的消息
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === 'extractContent') {
      const result = extractContent();
      sendResponse(result);
    }
    return true; // 保持消息通道
  });
})();
