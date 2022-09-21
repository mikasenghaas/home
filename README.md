# Portfolio

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![Netlify](https://img.shields.io/netlify/0ed46b89-c12e-4434-a1d0-4e0d437af36f?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/jonas-mika/portfolio?style=flat-square)

My personal portfolio website is written in `ReactJS` (Javascript/ Typescript).
The entire frontend structure is hosted on [Netlify](https://www.netlify.com/). A single netlify application runs
and uses manual deploys to publish the staging and production build. The sites are live at:

- :link: [jonas-mika.de](https://www.jonas-mika.de) (`production`)
- :link: [jonas-mika-de.netlify.app](https://jonas-mika-de.netlify.app/) (`production`)
- :link: [staging--jonas-mika-de.netlify.app](https://staging--jonas-mika-de.netlify.app/) (`staging`)

## Workflow (deploying to `sta` or `pro`)

New features are built locally in the `dev` branch of the repository.
To run the app on a locally server on port `3000` (default react port), type either

```
npm start
```

_This is the React default_

```
netlify dev -p 8888
```

_This runs netlify in a local environment - unforunately it cannot run the app on port `3000`, so this command uses port `8888`_

Once a set of features is developed and ready to be published to production, build the dev branch and then deploy.

```bash
netlify build --context staging
netlify deploy --dir staging --alias staging [--prod]
```

_`prod` flag will instantly publish to [https://www.staging--jonas-mika-de.netlify.app](https://www.staging--jonas-mika-de.netlify.app) - otherwise, will get preview URL_

If the page looks good, do the same procedure, but to the production site:

```bash
netlify build --context production
netlify deploy --dir production --prod
```

:sparkles: The website should be live at :link: [jonas-mika.de](https://www.jonas-mika.de)!
