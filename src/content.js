(() => {
	let unreadCount;

	function getUnreadCount() {
		const inboxNavigationElement = document.querySelector('div[role=navigation] [title*="Inbox"]');
		if (!inboxNavigationElement) {
			return 0;
		}
		const countText = inboxNavigationElement.getAttribute('aria-label').replace(/[^0-9]/g, '');
		const count = parseInt(countText);
		return isNaN(count) ? 0 : count;
	}

	function updateBadgeIcon() {
		const newUnreadCount = getUnreadCount();
		if (newUnreadCount !== unreadCount) {
			unreadCount = newUnreadCount
			navigator.setAppBadge(unreadCount);
		}
	}

	setInterval(updateBadgeIcon, 500);
})();
