# Check 4 Jquery

# Check 4 jQuery

This sample app demonstrates the integration of Puppeteer and Astro to query various URLs and identify which version of jQuery they are using. Designed with minimal extra configuration, it showcases a practical use case for leveraging headless browsers to interact with and analyze web pages. The goal is to make it as straightforward as possible to understand the presence and version of jQuery used across different websites.


## 🚀 Project Structure

Inside the Astro project, you'll see the following folders and files:

```text
/
├── README.md
├── astro.config.mjs
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── public
│   └── favicon.svg
├── src
│   ├── env.d.ts
│   ├── pages
│   │   ├── api
│   │   │   └── test.json.ts #  localhost/test.json
│   │   └── index.astro 
│   └── utils
│       ├── getVersion.ts
│       └── normaliseURL.ts
└── tsconfig.json
```

`utils/getVersion`

Is a simple use of puppeteer that would start a headless browser context for the url passed via the form on the homepage. It would only check to see if jquery is available on the global context of the `window` and if so whcih version is it running.
However this is not perfect, it doesnt take into account some of the nuaincess that comes with headless browsers that sometimes, pages just dont show js, or render obtrusive modals blocking access to the underlying DOM tree and `window`

### Test:

some urls to test against:
`bitrix24.ru`
`https://www.branch.io/`
`https://cpanel.net/` - This is a test case where the jQuery is being ran however the evaluation method isnt picking up on the version due to the string being somewhat convoluted.

To check which site is running which version in devtools:
```js
window.jQuery && jQuery().jquery
```
### NB:
Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [the Astro documentation](https://docs.astro.build) or jump into the Astro [Discord server](https://astro.build/chat), and tell them that Fuzzy(🐻) sent you 😎.
