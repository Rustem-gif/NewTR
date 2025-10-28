# NewTR Project

A TypeScript project with Playwright testing, ESLint, Prettier, and Husky pre-commit hooks.

## Setup

Install dependencies:

```bash
npm install
```

## Linting and Formatting

This project uses ESLint for linting and Prettier for code formatting.

### Available Scripts

- `npm run lint` - Run ESLint and automatically fix issues
- `npm run lint:check` - Run ESLint without fixing issues
- `npm run format` - Format all files with Prettier
- `npm run format:check` - Check if files are properly formatted
- `npm run test` - Run Playwright tests
- `npm run test:ui` - Run Playwright tests with UI mode
- `npm run test:debug` - Run Playwright tests in debug mode

### Pre-commit Hooks

This project uses Husky to run linting and formatting checks before each commit:

- ESLint will check and fix TypeScript/JavaScript files
- Prettier will format all supported files
- Only properly formatted and linted files will be committed

### Configuration Files

- `.prettierrc.json` - Prettier configuration
- `.prettierignore` - Files to ignore for Prettier
- `eslint.config.js` - ESLint configuration (flat config format)
- `.husky/pre-commit` - Pre-commit hook configuration
- `package.json` - Contains lint-staged configuration

### ESLint Rules

The project uses:

- ESLint recommended rules
- TypeScript ESLint plugin for TypeScript-specific rules
- Playwright ESLint plugin for Playwright test rules
- Prettier integration to avoid conflicts

### Prettier Configuration

- 100 character line width
- 2 spaces for indentation
- Single quotes for strings
- Trailing commas where valid in ES5
- LF line endings

## Testing

This project uses Playwright for end-to-end testing. Test files should be placed in the `tests/` directory with the `.spec.ts` extension.
