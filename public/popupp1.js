const wordInput = document.getElementById("wordInput");
const output = document.getElementById("output");
const cursor = document.getElementById("cursor");
const statusIndicator = document.getElementById("statusIndicator");
const toggleBtn = document.getElementById("toggleBtn");
const toggleIcon = document.getElementById("toggleIcon");

// Check and update extension status
function updateExtensionStatus() {
  chrome.storage.sync.get(["enabled"], (result) => {
    const enabled = result.enabled !== false;
    
    // Update status indicator
    statusIndicator.className = `status-indicator ${
      enabled ? "status-enabled" : "status-disabled"
    }`;
    statusIndicator.textContent = `● ${enabled ? "online" : "offline"}`;
    
    // Update toggle button
    toggleBtn.className = `toggle-btn ${enabled ? "toggle-enabled" : "toggle-disabled"}`;
    toggleBtn.title = enabled ? "Click to disable extension" : "Click to enable extension";
    toggleIcon.textContent = enabled ? "●" : "○";
  });
}

// Initialize status on load
updateExtensionStatus();

// Handle toggle button click
toggleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  
  chrome.storage.sync.get(["enabled"], (result) => {
    const newState = !result.enabled;
    
    // Send message to background script to toggle extension
    chrome.runtime.sendMessage(
      { action: "toggleExtension", enabled: newState },
      (response) => {
        if (response && response.success) {
          updateExtensionStatus();
        }
      }
    );
  });
});

// Listen for storage changes to update status
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "sync" && changes.enabled) {
    updateExtensionStatus();
  }
});

// Focus input on load
wordInput.focus();

// Handle cursor visibility
wordInput.addEventListener("focus", () => {
  cursor.style.display = "none";
});

wordInput.addEventListener("blur", () => {
  cursor.style.display = "inline-block";
});

// Handle input events
wordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const word = wordInput.value.trim();
    if (word) {
      lookupWord(word);
      wordInput.value = "";
    }
  } else if (e.key === "Escape") {
    wordInput.value = "";
  }
});

// Dictionary API lookup
async function lookupWord(word) {
  const commandLine = document.createElement("div");
  commandLine.className = "output-line command-line";
  commandLine.textContent = `dict@lookup:~$ define "${word}"`;
  output.appendChild(commandLine);

  // Show loading
  const loadingLine = document.createElement("div");
  loadingLine.className = "output-line loading";
  loadingLine.innerHTML =
    '<span>Searching dictionary<span class="loading-dots"></span></span>';
  output.appendChild(loadingLine);

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
        word.toLowerCase()
      )}`
    );

    // Remove loading line
    loadingLine.remove();

    if (!response.ok) {
      throw new Error("Word not found");
    }

    const data = await response.json();
    displayDefinition(data[0]);
  } catch (error) {
    loadingLine.remove();
    displayError(word);
  }

  // Scroll to bottom
  output.scrollTop = output.scrollHeight;
}

function displayDefinition(entry) {
  // Word title
  const wordTitle = document.createElement("div");
  wordTitle.className = "output-line word-title";
  wordTitle.textContent = `📖 ${entry.word.toUpperCase()}`;
  output.appendChild(wordTitle);

  // Phonetic
  if (entry.phonetic || (entry.phonetics && entry.phonetics[0])) {
    const phonetic = document.createElement("div");
    phonetic.className = "output-line phonetic";
    phonetic.textContent = `🔊 ${
      entry.phonetic || entry.phonetics[0].text || ""
    }`;
    output.appendChild(phonetic);
  }

  // Meanings
  entry.meanings.forEach((meaning, index) => {
    // Part of speech
    const pos = document.createElement("div");
    pos.className = "output-line part-of-speech";
    pos.textContent = `[${meaning.partOfSpeech.toUpperCase()}]`;
    output.appendChild(pos);

    // Definitions
    meaning.definitions.slice(0, 3).forEach((def, defIndex) => {
      const definition = document.createElement("div");
      definition.className = "output-line definition";
      definition.textContent = `${defIndex + 1}. ${def.definition}`;
      output.appendChild(definition);

      // Example
      if (def.example) {
        const example = document.createElement("div");
        example.className = "output-line example";
        example.textContent = `   "${def.example}"`;
        output.appendChild(example);
      }
    });

    // Synonyms
    if (meaning.synonyms && meaning.synonyms.length > 0) {
      const synonymsLabel = document.createElement("div");
      synonymsLabel.className = "output-line synonyms";
      synonymsLabel.textContent = "synonyms:";
      output.appendChild(synonymsLabel);

      const synonymsList = document.createElement("div");
      synonymsList.className = "output-line synonyms-list";
      synonymsList.textContent = meaning.synonyms.slice(0, 5).join(", ");
      output.appendChild(synonymsList);
    }

    // Add spacing between meanings
    if (index < entry.meanings.length - 1) {
      const spacer = document.createElement("div");
      spacer.className = "output-line";
      spacer.innerHTML = "&nbsp;";
      output.appendChild(spacer);
    }
  });

  // Add final spacing
  const spacer = document.createElement("div");
  spacer.className = "output-line";
  spacer.innerHTML = "&nbsp;";
  output.appendChild(spacer);
}

function displayError(word) {
  const errorLine = document.createElement("div");
  errorLine.className = "output-line error";
  errorLine.textContent = `❌ Error: No definition found for "${word}"`;
  output.appendChild(errorLine);

  const spacer = document.createElement("div");
  spacer.className = "output-line";
  spacer.innerHTML = "&nbsp;";
  output.appendChild(spacer);
}

function clearOutput() {
  output.innerHTML = `
    <div class="output-line">
      <span style="color: #4ade80;">Terminal cleared.</span>
    </div>
    <div class="output-line">
      &nbsp;
    </div>
  `;
  wordInput.focus();
}

// Auto-focus when clicking anywhere in terminal
document.addEventListener("click", (e) => {
  if (!e.target.matches("button, a, input")) {
    wordInput.focus();
  }
});