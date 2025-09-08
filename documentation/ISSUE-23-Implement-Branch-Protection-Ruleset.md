# ISSUE-23-Implement-Branch-Protection-Ruleset

**Issue Type:** Enhancement

## Objective:

Prevent direct commits to master and develop by requiring pull requests. Ensure master only accepts merges from develop.

## Description:

Configured GitHub branch protection rules to block direct pushes and enforce PR-based workflow. Added optional workflow check to ensure PRs to master only originate from develop.

## Ruleset Summary

- `master` branch only accepts PRs that originate from `develop`.
- A GitHub Actions workflow enforces this by automatically failing if a PR targets `master` from any branch other than `develop`.
