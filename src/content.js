(() => {
  let unreadCount;

  function getUnreadCount(doc) {
    if (!doc) return -1;
    const fullcountElement = doc.querySelector("fullcount");
    if (!fullcountElement) return -1;
    const count = parseInt(fullcountElement.textContent);
    return isNaN(count) ? -1 : count;
  }

  function getTitle(doc) {
    if (!doc) return -1;
    const titleElement = doc.querySelector("title");
    if (!titleElement) return -1;
    return titleElement.textContent;
  }

  // Fetch Gmail feed and parse unread count
  async function getAtomFeed(label, accountNum) {
    const url = `https://mail.google.com/mail/u/${accountNum}/feed/atom${
      label ? `/${label}` : ""
    }?_=${new Date().getTime()}`;

    return fetch(url, {
      method: "GET",
      headers: { "Cache-Control": "no-cache" },
    })
      .then((response) => response.text())
      .then((text) => {
        const parser = new DOMParser();
        return parser.parseFromString(text, "application/xml");
      })
      .catch((err) => {
        console.error("Error fetching Atom feed:", err);
        return null;
      });
  }

  async function updateBadgeIcon(label) {
    let newUnreadCount = 0;
    const checkedAccounts = [];

    // kind of a hack -
    // since we don't know how many email accounts
    // let's check up to 10, and stop once we have
    // no new ones
    for (let i = 0; i < 10; i++) {
      const feed = await getAtomFeed(label, i);
      const emailTitle = getTitle(feed);

      // don't keep counting once we have checked all the accounts
      if (checkedAccounts.includes(emailTitle)) {
        break;
      }

      checkedAccounts.push(emailTitle);
      newUnreadCount += getUnreadCount(feed);
    }

    if (newUnreadCount < 0) return;

    if (newUnreadCount !== unreadCount) {
      unreadCount = newUnreadCount;
      navigator.setAppBadge(unreadCount);
    }
  }

  chrome.storage.sync.get(
    { label: "", pollingInterval: 10000 },
    async ({ label, pollingInterval }) => {
      setInterval(() => updateBadgeIcon(label), 10000);

      // initial
      updateBadgeIcon(label);
    }
  );
})();
