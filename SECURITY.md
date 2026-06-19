# Security

Incursa UI Kit is a public JavaScript/CSS package for reusable UI surfaces. Treat package metadata, generated manifests, examples, and browser runtime code as part of the security boundary.

## Reporting

Do not report vulnerabilities, exploit details, secrets, private transcripts, local credential paths, or sensitive customer data in a public issue.

Use GitHub private vulnerability reporting if it is enabled for this repository. If it is unavailable, contact the repository owner privately through GitHub and request a private reporting path before sharing details.

For general support and usage questions, use public issues. See [`SUPPORT.md`](SUPPORT.md).

## Supported Versions

Security reports are accepted for the latest published package version and current `main` branch. Older versions may receive a fix when the issue is severe and the fix can be applied without reintroducing unsupported surfaces.

## Required Controls

- Keep credentials and local auth material out of source control.
- Use the narrowest practical permissions for npm, GitHub, Cloudflare, and automation tokens.
- Treat generated logs, command output, screenshots, MCP manifests, and package artifacts as potentially sensitive until reviewed.
- Rotate any exposed credential immediately and remove it from git history before continuing public work.

