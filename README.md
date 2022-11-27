# Portfolio

This repository holds the source code for my portfolio website `v3`.

The website is hosted on [Vercel](https://www.vercel.com) and connected to the following domains:

- :link: [mikasenghaas.de](https://www.mikasenghaas.de)
- :link: [jonas-mika.de](https://www.jonas-mika.de)
- :fast_forward: [jonassenghaas.de](https://www.jonassenghaas.de) (*Redirects to mikasenghaas.de*)

The subroutes `teaching` and `projects` (as well as an alias to the homepage through `home`) are also available through redirects from subdomains of the above domains:

- [home.[domain].de](https://www.home.mikasenghaas.de)
- [teaching.[domain].de](https://www.teaching.mikasenghaas.de)
- [projects.[domain].de](https://www.projects.mikasenghaas.de)

*Once native browser support gets better, I plan to also host my website on the decentralised blockchains HNS network.*

## :rocket: stack

This is a (mostly) safely-typed TS project using the [next](https://www.nextjs.org) framework.
It is powered by these core libraries:

- [`chakra-ui`](https://chakra-ui.com/) for styling
- [`framer-motion`](https://www.framer.com/) for performant physics-based animations
- [`next-mdx-remote`](https://github.com/hashicorp/next-mdx-remote) to build mdx files server-side during build

Content for the projects and teaching material is written in `.mdx` format, an component-extended markdown file format, compatible with JS.

## :recycle: dev

Run the development server using

```bash
yarn dev
```

to view a live-updated version the local port 3000 [http://localhost:3000](http://localhost:3000).