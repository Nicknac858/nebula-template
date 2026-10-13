# Nebula landing page template

A responsive, animated recreation of the supplied Nebula hero reference. The background artwork is a clean, high-resolution edit of the provided image, with the interface rebuilt as accessible HTML and CSS. No framework or build step is required.

## Preview locally

Open `index.html` in a browser, or serve this folder with any static web server. The page uses relative paths, so it also works when hosted in a GitHub Pages project subfolder.

## Customize

- Edit the headline, paragraph, navigation, and button labels in `index.html`.
- Replace `assets/nebula-art.png` with another background image if needed.
- Update colors, type, spacing, and mobile layout in `styles.css`.
- The visible navigation and calls to action currently open a small preview dialog. Replace their `data-preview` handling in `script.js` as you add the remaining sections and destinations.
- The particle animation, parallax, and reduced-motion handling are in `script.js`.

The original screenshot text and controls are **not** baked into the page background; all interface elements remain editable.

## GitHub Pages

Publish from the repository's root on the `main` branch or use a Pages workflow. Because this is a static template, no build command or deployment artifact is needed.

