# Softon Website

Official marketing website for **Softon** - a software development company focused on building scalable digital products for startups and businesses.

This project is a fast, lightweight, multi-page static site designed to present:
- Company positioning and value proposition
- Services and delivery process
- Featured projects
- Team and company mission
- Contact and lead generation details

## Live Website Purpose

The website is built to:
- Introduce Softon as a full-cycle development partner
- Build trust through project highlights and partner logos
- Guide visitors toward contact/conversion actions
- Provide a responsive browsing experience across desktop and mobile

## Pages

- `index.html`: Home page (hero, services overview, partners, key stats)
- `services.html`: Service list, development process timeline, FAQ
- `projects.html`: Featured project cards and CTA
- `about.html`: Company story, mission/vision, values, team
- `contact.html`: Contact information, message form, map

## Features

- Responsive layout with breakpoints for desktop/tablet/mobile
- Sticky header navigation
- Mobile hamburger menu
- EN/KA language switching via client-side i18n
- Persistent language selection using `localStorage`
- Reusable footer navigation across pages

## Tech Stack

- HTML5
- CSS3 (`css/style.css`)
- Vanilla JavaScript (`js/main.js`)
- Static assets in `img/`

No framework or build step is required.

## Project Structure

```text
Softon/
├─ index.html
├─ services.html
├─ projects.html
├─ about.html
├─ contact.html
├─ css/
│  └─ style.css
├─ js/
│  └─ main.js
├─ img/
│  └─ ...assets
└─ docs/
   └─ ...internal notes
```

## Getting Started (Local)

1. Clone repository:
```bash
git clone <your-repo-url>
cd Softon
```

2. Run a local static server (recommended):
```bash
python -m http.server 8080
```

3. Open in browser:
```text
http://localhost:8080
```

You can also open `index.html` directly, but a local server is better for consistent asset/path behavior.

## Deployment

Because this is a static site, it can be deployed to:
- GitHub Pages
- Netlify
- Vercel (static output)
- Any Nginx/Apache static hosting

### GitHub Pages (quick approach)

1. Push project to GitHub repository
2. Go to **Settings -> Pages**
3. Select branch (usually `main`) and root folder
4. Save and wait for publish

## i18n Notes (EN/KA)

Language switching is managed in `js/main.js`.

Implementation pattern:
- `data-i18n="key"` for text nodes
- `data-i18n-attr="attribute:key"` for attributes (e.g., `placeholder`)
- Add matching keys in both dictionaries (`en`, `ka`)

## Design & UX Direction

Current style direction:
- Clean business visual language
- Teal/neutral palette
- Card-based content blocks
- Conversion-oriented CTAs

## Future Improvements

- Complete i18n coverage for all long-form text content
- Form backend integration (API or serverless function)
- SEO improvements (meta descriptions, Open Graph, structured data)
- Accessibility pass (labels, landmarks, keyboard/focus refinements)
- Performance optimization (image compression, lazy loading tuning)
- Add analytics and conversion tracking

## Contributing

1. Create a feature branch
2. Make and test changes
3. Commit with clear message
4. Open pull request

Recommended:
- Keep HTML semantic
- Reuse existing classes/components where possible
- Test desktop + tablet + mobile before submitting

## License

This project is currently private/proprietary unless you explicitly add an open-source license file.