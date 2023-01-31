# Relabeler

[![Check dist](https://github.com/johlju/relabeler-action/actions/workflows/check-dist.yml/badge.svg?branch=main)](https://github.com/johlju/relabeler-action/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/johlju/relabeler-action/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/johlju/relabeler-action/actions/workflows/codeql-analysis.yml)
[![Pipeline](https://github.com/johlju/relabeler-action/actions/workflows/pipeline.yml/badge.svg?branch=main)](https://github.com/johlju/relabeler-action/actions/workflows/pipeline.yml)

_Based on the template [typescript-action](https://github.com/actions/typescript-action)_.

## Contribute

Install the dependencies. If Node.js v14 is installed, install npm v7 manually,
if Node.js v15 is installed npm v7 is already installed. If npm v7 is
used peer dependencies are installed automatically.

```bash
sudo npm install --global npm
npm install
```

Build the typescript and package it for distribution

```bash
npm run build && npm run package
```

Run the tests.

```bash
npm test
```

Run the tests and watch for changes.

```bash
npm run test:watch
```

Run the linter.

```bash
npm run lint
```

>**NOTE:** To see debug messages output from the job _Execute_ in a fork.
>In the repository add the repository secrets `ACTIONS_RUNNER_DEBUG` and
>`ACTIONS_STEP_DEBUG` and set each to the value `true`. See more information
>in [Enabling debug logging](https://docs.github.com/en/free-pro-team@latest/actions/managing-workflow-runs/enabling-debug-logging).]

## Distribute

As a new major version. Assuming using major versioning (e.g v1) rather
than semantic versioning (see [Versioning](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)).

```bash
# Make sure main is up to date
git checkout main
git fetch origin main
git rebase origin/main

# Create a new tag
git tag -fa v1 -m "Update v1 tag" # Create a new or updated an existing tag
git push origin v1 --force # Force push the new or updated tag

# Create a new release branch
git checkout -b releases/v1

# Build the release
npm run build && npm run package

# Push the new release to the release branch
git add dist
git commit -a -m "prod dependencies"
git push origin releases/v1
```

To an existing major version.

```bash
# Make sure main is up to date
git checkout main
git fetch origin main
git rebase origin/main

# Update the existing tag
git tag -fa v1 -m "Update v1 tag" # Create a new or updated an existing tag
git push origin v1 --force # Force push the new or updated tag

# Checkout the existing release branch
git checkout releases/v1

# Get all changes from default branch
git rebase origin/main

# Build the release
npm run build && npm run package
git add dist
git commit -a -m "prod dependencies"

# Push the new release to the release branch
git push origin releases/v1
```
