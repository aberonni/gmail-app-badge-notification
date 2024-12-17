(() => {
    let unreadCount;

    function getUnreadCount(doc) {
        if (!doc) return -1;
        const fullcountElement = doc.querySelector('fullcount');
        if (!fullcountElement) return -1;
        const count = parseInt(fullcountElement.textContent);
        return isNaN(count) ? -1 : count;
    }

    // Fetch Gmail feed and parse unread count
    async function getAtomFeed(label) {
        const url = `https://mail.google.com/mail/feed/atom${label ? `/${label}` : ''}?_=${new Date().getTime()}`;
        return fetch(url, { method: 'GET', headers: { 'Cache-Control': 'no-cache' } })
            .then(response => response.text())
            .then(text => {
                const parser = new DOMParser();
                return parser.parseFromString(text, 'application/xml');
            })
            .catch(err => {
                console.error('Error fetching Atom feed:', err);
                return null;
            });
    }

    async function updateBadgeIcon() {
        chrome.storage.sync.get({ label: '' }, async ({ label }) => {
            const feed = await getAtomFeed(label);
            const newUnreadCount = getUnreadCount(feed);
            if (newUnreadCount < 0) return;

            if (newUnreadCount !== unreadCount) {
                unreadCount = newUnreadCount;
                navigator.setAppBadge(unreadCount); 
            }
        });
    }

    setInterval(updateBadgeIcon, 5000);

    updateBadgeIcon();
})();
