chrome.commands.onCommand.addListener((command) => {
  if (command === "_execute_action") {
    chrome.action.openPopup();
  }
});