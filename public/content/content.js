// SuperBook Content Script
// This script runs on web pages to provide word definition functionality

console.log("SuperBook content script loaded");

// Initialize the extension
function initializeSuperBook() {
  // Add event listeners for word selection and tooltip functionality
  document.addEventListener("mouseup", handleTextSelection);
  document.addEventListener("dblclick", handleDoubleClick);
}

function handleTextSelection() {
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();

  if (
    selectedText &&
    selectedText.length > 0 &&
    selectedText.split(" ").length === 1
  ) {
    // Single word selected - could show definition tooltip
    console.log("Word selected:", selectedText);
    // Future: Show definition tooltip
  }
}

function handleDoubleClick(event) {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    console.log("Double-clicked word:", selectedText);
    // Future: Show definition popup
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSuperBook);
} else {
  initializeSuperBook();
}
