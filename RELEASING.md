# Releasing

## Day-two release flow

The intended release path is now tag-driven:

1. Land the source changes you want to release on `main`.
2. From a clean working tree, run the release helper with the release type and changelog markdown:

```powershell
.\release.ps1 -ReleaseType patch -Changelog @"
- Summarize the release here.
- Add as many markdown bullets or paragraphs as you want.
"@
```

Use `minor` or `major` instead of `patch` when needed.

3. The script will:

- verify you are on `main`
- verify the working tree is clean
- bump [`package.json`](package.json) and [`package-lock.json`](package-lock.json)
- run build, smoke, and package validation through the npm version flow
- prepend the new section to [`CHANGELOG.md`](CHANGELOG.md)
- commit the release
- create the matching Git tag
- push `main` and the new tag to `origin`

4. If you want it to stop before pushing, use `-NoPush`:

```powershell
.\release.ps1 -ReleaseType patch -Changelog @"
- Release notes go here.
"@ -NoPush
```

What the underlying npm scripts do:

- `npm version <type>` bumps [`package.json`](package.json) and [`package-lock.json`](package-lock.json)
- runs `preversion`, which rebuilds the package, runs the smoke gate, and verifies it with `npm pack --dry-run`
- `npm run verify` performs the same build, smoke, and dry-run package validation without bumping the version
- `npm run smoke` checks source/dist parity and public-surface coverage against the built artifacts
- `npm run package` rebuilds, smokes, and produces the tarball
- the PowerShell helper then commits and tags the release with the matching `v*` tag

5. Pushing the `v*` tag triggers [`.github/workflows/npm-publish.yml`](.github/workflows/npm-publish.yml), which publishes `@incursa/ui-kit` to npm via Trusted Publishing and creates the matching GitHub Release from the new [`CHANGELOG.md`](CHANGELOG.md) section.

If the publish job fails and you need to retry, rerun the original tag-triggered workflow run in GitHub Actions. Do not use a separate manual dispatch for publishing.

The release description is generated from the version section you just added to [`CHANGELOG.md`](CHANGELOG.md), and it appends links to the live example pages on GitHub Pages.

## When to use patch, minor, or major

- `patch`: fixes, polish, non-breaking CSS/JS changes
- `minor`: new backward-compatible components, tokens, utilities, or patterns
- `major`: breaking class, markup, token, or package-surface changes

## npm publish

The preferred path is Git tag -> GitHub Actions -> npm Trusted Publishing.

If you need to publish manually, only do this once the repository URL, npm package name, and package visibility are correct.

```bash
npm publish
```

Because `publishConfig.access` is set to `public`, the scoped package publishes publicly as `@incursa/ui-kit`.
