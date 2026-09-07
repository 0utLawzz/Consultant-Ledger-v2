# Contributing to Consultant Ledger v2

Thank you for your interest in improving this project.

## Development Setup

1. Fork the repository and clone your fork.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Make changes on a feature branch.

## Code Style

- TypeScript strict mode is preferred.
- Follow existing patterns in `src/lib` and `src/components`.
- Run `npm run format` and `npm run lint` before committing.
- Run `npm run typecheck` to verify types.

## Pull Requests

- Keep PRs focused and reasonably small.
- Describe the problem and the solution in the PR body.
- Reference any related issues.
- Ensure the application builds (`npm run build`) and the main flows still work.

## Reporting Bugs

Open an issue with:
- Steps to reproduce
- Expected vs actual behaviour
- Browser / Node version if relevant

## Security

Please do not open public issues for security vulnerabilities. See [SECURITY.md](SECURITY.md).
