// SuperBook Content Script
// Adds a hover button above selected words that, when clicked, shows a tooltip with the definition

console.log("SuperBook content script loaded");

let hoverButtonEl = null;
let tooltipEl = null;
let hideHoverTimeout = null;
let isInteracting = false; // prevents accidental hide while clicking button/tooltip
let enabled = true; // default active; can be overridden by background settings
let lastSelectionRect = null; // track rect to reposition while scrolling

function initializeSuperBook() {
  document.addEventListener("mouseup", onMouseUpOrKeySelection, true);
  document.addEventListener("keyup", onMouseUpOrKeySelection, true);
  document.addEventListener("selectionchange", onSelectionChange);
  window.addEventListener("scroll", onScrollReposition, { passive: true });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      removeTooltip();
      hideHoverButton();
    }
  });

  // Respect extension enabled setting if provided
  try {
    chrome.runtime.sendMessage({ action: "getSettings" }, (res) => {
      if (res && typeof res.enabled !== "undefined") {
        enabled = !!res.enabled;
      }
    });
  } catch (_) {
    // ignore if not available
  }

  // Respond to toggle messages
  try {
    chrome.runtime.onMessage.addListener((message) => {
      if (message && message.action === "toggleExtension") {
        enabled = !!message.enabled;
        if (!enabled) {
          hideHoverButton();
          removeTooltip();
        }
      }
    });
  } catch (_) {}
}

function onSelectionChange() {
  // Debounce and then recompute; if selection is invalid, hide, otherwise show/reposition
  clearTimeout(hideHoverTimeout);
  hideHoverTimeout = setTimeout(() => {
    updateHoverFromCurrentSelection();
  }, 80);
}

function onMouseUpOrKeySelection() {
  const selection = window.getSelection();
  if (!selection) return hideHoverButton();
  updateHoverFromCurrentSelection();
}

function isValidSelection(selection) {
  if (!enabled) return false;
  if (!selection || selection.isCollapsed) return false;
  // Ignore inside inputs or textareas
  const anchorNode = selection.anchorNode && selection.anchorNode.parentElement;
  if (
    anchorNode &&
    anchorNode.closest("input, textarea, [contenteditable=true]")
  )
    return false;

  const text = selection.toString().trim();
  if (!text) return false;
  if (text.split(/\s+/).length !== 1) return false; // single word
  if (text.length < 2) return false; // avoid single letters
  return true;
}

function updateHoverFromCurrentSelection() {
  const selection = window.getSelection();
  if (!isValidSelection(selection)) {
    hideHoverButton();
    lastSelectionRect = null;
    return;
  }
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  if (!rect || (rect.width === 0 && rect.height === 0)) {
    hideHoverButton();
    lastSelectionRect = null;
    return;
  }
  lastSelectionRect = rect;
  const x = rect.left + rect.width / 2 + window.scrollX;
  const y = rect.top + window.scrollY;
  showHoverButton({ x, y }, selection.toString().trim());
}

function onScrollReposition() {
  if (!hoverButtonEl || hoverButtonEl.style.display === "none") return;
  if (!lastSelectionRect) return hideHoverButton();
  const rect = lastSelectionRect;
  const x = rect.left + rect.width / 2 + window.scrollX;
  const y = rect.top + window.scrollY;
  positionHoverButton({ x, y });
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
  try {
    const iconUrl = chrome.runtime.getURL("icons/icon48.png");
    if (iconUrl) {
      logo.src = iconUrl;
      logo.onerror = () => {
        console.warn('Failed to load SuperBook icon, using fallback');
        logo.style.backgroundColor = '#4ade80';
        logo.style.borderRadius = '50%';
      };
    } else {
      // Fallback if URL cannot be generated
      logo.style.backgroundColor = '#4ade80';
      logo.style.borderRadius = '50%';
    }
  } catch (e) {
    // Extension context may be invalidated
    logo.style.backgroundColor = '#4ade80';
    logo.style.borderRadius = '50%';
  }
  btn.appendChild(logo);

  btn.addEventListener("mousedown", (e) => {
    // Prevent selection clearing on click
    isInteracting = true;
    e.preventDefault();
  });

  btn.addEventListener("click", () => {
    const word = btn.dataset.word || "";
    const bx = Number(btn.dataset.x || 0);
    const by = Number(btn.dataset.y || 0);
    showTooltip(word, { x: bx, y: by });
    // Keep hover visible; tooltip will close on outside click or ESC
    setTimeout(() => {
      isInteracting = false;
    }, 50);
  });

  document.documentElement.appendChild(btn);
  return btn;
}

