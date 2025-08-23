/**
 * Quick Dictionary Chrome Extension - Background Script
 * Handles extension lifecycle and storage
 */

// Extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Quick Dictionary extension installed');
    
    // Set default settings
    chrome.storage.sync.set({
      enabled: true,
      autoHide: true,
      hideDelay: 5000
    });
  } else if (details.reason === 'update') {
    console.log('Quick Dictionary extension updated');
  }
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  // Toggle extension on/off for current tab
  chrome.storage.sync.get(['enabled'], (result) => {
    const newState = !result.enabled;
    chrome.storage.sync.set({ enabled: newState });
    
    // Update icon to reflect state
    updateIcon(newState);
    
    // Send message to content script
    chrome.tabs.sendMessage(tab.id, {
      action: 'toggleExtension',
      enabled: newState
    }).catch(() => {
      // Ignore errors if content script is not loaded
    });
  });
});

// Update extension icon based on state
function updateIcon(enabled) {
  const iconPath = enabled ? {
    "16": "icon16.png",
    "48": "icon48.png",
    "128": "icon128.png"
  } : {
    "16": "icon16-disabled.png",
    "48": "icon48-disabled.png", 
    "128": "icon128-disabled.png"
  };
  
  chrome.action.setIcon({ path: iconPath });
  chrome.action.setTitle({ 
    title: enabled ? 'Quick Dictionary (Enabled)' : 'Quick Dictionary (Disabled)' 
  });
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getSettings') {
    chrome.storage.sync.get(['enabled', 'autoHide', 'hideDelay'], (result) => {
      sendResponse({
        enabled: result.enabled !== false, // Default to true
        autoHide: result.autoHide !== false, // Default to true
        hideDelay: result.hideDelay || 5000 // Default to 5 seconds
      });
    });
    return true; // Keep message channel open for async response
  }
});

// Initialize icon state on startup
chrome.storage.sync.get(['enabled'], (result) => {
  updateIcon(result.enabled !== false);
});