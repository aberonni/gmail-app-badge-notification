
chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create('keepAlive', { periodInMinutes: 1 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'keepAlive') {
        console.log('Service worker ping');
    }
});

chrome.contextMenus.create({
    id: "open-options",
    title: "Configure Gmail Badge",
    contexts: ["all"],
});

chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === "open-options") {
        chrome.runtime.openOptionsPage();
    }
});

// Wrap storage access in try...catch
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type === 'getLabel') {
        try {
            const { label } = await chrome.storage.sync.get({ label: '' });
            sendResponse({ label });
        } catch (error) {
            console.error('Error accessing storage:', error);
            sendResponse({ label: null });
        }
    }
    return true;
});
