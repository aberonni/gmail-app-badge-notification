(() => {
  let desc = Object.getOwnPropertyDescriptor(Document.prototype, 'title');
  Object.defineProperty(document, 'title', {
    configurable: true,
    set(v) {
      let m = String(v).match(/Inbox(?: \((\d+)\))? -/);
      if (m) navigator.setAppBadge((m[1]|0) || null);
      desc.set.call(this, v);
    },
    get() { return desc.get.call(this); }
  });
})();
