// Saves options to chrome.storage
function save_options() {
  var accountId = document.getElementById('accountId').value;
  chrome.storage.sync.set({
    accountId: accountId
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value accountId = '0'
  chrome.storage.sync.get({
    accountId: '0',
  }, function(items) {
    document.getElementById('accountId').value = items.accountId;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);