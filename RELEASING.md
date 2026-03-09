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
- bump `package.json` and `package-lock.json`
- run package validation through the npm version flow
- prepend the new section to `CHANGELOG.md`
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

- `npm version <type>` bumps `package.json` and `package-lock.json`
- runs `preversion`, which builds the package and verifies it with `npm pack --dry-run`
- the PowerShell helper then commits and tags the release as `v0.2.2`

5. Pushing the `v*` tag triggers `.github/workflows/npm-publish.yml`, which publishes `@incursa/ui-kit` to npm via Trusted Publishing.

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
