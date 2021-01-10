# Relabeler

_Based on the template [typescript-action](https://github.com/actions/typescript-action)_.

## Contribute

Install the dependencies.

```bash
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

Run the linter.

```bash
npm run lint
```

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
