// Gmail's manifest declares "display": "browser", so Chrome installs Gmail as a
// DIY app, and macOS never shows a DIY app's Dock badge. Serving the same
// manifest with "display": "standalone" makes Chrome install a regular app.
(() => {
    const overridden = new WeakSet();

    async function override(link) {
        if (overridden.has(link) || link.href.startsWith('data:')) return;
        overridden.add(link);

        const manifestUrl = link.href;
        const manifest = await fetch(manifestUrl).then(response => response.json());
        const absolute = url => new URL(url, manifestUrl).href;

        manifest.display = 'standalone';
        manifest.start_url = absolute(manifest.start_url);
        manifest.id = absolute(manifest.id ?? manifest.start_url);
        manifest.scope = absolute(manifest.scope);
        manifest.icons = manifest.icons?.map(icon => ({ ...icon, src: absolute(icon.src) }));

        link.href = `data:application/manifest+json,${encodeURIComponent(JSON.stringify(manifest))}`;
    }

    const overrideAll = () => document.querySelectorAll('link[rel="manifest"]').forEach(override);

    new MutationObserver(overrideAll).observe(document, { childList: true, subtree: true });
    overrideAll();
})();
