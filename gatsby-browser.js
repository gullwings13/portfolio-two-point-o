/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

/**
 * Tear down the gatsby-plugin-offline service worker.
 *
 * Dropping the plugin from gatsby-config stops NEW visitors getting a worker, but it
 * does nothing about the ones already installed in returning visitors' browsers -- those
 * keep serving the old CacheFirst/StaleWhileRevalidate rules forever. This unregisters
 * them and clears the caches they filled. It has to stay for at least one deploy cycle;
 * realistically, leave it.
 */
exports.onClientEntry = () =>
{
    if (typeof window === 'undefined') return

    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
        navigator.serviceWorker
            .getRegistrations()
            .then(registrations => registrations.forEach(r => r.unregister()))
            .catch(() => { /* nothing to unregister, or blocked -- not worth surfacing */ })
    }

    // The worker is gone but its caches are not; without this the stale page-data and
    // /static/ entries just sit there taking up quota.
    if (typeof caches !== 'undefined' && typeof caches.keys === 'function') {
        caches
            .keys()
            .then(keys => Promise.all(keys.map(key => caches.delete(key))))
            .catch(() => { /* storage blocked (private mode, etc.) */ })
    }
}
