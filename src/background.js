function loadScripts(tab) {
  chrome.tabs.executeScript(tab.id, {
    file: 'lib/marvel-characters.js'
  });
  chrome.tabs.executeScript(tab.id, {
    file: 'lib/superheros.js'
  });
  chrome.tabs.executeScript(tab.id, {
    file: 'form-faker.js'
  });
}

// Trigger filling of entire from from clicking extension button
chrome.browserAction.onClicked.addListener(function(tab) {
  // Inject scripts only once extension button is clicked
  loadScripts(tab);

  chrome.tabs.sendMessage(tab.id, {trigger: 'browserAction'});
});

// Trigger individual input filling from context menu
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  // Inject scripts only once context menu is clicked
  loadScripts(tab);

  if (info.menuItemId.startsWith('fillData')) {
    const dataType = info.menuItemId.replace('fillData-', '');
    chrome.tabs.sendMessage(tab.id, {
      trigger: 'contextMenu',
      dataType,
    });
  } else {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
    console.log(info);
  }
});

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  let contexts = ['editable'];
  chrome.contextMenus.create({title: 'Auto-Detect Data Type', id: 'fillData', contexts});
  chrome.contextMenus.create({title: 'First Name', id: 'fillData-firstName', contexts});
  chrome.contextMenus.create({title: 'Last Name', id: 'fillData-lastName', contexts});
  chrome.contextMenus.create({title: 'Email', id: 'fillData-email', contexts});
  chrome.contextMenus.create({title: 'Phone', id: 'fillData-phone', contexts});
  chrome.contextMenus.create({title: 'Lorem - Word', id: 'fillData-loremWord', contexts});
  chrome.contextMenus.create({title: 'Lorem - Sentence', id: 'fillData-loremSentence', contexts});
  chrome.contextMenus.create({title: 'Lorem - Paragraph', id: 'fillData-loremParagraph', contexts});
  chrome.contextMenus.create({title: 'Account #', id: 'fillData-account', contexts});
});
