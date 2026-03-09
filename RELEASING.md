# Releasing

## GitHub repository release

1. Update `package.json` version.
2. Update `CHANGELOG.md`.
3. In npm, configure a Trusted Publisher for this package and repository:
   `@incursa/ui-kit` -> `incursa/ui-kit` -> `.github/workflows/npm-publish.yml`.
4. Confirm the package is scoped/public in npm and that the repository matches the GitHub repo exactly.
5. Run:

```bash
npm install
npm run build
npm pack
```

6. Commit the updated source and `dist/` output.
7. Create a Git tag matching the version, for example `v0.2.1`.
8. Push the branch and tag to GitHub.
9. Create a GitHub Release from the tag.
10. The `Publish to npm` workflow in `.github/workflows/npm-publish.yml` will publish `@incursa/ui-kit` automatically when the release is published via npm Trusted Publishing.
11. Attach the generated `.tgz` file if you want a direct installable artifact on the release page.

## npm publish

The preferred path is GitHub Release -> GitHub Actions -> npm Trusted Publishing.

If you need to publish manually, only do this once the repository URL, npm package name, and package visibility are correct.

```bash
npm publish
```

Because `publishConfig.access` is set to `public`, the scoped package publishes publicly as `@incursa/ui-kit`.
