# Initialization Protocol

## Steps
1. **Workspace Synchronization**
   - Run `git switch main ; git pull origin main`.
   - Run `git switch develop ; git pull origin develop`.
   - Run `git merge main` (to ensure `develop` has the latest from `main`).
   - Announce readiness for a new task.

2. **Task Acquisition**
   - **Ask:** "What is our goal? Please provide the task description or GitHub Issue number."
   - Await user input.

3. **Begin Main Workflow**
   - Transfer control to the **Task Execution Protocol**.