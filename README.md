# Experimental-HTML-CSS-JS

A sandbox website for trying out CSS, JavaScript, and libraries. Each experiment lives in its own folder and is reachable through the popout navigation (menu button in the top-left corner of every page).

## Running

Serve the repo root with any static server, e.g.:

```sh
python3 -m http.server
```

Then open <http://localhost:8000/>.

## Adding an experiment

1. Create a new folder with its own `index.html`, `css/` and `scripts/` (copy an existing experiment as a starting point).
2. Add the shared nav and base styles to the new page's `<head>` (the base stylesheet provides the site-wide colors, dark/light design tokens and the `.c-card` content block — keep page CSS limited to the experiment's own components):

   ```html
   <script src="../shared/nav/nav.js" defer></script>
   <link rel="stylesheet" href="../shared/base/base.css">
   ```

3. Register the experiment in the `experiments` array at the top of [`shared/nav/nav.js`](shared/nav/nav.js):

   ```js
   { name: "My Experiment", path: "my-experiment", icon: "flask-conical" },
   ```

   Pick any icon name from [lucide.dev/icons](https://lucide.dev/icons).
