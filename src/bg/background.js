/**
 * @overview Handles the background functionality for the 'New Window With Tabs To Right' extension.
 * @version 0.0.1
 * @author Glenn 'devalias' Grant
 * @copyright Copyright (c) 2013 Glenn 'devalias' Grant
 * @license The MIT License (MIT)
 */

// Import the required scripts. Adjust the path as necessary.
importScripts('../../js/chromeExtensionApiAbstractions.js');

// Menu Actions
function newWindowWithTabsToRight(info, currentTab) {
  getTabsForParentWindowOfTab(currentTab, function(tabs) {
    var tabIds = getIdsForTabsToRightOf(currentTab.index, tabs);
    createWindowWithTabs(tabIds, function(tabs) {
      // TODO: Maybe ensure tabs were moved?
    });
  });
}

function newWindowWithCurrentAndTabsToRight(info, currentTab) {
  getTabsForParentWindowOfTab(currentTab, function(tabs) {
    var tabIds = getIdsForCurrentAndTabsToRightOf(currentTab.index, tabs);
    createWindowWithTabs(tabIds, function(tabs) {
      // TODO: Maybe ensure tabs were moved?
    });
  });
}

function aboutTheDeveloper(info, currentTab) {
  createTabWithUrl("http://devalias.net/dev/chrome-extensions/new-window-with-tabs-to-right/", true);
}

// Keybinding handlers
chrome.commands.onCommand.addListener(function(command) {
  var qOptions = { currentWindow: true, active: true };
  chrome.tabs.query(qOptions, function(arrayOfTabs) {
    var curTab = arrayOfTabs[0];
    if (command === "newWindowWithTabsToRight") {
      newWindowWithTabsToRight(qOptions, curTab);
    } else if (command === "newWindowWithCurrentAndTabsToRight") {
      newWindowWithCurrentAndTabsToRight(qOptions, curTab);
    }
  });
});

// Menu creation with unique IDs for each context menu item (removed inline onclick)
var menuRoot = chrome.contextMenus.create({
  "id": "menuRoot",
  "type": "normal",
  "title": "New window with..",
  "contexts": ["page"]
});

var menuWithTabsToRight = chrome.contextMenus.create({
  "id": "menuWithTabsToRight",
  "parentId": "menuRoot",
  "type": "normal",
  "title": "..tabs to right",
  "contexts": ["page"]
});

var menuWithThisTabAndTabsToRight = chrome.contextMenus.create({
  "id": "menuWithThisTabAndTabsToRight",
  "parentId": "menuRoot",
  "type": "normal",
  "title": "..this tab and tabs to right",
  "contexts": ["page"]
});

var menuSeparator = chrome.contextMenus.create({
  "id": "menuSeparator",
  "parentId": "menuRoot",
  "type": "separator",
  "contexts": ["page"]
});

var menuAboutTheDeveloper = chrome.contextMenus.create({
  "id": "menuAboutTheDeveloper",
  "parentId": "menuRoot",
  "type": "normal",
  "title": "About the Developer",
  "contexts": ["page"]
});

// Global listener for context menu clicks
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  switch (info.menuItemId) {
    case "menuWithTabsToRight":
      newWindowWithTabsToRight(info, tab);
      break;
    case "menuWithThisTabAndTabsToRight":
      newWindowWithCurrentAndTabsToRight(info, tab);
      break;
    case "menuAboutTheDeveloper":
      aboutTheDeveloper(info, tab);
      break;
    default:
      break;
  }
});
