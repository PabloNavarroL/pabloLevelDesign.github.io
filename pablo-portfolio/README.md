# Pablo Navarro — Level Design Portfolio

A static site — plain HTML/CSS/JS, no build step, no dependencies. Free to host on GitHub Pages.

## What's inside

```
index.html                  Homepage — hero, project grid, about teaser, contact
about.html                  Full bio / background / favorites
projects/facility.html      Case study — The Facility
projects/scrap-mechanic.html Case study — Scrap Mechanic (needs real content)
projects/ld-studies.html    Case study — Tenebrosity & Post Drone
css/style.css               All styling — one file, uses CSS custom properties
js/nav.js                   Mobile nav toggle
images/                     Placeholder SVGs — replace these with real screenshots
```

## Things still marked `needs-edit`

I couldn't fully scrape the original site (it blocks automated access), so some
content is reconstructed from fragments and clearly flagged. Search the codebase
for `needs-edit` to find every spot that needs a human pass — dates, the CV
timeline, the favorite games list, the Scrap Mechanic write-up, and all imagery.

```bash
grep -rn "needs-edit" .
```

Once you've replaced something, you can safely delete the `class="needs-edit"`
attribute — it only adds a dashed outline in the browser so placeholders are easy
to spot while editing; it has no other effect.

## Replacing images

All images in `images/` are auto-generated placeholder SVGs (grid + label showing
what should go there and at what rough dimensions). Swap in real screenshots with
the **same filename** and everything just works — no HTML changes needed. JPG/PNG
is fine; just update the `src` extension in the relevant HTML file if you don't
keep the `.svg` name.

## Running it locally

No build tools needed. Either:

- Open `index.html` directly in a browser, or
- Serve it locally so relative paths behave exactly like they will on GitHub Pages:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publishing to GitHub Pages

1. **Create a new repository** on GitHub (e.g. `pablo-portfolio`). Don't
   initialize it with a README — you already have one.

2. **Push this folder to it**, from inside this folder:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

3. **Turn on Pages**: on GitHub, go to your repo → **Settings** → **Pages**.
   Under "Build and deployment", set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`. Save.

4. GitHub will give you a URL like `https://<your-username>.github.io/<repo-name>/`
   within a minute or two. That's the live site.

5. **Custom domain (optional)**: if you want `pablonavarro-leveldesigner.com` to
   point here instead of the old host, add a `CNAME` file to the repo root
   containing just the domain, then set it under Settings → Pages → Custom domain.
   You'll also need to point your domain's DNS at GitHub's Pages IPs (GitHub's
   docs walk through the exact A/CNAME records).

## Making future edits

Since it's plain HTML/CSS, any edit is: open the file, change the text, commit,
push. No rebuild step. For repeated edits, `git add . && git commit -m "..." && git push`
is the whole workflow.
