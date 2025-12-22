const defaultOptions = {
    label: '', // Default: track all unread emails
    pollingInterval: 1000, // Default: check every 1 second (in milliseconds)
};

function restoreOptions() {
    chrome.storage.sync.get(defaultOptions, (options) => {
        document.getElementById('label').value = options.label || '';
        // Convert milliseconds to seconds for display
        document.getElementById('pollingInterval').value = (options.pollingInterval || 1000) / 1000;
    });
}

function saveOptions(event) {
    event.preventDefault();
    const label = document.getElementById('label').value.trim();
    const pollingIntervalSeconds = parseInt(document.getElementById('pollingInterval').value) || 1;

    // Define a mapping of labels to their transformed values
    // the transformed values are the ones used and displayed in Gmail's Atom feed
    // the original labels are the ones still used by good ol' Gmail although they updated the UI to the new values
    const labelMap = {
        'important': '^iim',
        'personal': '^smartlabel_personal',
        'social': '^smartlabel_social',
        'promotions': '^smartlabel_promo',
        'updates': '^smartlabel_notification',
        'forums': '^smartlabel_group',
        'newsletter': '^smartlabel_newsletter',
        'receipt': '^smartlabel_receipt',
    };

    const finalLabel = labelMap[label.toLowerCase()] || label;
    // Convert seconds to milliseconds for storage
    const pollingInterval = pollingIntervalSeconds * 1000;

    chrome.storage.sync.set({ label: finalLabel, pollingInterval: pollingInterval }, () => {
        const status = document.getElementById('status');
        status.classList.add('show');
        setTimeout(() => status.classList.remove('show'), 2000);
    });
}


document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('settings-form').addEventListener('submit', saveOptions);
