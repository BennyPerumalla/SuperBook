/**
 * SuperBook Chrome Extension - Background Script
 * Final version with robust icon handling
 */

console.log("🚀 SuperBook: Service worker initializing...");

// Extension installation
chrome.runtime.onInstalled.addListener((details) => {
  console.log(`📦 SuperBook: Extension ${details.reason}`);

  if (details.reason === "install") {
    // Set default settings
    chrome.storage.sync.set({
      enabled: true,
      autoHide: true,
      hideDelay: 5000,
    }, () => {
      console.log("✅ Default settings saved");
    });
  }

  // Initialize state
  initializeState();
});

// Initialize extension state on startup
function initializeState() {
  chrome.storage.sync.get(["enabled"], (result) => {
    const enabled = result.enabled !== false;
    console.log(`⚙️ SuperBook: Current state: ${enabled ? 'ENABLED' : 'DISABLED'}`);
    
    // Only update title, don't attempt icon changes
    updateTitle(enabled);
  });
}

// Update extension title based on state
function updateTitle(enabled) {
  const title = enabled
    ? "SuperBook (Enabled) - Click to toggle"
    : "SuperBook (Disabled) - Click to toggle";
  
  chrome.action.setTitle({ title }).catch((error) => {
    console.warn("⚠️ Failed to set title:", error.message);
  });
}

// Attempt to set icon (with proper error handling)
async function setExtensionIcon(enabled) {
  console.log(`\n🎨 Attempting to set icon for: ${enabled ? 'ENABLED' : 'DISABLED'}`);
  
  // Define paths
  const enabledPaths = {
    16: "icons/icon16.png",
    32: "icons/icon16.png",
    48: "icons/icon48.png",
  };
  
  const disabledPaths = {
    16: "icons/icon16-disabled.png",
    32: "icons/icon24-disabled.png",
    48: "icons/icon32-disabled.png",
  };
  
  const paths = enabled ? enabledPaths : disabledPaths;
  
  try {
    await new Promise((resolve, reject) => {
      chrome.action.setIcon({ path: paths }, () => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve();
        }
      });
    });
    
    console.log(`✅ Icon set successfully to: ${enabled ? 'ENABLED' : 'DISABLED'}`);
    return true;
    
  } catch (error) {
    console.warn(`⚠️ Icon set failed (non-critical):`, error.message);
    console.log("   Extension will still work, but icon won't change visually");
    
    // If disabled icons aren't created yet, that's okay
    if (!enabled) {
      console.log("   💡 Tip: Create disabled icons with the icon generator tool");
      return false;
    }
    
    return false;
  }
}

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  console.log("\n👆 SuperBook: Icon clicked");
  
  chrome.storage.sync.get(["enabled"], (result) => {
    const currentState = result.enabled !== false;
    const newState = !currentState;
    
    console.log(`   Toggle: ${currentState ? 'ENABLED' : 'DISABLED'} → ${newState ? 'ENABLED' : 'DISABLED'}`);
    
    // Save new state
    chrome.storage.sync.set({ enabled: newState }, () => {
      console.log(`   ✅ State saved: ${newState ? 'ENABLED' : 'DISABLED'}`);
      
      // Update UI
      updateTitle(newState);
      setExtensionIcon(newState);
      
      // Notify content script
      if (tab && tab.id) {
        chrome.tabs.sendMessage(tab.id, {
          action: "toggleExtension",
          enabled: newState,
        }).catch((error) => {
          console.log("   ℹ️ Content script not available on this tab (expected on some pages)");
        });
      }
    });
  });
});

// Listen for messages from content script and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  
  if (message.action === "getSettings") {
    console.log("💬 Message: getSettings");
    
    chrome.storage.sync.get(["enabled", "autoHide", "hideDelay"], (result) => {
      const settings = {
        enabled: result.enabled !== false,
        autoHide: result.autoHide !== false,
        hideDelay: result.hideDelay || 5000,
      };
      
      console.log(`   Responding with: ${settings.enabled ? 'ENABLED' : 'DISABLED'}`);
      sendResponse(settings);
    });
    
    return true; // Keep channel open
  }

  if (message.action === "toggleExtension") {
    console.log(`\n💬 Message: toggleExtension (${message.enabled ? 'ENABLE' : 'DISABLE'})`);
    
    const newState = message.enabled;
    
    // Save state
    chrome.storage.sync.set({ enabled: newState }, () => {
      console.log(`   ✅ State saved: ${newState ? 'ENABLED' : 'DISABLED'}`);
      
      // Update UI
      updateTitle(newState);
      setExtensionIcon(newState);
      
      // Broadcast to all tabs
      chrome.tabs.query({}, (tabs) => {
        console.log(`   Broadcasting to ${tabs.length} tabs...`);
        tabs.forEach((tab) => {
          if (tab.id) {
            chrome.tabs.sendMessage(tab.id, {
              action: "toggleExtension",
              enabled: newState,
            }).catch(() => {
              // Ignore - content script might not be loaded
            });
          }
        });
      });
    });

    sendResponse({ success: true });
    return true;
  }
});

// Listen for storage changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "sync" && changes.enabled) {
    const newState = changes.enabled.newValue;
    console.log(`\n💾 Storage changed: ${newState ? 'ENABLED' : 'DISABLED'}`);
    
    updateTitle(newState);
    setExtensionIcon(newState);
  }
});

// Initialize when service worker starts
chrome.storage.sync.get(["enabled"], (result) => {
  const enabled = result.enabled !== false;
  console.log(`\n⚙️ SuperBook: Initializing...`);
  console.log(`   Current state: ${enabled ? 'ENABLED' : 'DISABLED'}`);
  
  updateTitle(enabled);
  
  // Try to set icon, but don't fail if it doesn't work
  // (disabled icons might not exist yet)
  setExtensionIcon(enabled).then(success => {
    if (!success && !enabled) {
      console.log("\n💡 Next steps:");
      console.log("   1. Create disabled icon variants (16x16, 24x24, 32x32)");
      console.log("   2. Place them in public/icons/");
      console.log("   3. Reload extension");
      console.log("   4. Icon will change when you toggle!");
    }
  });
});