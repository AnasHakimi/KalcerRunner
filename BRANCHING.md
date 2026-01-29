# Branching Strategy

This document outlines the branching strategy for the KalcerRunner project.

## Branch Structure

### Main Branches

- **master**: The main production branch. All releases are made from this branch.
- **development**: The main development branch where features are integrated before being merged to master.

### Feature Branches

Feature branches should be created from the `development` branch and merged back into it when complete.

Naming convention: `feature/<feature-name>`

Example:
```bash
git checkout development
git pull origin development
git checkout -b feature/new-feature
# Make your changes
git push -u origin feature/new-feature
```

### Workflow

1. Create a feature branch from `development`
2. Make your changes and commit them
3. Push your feature branch to remote
4. Create a pull request to merge into `development`
5. After code review and approval, merge into `development`
6. Periodically, merge `development` into `master` for releases

## Creating the Development Branch

If the development branch doesn't exist yet, create it from master:

```bash
git checkout master
git pull origin master
git checkout -b development
git push -u origin development
```

## Keeping Branches Updated

### Updating Development from Master

```bash
git checkout development
git pull origin development
git merge master
git push origin development
```

### Updating Feature Branch from Development

```bash
git checkout feature/your-feature
git pull origin development
git merge development
# Resolve any conflicts
git push origin feature/your-feature
```
