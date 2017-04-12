chrome.browserAction.onClicked.addListener(function(tab) {
  // Inject scripts only once extension button is clicked
  chrome.tabs.executeScript(tab.id, {
    file: 'lib/marvel-characters.js'
  });
  chrome.tabs.executeScript(tab.id, {
    file: 'lib/superheros.js'
  });
  chrome.tabs.executeScript(tab.id, {
    file: 'form-faker.js'
  });
});
