// SuperBook Content Script
// Adds a hover button above selected words that, when clicked, shows a tooltip with the definition

console.log("SuperBook content script loaded");

let hoverButtonEl = null;
let tooltipEl = null;
let hideHoverTimeout = null;

function initializeSuperBook() {
  document.addEventListener("mouseup", onMouseUpSelection);
  document.addEventListener("selectionchange", onSelectionChange);
  window.addEventListener("scroll", hideHoverButton, { passive: true });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      removeTooltip();
      hideHoverButton();
    }
  });
}

function onSelectionChange() {
  // Debounce hover hide to avoid flicker while selecting
  clearTimeout(hideHoverTimeout);
  hideHoverTimeout = setTimeout(() => {
    hideHoverButton();
  }, 120);
}

function onMouseUpSelection() {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed) {
    hideHoverButton();
    return;
  }

  const selectedText = selection.toString().trim();
  if (!selectedText || selectedText.split(/\s+/).length !== 1) {
    hideHoverButton();
    return;
  }

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  if (!rect || (rect.width === 0 && rect.height === 0)) {
    hideHoverButton();
    return;
  }

  const x = rect.left + rect.width / 2 + window.scrollX;
  const y = rect.top + window.scrollY; // top of selection
  showHoverButton({ x, y }, selectedText);
}

function createHoverButton() {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "superbook-hover-btn";
  btn.setAttribute("aria-label", "Show definition");

  const logo = document.createElement("img");
  logo.alt = "SuperBook";
  logo.width = 18;
  logo.height = 18;
  logo.draggable = false;
  // Use extension icon as logo
  logo.src = chrome.runtime.getURL("icons/icon48.png");
  btn.appendChild(logo);

  btn.addEventListener("mousedown", (e) => {
    // Prevent selection clearing on click
    e.preventDefault();
  });

  btn.addEventListener("click", () => {
    const word = btn.dataset.word || "";
    const bx = Number(btn.dataset.x || 0);
    const by = Number(btn.dataset.y || 0);
    showTooltip(word, { x: bx, y: by });
  });

  document.documentElement.appendChild(btn);
  return btn;
}

function showHoverButton(position, word) {
  if (!hoverButtonEl) {
    hoverButtonEl = createHoverButton();
  }

  const offsetY = 10; // pixels above selection
  hoverButtonEl.style.left = `${Math.round(position.x - 16)}px`;
  hoverButtonEl.style.top = `${Math.round(position.y - offsetY - 32)}px`;
  hoverButtonEl.style.display = "block";
  hoverButtonEl.dataset.word = word;
  hoverButtonEl.dataset.x = String(position.x);
  hoverButtonEl.dataset.y = String(position.y);
}

function hideHoverButton() {
  if (hoverButtonEl) {
    hoverButtonEl.style.display = "none";
  }
}

function removeTooltip() {
  if (tooltipEl && tooltipEl.parentNode) {
    tooltipEl.parentNode.removeChild(tooltipEl);
  }
  tooltipEl = null;
}

async function showTooltip(word, position) {
  removeTooltip();

  tooltipEl = document.createElement("div");
  tooltipEl.className = "superbook-tooltip";
  tooltipEl.style.left = `${Math.min(position.x + 8, window.scrollX + document.documentElement.clientWidth - 320)}px`;
  tooltipEl.style.top = `${Math.max(position.y - 8, window.scrollY + 8)}px`;

  const content = document.createElement("div");
  content.className = "superbook-definition";
  content.innerHTML = `<span class="superbook-loading">Looking up "${escapeHtml(word)}"</span>`;
  tooltipEl.appendChild(content);

  document.documentElement.appendChild(tooltipEl);

  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.toLowerCase())}`
    );
    if (!res.ok) throw new Error("not found");
    const data = await res.json();
    const entry = data[0] || {};
    const meaning = (entry.meanings && entry.meanings[0]) || {};
    const def = (meaning.definitions && meaning.definitions[0]) || {};

    const parts = [];
    if (entry.word) parts.push(`<div class="superbook-word">${escapeHtml(entry.word)}</div>`);
    if (entry.phonetic || (entry.phonetics && entry.phonetics[0])) {
      const ph = entry.phonetic || (entry.phonetics && entry.phonetics[0] && entry.phonetics[0].text) || "";
      if (ph) parts.push(`<div class="superbook-pronunciation">${escapeHtml(ph)}</div>`);
    }
    if (meaning.partOfSpeech) parts.push(`<div class="superbook-definition"><strong>${escapeHtml(meaning.partOfSpeech)}</strong></div>`);
    if (def.definition) parts.push(`<div class="superbook-definition">${escapeHtml(def.definition)}</div>`);
    if (def.example) parts.push(`<div class="superbook-definition" style="opacity:.8;font-style:italic">"${escapeHtml(def.example)}"</div>`);

    content.innerHTML = parts.join("");
    tooltipEl.classList.add("show");
  } catch (e) {
    content.innerHTML = `<span class="superbook-definition" style="color:#ef4444">No definition found for "${escapeHtml(word)}"</span>`;
    tooltipEl.classList.add("show");
  }

  // Close on outside click
  const onDocClick = (ev) => {
    const target = ev.target;
    if (!tooltipEl) return;
    if (tooltipEl.contains(target) || (hoverButtonEl && hoverButtonEl.contains(target))) return;
    removeTooltip();
    document.removeEventListener("click", onDocClick, true);
  };
  document.addEventListener("click", onDocClick, true);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSuperBook);
} else {
  initializeSuperBook();
}
