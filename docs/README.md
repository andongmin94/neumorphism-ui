# Neumorphism UI documentation

The documentation site runs on **Fumapress**, React 19 and Tailwind CSS v4.

`src/pages` owns file-based routes. Fumapress i18n reproduces every page under the existing `/ko`, `/en`, `/zh` and `/ja` prefixes. Shared documentation UI stays in `components`, localized copy stays in `i18n`, and installable source remains owned by `../registry/src`.

Run:

```bash
npm ci
npm run dev
```
