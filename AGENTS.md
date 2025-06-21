# Repository Agent Instructions

This project contains both a Python backend and a TypeScript/React frontend. Contributors and automated tools should follow these guidelines when modifying files anywhere in this repository.

## Style and Formatting
- **TypeScript/JavaScript**: format code with Prettier and run ESLint. The configuration lives in `.prettierrc` and `.eslintrc`.
- **Python**: use `ruff format` or `black` and `isort` for formatting. Lint with `ruff` and type check with `dmypy` (see `pnpm run lintPython`).
- `lint-staged.config.js` defines the commands executed on pre-commit hooks.

## Testing
- Run `pnpm run lint` to lint the UI and backend.
- Run backend unit tests with `cd backend && poetry run pytest`.
- End‑to‑end tests can be executed with `pnpm test` (requires Cypress).

## Documentation
- See `CONTRIBUTING.md` for full setup instructions and `RELENG.md` for release procedures.

