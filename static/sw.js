/**
 * Self-destructing service worker.
 *
 * gatsby-plugin-offline is gone, but the workers it installed are still live in every
 * returning visitor's browser, serving a cached app shell. Simply deleting sw.js does
 * NOT retire them: the browser's update check fetches this exact URL, and a 404 leaves
 * the existing registration in place -- verified against production, where two full
 * loads after the deploy still served the previous build.
 *
 * So this file has to keep existing, and has to be byte-different from the old worker.
 * The update check finds it, installs it, and on activation it unregisters itself,
 * drops the caches the old worker filled, and reloads any open tab onto the real site.
 *
 * Nothing registers this -- the site no longer calls navigator.serviceWorker.register().
 * It exists purely as the exit route for workers already out there. Keep it.
 */

self.addEventListener('install', () =>
{
    self.skipWaiting()
})

self.addEventListener('activate', event =>
{
    event.waitUntil(
        (async () =>
        {
            try {
                const keys = await caches.keys()
                await Promise.all(keys.map(key => caches.delete(key)))
            } catch (e) {
                /* storage blocked -- unregistering still matters, so carry on */
            }

            await self.registration.unregister()

            // Reload open tabs so they leave the stale shell behind immediately
            // rather than on some later navigation.
            const clients = await self.clients.matchAll({ type: 'window' })
            clients.forEach(client =>
            {
                if ('navigate' in client) client.navigate(client.url)
            })
        })()
    )
})
