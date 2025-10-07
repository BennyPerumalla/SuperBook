/**
 * SuperBook  Chrome Extension - Background Script
 * Handles extension lifecycle and storage
 */

// Extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    console.log("SuperBook extension installed");

    // Set default settings
    chrome.storage.sync.set({
      enabled: true,
      autoHide: true,
      hideDelay: 5000,
    });
  } else if (details.reason === "update") {
    console.log("SuperBook extension updated");
  }
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  // Toggle extension on/off for current tab
  chrome.storage.sync.get(["enabled"], (result) => {
    const newState = !result.enabled;
    chrome.storage.sync.set({ enabled: newState });

    // Update icon to reflect state
    updateIcon(newState);

    // Send message to content script
    chrome.tabs
      .sendMessage(tab.id, {
        action: "toggleExtension",
        enabled: newState,
      })
      .catch(() => {
        // Ignore errors if content script is not loaded
      });
  });
});

// Update extension icon based on state
function updateIcon(enabled) {
  // Chrome action.setIcon accepts either a single path or an object keyed by size.
  // Use sizes 16/24/32 to satisfy environments that validate specific buckets.
  const baseActive = {
    16: chrome.runtime.getURL("icons/icon16.png"),
    24: chrome.runtime.getURL("icons/icon16.png"), // fallback to 16
    32: chrome.runtime.getURL("icons/icon48.png"), // downscale 48
  };
  const baseDisabled = {
    16: chrome.runtime.getURL("icons/icon16.png"),
    24: chrome.runtime.getURL("icons/icon16.png"),
    32: chrome.runtime.getURL("icons/icon48.png"),
  };

  const iconPath = enabled ? baseActive : baseDisabled;

  try {
    chrome.action.setIcon({ path: iconPath });
  } catch (e) {
    // Some environments throw if a path is not resolvable; log for diagnostics
    console.warn("SuperBook: Failed to set icon", e);
  }

  chrome.action.setTitle({
    title: enabled
      ? "SuperBook (Enabled)"
      : "SuperBook (Disabled)",
  });
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getSettings") {
    chrome.storage.sync.get(["enabled", "autoHide", "hideDelay"], (result) => {
      sendResponse({
        enabled: result.enabled !== false, // Default to true
        autoHide: result.autoHide !== false, // Default to true
        hideDelay: result.hideDelay || 5000, // Default to 5 seconds
      });
    });
    return true; // Keep message channel open for async response
  }
});

// Initialize icon state on startup
chrome.storage.sync.get(["enabled"], (result) => {
  updateIcon(result.enabled !== false);
});
