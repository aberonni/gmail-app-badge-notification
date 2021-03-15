(() => {
	let unreadCount;

	function getUnreadCount(doc) {
		if (!doc) {
			return -1;
		}
		const fullcountElement = doc.querySelector('fullcount');
		if (!fullcountElement) {
			return -1;
		}
		const count = parseInt(fullcountElement.textContent);
		if (isNaN(count)) {
			return -1;
		}
		return count;
	}

	function getAtomFeed(accountId) {
		return new Promise((resolve) => {
			const x = new XMLHttpRequest();
			x.open('GET', 'https://mail.google.com/mail/u/'+accountId+'/feed/atom?_=' + new Date().getTime(), true);
			x.setRequestHeader('Cache-Control', 'no-cache');
			x.onreadystatechange = function () {
				if (x.readyState == 4 && x.status == 200) {
					resolve(x.responseXML);
				}
			};
			x.send(null);
		});
	}

	async function getLocalStorageValue(key) {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.sync.get(key, function (value) {
                resolve(value);
            })
        }
        catch (ex) {
            reject(ex);
        }
    });
}

	async function updateBadgeIcon() {
		const options = await getLocalStorageValue("accountId");
		const feed = await getAtomFeed(options["accountId"]);
		const newUnreadCount = getUnreadCount(feed);
		if (newUnreadCount < 0) {
			return;
		}
		if (newUnreadCount !== unreadCount) {
			unreadCount = newUnreadCount
			navigator.setAppBadge(unreadCount);
		}
	}

	setInterval(updateBadgeIcon, 1000);
})();
