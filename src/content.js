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

	function getAtomFeedUrl() {
		const url = new URL(window.location.href);
		url.pathname += document.querySelector('link[type="application/atom+xml"]').getAttribute('href');
		return url.toString().split('#')[0];
	}
	
	function getAtomFeed() {
		const atomFeedUrl = getAtomFeedUrl();
		return new Promise((resolve) => {
			const x = new XMLHttpRequest();
			x.open('GET', atomFeedUrl + '?_=' + new Date().getTime(), true);
			x.setRequestHeader('Cache-Control', 'no-cache');
			x.onreadystatechange = function () {
				if (x.readyState == 4 && x.status == 200) {
					resolve(x.responseXML);
				}
			};
			x.send(null);
		});
	}

	async function updateBadgeIcon() {
		const feed = await getAtomFeed();
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
