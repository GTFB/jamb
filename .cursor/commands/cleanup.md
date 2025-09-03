# Cleanup Protocol

## Steps
1. **Identify the completed branch** (from the previous protocol).
2. **Delete the remote branch:** `git push origin --delete <branch-name>`.
3. **Delete the local branch:** `git branch -d <branch-name>`.
4. **Announce:** "Cleanup complete. Ready for the next goal via the Initialization Protocol."