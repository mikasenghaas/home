# Home

Visit [here](https://mikasenghaas.de).

## Development

### GitHub API

1. Create a GitHub Personal Access Token:
   - Go to [GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens/new)
   - Create a new token with `public_repo` scope
   - Copy the generated token

2. Create a `.env.local` file in the project root:
   ```bash
   GITHUB_TOKEN=your_github_personal_access_token_here
   ```

### Start Development Server

```bash
yarn dev
```

### Build

```bash
yarn build
```

### Deploy

Just push to the `main` branch.