function showHoverButton(position, word) {
  if (!hoverButtonEl) {
    hoverButtonEl = createHoverButton();
  }

  positionHoverButton(position);
  hoverButtonEl.style.display = "flex";
  hoverButtonEl.dataset.word = word;
  hoverButtonEl.dataset.x = String(position.x);
  hoverButtonEl.dataset.y = String(position.y);
}

function positionHoverButton(position) {
  const offsetY = 10; // pixels above selection
  hoverButtonEl.style.left = `${Math.round(position.x - 16)}px`;
  hoverButtonEl.style.top = `${Math.round(position.y - offsetY - 32)}px`;
}

function hideHoverButton() {
  if (isInteracting) return; // do not hide while interacting with UI
  if (hoverButtonEl) hoverButtonEl.style.display = "none";
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
  tooltipEl.style.left = `${Math.min(
    position.x + 8,
    window.scrollX + document.documentElement.clientWidth - 320
  )}px`;
  tooltipEl.style.top = `${Math.max(position.y - 8, window.scrollY + 8)}px`;

  const content = document.createElement("div");
  content.className = "superbook-definition";
  content.innerHTML = `<span class="superbook-loading">Looking up "${escapeHtml(
    word
  )}"</span>`;
  tooltipEl.appendChild(content);

  document.documentElement.appendChild(tooltipEl);

  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
        word.toLowerCase()
      )}`
    );
    if (!res.ok) throw new Error("not found");
    const data = await res.json();
    const entry = data[0] || {};
    const meaning = (entry.meanings && entry.meanings[0]) || {};
    const def = (meaning.definitions && meaning.definitions[0]) || {};

    const parts = [];
    if (entry.word)
      parts.push(`<div class="superbook-word">${escapeHtml(entry.word)}</div>`);
    if (entry.phonetic || (entry.phonetics && entry.phonetics[0])) {
      const ph =
        entry.phonetic ||
        (entry.phonetics && entry.phonetics[0] && entry.phonetics[0].text) ||
        "";
      if (ph)
        parts.push(
          `<div class="superbook-pronunciation">${escapeHtml(ph)}</div>`
        );
    }
    if (meaning.partOfSpeech)
      parts.push(
        `<div class="superbook-definition"><strong>${escapeHtml(
          meaning.partOfSpeech
        )}</strong></div>`
      );
    if (def.definition)
      parts.push(
        `<div class="superbook-definition">${escapeHtml(def.definition)}</div>`
      );
    if (def.example)
      parts.push(
        `<div class="superbook-definition" style="opacity:.8;font-style:italic">"${escapeHtml(
          def.example
        )}"</div>`
      );

    content.innerHTML = parts.join("");
    tooltipEl.classList.add("show");
  } catch (e) {
    content.innerHTML = `<span class="superbook-definition" style="color:#ef4444">No definition found for "${escapeHtml(
      word
    )}"</span>`;
    tooltipEl.classList.add("show");
  }

  // Close on outside click
  const onDocClick = (ev) => {
    const target = ev.target;
    if (!tooltipEl) return;
    if (
      tooltipEl.contains(target) ||
      (hoverButtonEl && hoverButtonEl.contains(target))
    )
      return;
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
