# ODE Server Setup

A one-page, copy-and-paste guide for getting a Synkronus server running, live at
https://ode-server.nahati.online/.

- `site/` is the whole website (static files, no build step).
- `site/install.sh` and `site/cloud-init.sh` are copies of `get.sh` and `cloud-init.sh`
  from [synkronus-quickstart](https://github.com/OpenDataEnsemble/synkronus-quickstart).
  `npm run sync-installer` refreshes them from a checkout next to this folder;
  `npm run sync-installer -- <tag>` copies a tagged release instead.
- The line people paste is always `curl -fsSL https://ode-server.nahati.online/install.sh | sudo bash`.
  The script itself is maintained only in synkronus-quickstart; this site serves a pinned copy
  (no redirect to GitHub), the same way https://ode-app.nahati.online/ serves the app builder.
- Tutorial videos are on YouTube and listed once, in order, in `site/js/ode-videos.js`
  (used by both the guide and `site/tutorials/`). Players load only when clicked, from youtube-nocookie.com.
- `site/css/ode-brand.css` is the shared ODE look, identical in the App Builder.

Hosted and supported by Nahati Technologies as a contribution to Open Data Ensemble. We claim no
ownership; all code is open source under its original licences and the ODE project may adopt, move
or rehost these tools at any time.

Deploy (Cloudflare, needs `npx wrangler login` once):

```bash
npm run deploy
```
