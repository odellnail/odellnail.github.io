/*
 * Google Tag Manager bootstrap.
 * This is Google's standard inline <head> snippet, moved into an external
 * file so index.html's CSP doesn't need 'unsafe-inline' on script-src.
 *
 * REPLACE THE PLACEHOLDER BELOW with your real container ID
 * (format: GTM-XXXXXXX) from https://tagmanager.google.com once you have one.
 * Also update the matching ID in the <noscript> iframe in index.html —
 * there are two places this ID appears, not one.
 */
(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != "dataLayer" ? "&l=" + l : "";
  j.async = true;
  j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", "GTM-XXXXXXX");
