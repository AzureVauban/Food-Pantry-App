# ISSUE-66-restore-missing-workflows

**Issue Type(s):** Bugfix, Chore / Maintenance

## Objective:

Restore the CI workflows and PR branch‑protection automation that were unintentionally removed during the deployment-branch merge. Ensure GitHub Actions for testing, linting, and pull‑request restrictions are fully functional under the new organizational repository.

## Description:

This branch reintroduces missing GitHub Actions workflows after the repository was transferred from a personal account to the organization. The deleted automation included:

- Continuous Integration (CI) workflow (linting, type-checking, build validation)
- Pull Request Restrictions workflow (enforce PR titles, branches, and review requirements)

The following commits re‑implement these workflows:

- **4a77e5e** — chore: reimplement CI and PR restriction workflows
- **537d066** — chore: update package-lock to sync dependency tree

## Miscellaneous Notes:

- The repo migration caused GitHub CLI PR creation issues because the local remote still pointed to the old personal repo. This was corrected by updating the remote to the organizational URL.
- Workflows were restored based on their last functional state prior to removal.
- No application logic changes were introduced; this branch is strictly workflow and infrastructure restoration.
