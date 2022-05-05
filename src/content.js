Object.defineProperty(document, 'title', {
  configurable: true,
  set(v) {
    navigator.setAppBadge((String(v).match(/\((\d+)\)/) || [])[1] | 0 || null);
  }
});
