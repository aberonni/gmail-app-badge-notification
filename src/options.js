const defaultOptions = {
    label: '', // Default: track all unread emails
};

function restoreOptions() {
    chrome.storage.sync.get(defaultOptions, (options) => {
        document.getElementById('label').value = options.label || '';
    });
}

function saveOptions(event) {
    event.preventDefault();
    const label = document.getElementById('label').value.trim();

    // Transform "important" to "^iim" without reassigning label
    const finalLabel = label.toLowerCase() === 'important' ? '^iim' : label;

    chrome.storage.sync.set({ label: finalLabel }, () => {
        const status = document.getElementById('status');
        status.classList.add('show');
        setTimeout(() => status.classList.remove('show'), 2000);
    });
}


document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('settings-form').addEventListener('submit', saveOptions);
