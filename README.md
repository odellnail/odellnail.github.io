# [Business Name] — Landing Page

Static site, no build step. Plain HTML/CSS/JS, deployable straight to GitHub Pages.

## Structure
```
index.html       - the page itself
css/style.css    - all styling (no inline styles anywhere — required by CSP, see below)
js/gtm-init.js   - GTM bootstrap snippet (external file, not inline — see why below)
js/main.js       - footer year, nav, GTM custom-event wiring, contact form handler stub
img/             - put images here
```

## Deploying to GitHub Pages
1. Push this repo to GitHub.
2. Repo Settings → Pages → set source to your default branch, root folder (`/`).
3. Wait a minute, your site will be live at `https://<username>.github.io/<repo>/`.
4. If you want a custom domain, add a `CNAME` file with the domain in it at the repo root, and point your DNS at GitHub's IPs (their docs cover this — search "GitHub Pages custom domain").

## Before you launch — things still marked as placeholders
- **GTM container ID**: appears in TWO places — `js/gtm-init.js` (one line, near the bottom) and `index.html`'s `<noscript>` iframe. Both say `GTM-XXXXXXX`. Replace both, or analytics won't load. Get a container ID at tagmanager.google.com — it's free.
- **Contact form**: `action="#"` goes nowhere right now. GitHub Pages is static, so it can't process form submissions server-side. You need a third-party form handler — Formspree, Netlify Forms (works even outside Netlify hosting for the form endpoint), or your own backend. Once you pick one, update the `action` attribute and the `connect-src`/`form-action` lines in the CSP meta tag in `index.html` to allow that domain.
- All the placeholder text — headline, services, about copy, business name in the title/footer.

## CSP notes — read this before adding more tags in GTM
The Content-Security-Policy is set via a `<meta>` tag at the top of `<head>` in `index.html`, not as an HTTP header — GitHub Pages doesn't let you set custom response headers on static hosting, so meta tag is the only option here. That has two real consequences:
- `frame-ancestors` doesn't work via meta tag (browsers ignore it in this context) — so this CSP can't control whether your site gets embedded in someone else's iframe. Not usually a dealbreaker for a small business site, just know it's not covered.
- No violation reporting. With a header you could set `report-to` and get pinged when something's blocked; with meta, you find out by checking the browser console yourself.

**Every time you add a new Tag in GTM** (Google Ads conversion tracking, Meta Pixel, Hotjar, whatever), there's a real chance it'll get silently blocked by the CSP because it's calling out to a domain that isn't allow-listed yet. The fix is always the same: open browser dev tools → Console tab, look for a red CSP violation message, it names the exact domain that got blocked, add that domain to the matching directive in the meta tag (usually `script-src` and `connect-src` both need it), reload, gone. The current policy only allow-lists Google's own domains since that's all that's wired up so far.

## Why GTM is loaded the way it is
Google's standard GTM snippet is normally pasted inline in `<head>`. Here it's split out into `js/gtm-init.js` and loaded via `<script src="...">` instead, specifically so the CSP doesn't need `'unsafe-inline'` on `script-src`. `unsafe-inline` defeats most of the point of having a script-src restriction at all (it'd allow literally any inline script to run, injected ones included), so avoiding it was worth the one extra file.

## GTM custom events
Any element with `data-gtm-event="some_name"` gets its clicks auto-pushed to `dataLayer` (handled in `js/main.js`). To track a new button later, just add the attribute — no JS changes needed:
```html
<a href="#" data-gtm-event="pricing_click">See pricing</a>
```
Then in GTM: new Trigger → Custom Event → event name `pricing_click` → attach to whatever Tag should fire.
