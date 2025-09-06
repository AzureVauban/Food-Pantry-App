Thank you for considering contributing to this project! To keep our history clean and consistent, please follow these guidelines when making commits and pull requests.

## Commit Message Conventions
- **Use the imperative mood** for commit messages.  
  - ✅ `fix: update pantry item schema to include expiration date`  
  - ❌ `fixed pantry item schema`  
  - ❌ `updates pantry item schema`

### Why Imperative Mood?
- The imperative mood (“do this”, “add that”) matches the convention recommended in the official **Git documentation on commit hygiene**.  
- Git itself uses this style in default messages (e.g., `Merge branch ...`, `Revert ...`).  
- It reads as an instruction for what the commit *does* if applied:  
  - *“Apply this commit, and it will **fix bug in storage handler**.”*  
- Keeps the log consistent and makes it easier to scan history and generate changelogs.

Reference: [Git Project’s Commit Message Guidelines](https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project#_commit_guidelines)

## General Guidelines
1. Keep commits **small and focused** (one change per commit).  
2. Write **clear commit messages** (title in 50 characters or less; optional body with more detail).  
3. Use [Conventional Commits](https://www.conventionalcommits.org/) style prefixes (`feat:`, `fix:`, `docs:`, `chore:`, etc.) when possible.  
4. Rebase before merging to maintain a linear history.  
5. Run tests and linting before pushing changes.
