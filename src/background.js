chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, {trigger: 'browserAction'});
});

function onClickHandler(info, tab) {
  if (info.menuItemId === 'fillData') {
    chrome.tabs.sendMessage(tab.id, {trigger: 'contextMenu'});
  } else {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
    console.log(info);
  }
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    title: 'Fill Data',
    id: 'fillData',
    contexts: ['editable']
  });
});
