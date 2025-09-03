# Code Refactoring Protocol

## Overview
Systematically improve existing code with a focus on **guaranteeing the preservation of current functionality** through rigorous testing.

## Steps
1.  **Preparation & Branching**
    - Create a new branch from `develop`: `git switch -c refactor/<issue_number>-<short-description>`.

2.  **Baseline & Planning**
    - **Propose an algorithm** for the refactoring. Await user approval.
    - **Generate a technical checklist.**
    - **CRITICAL: Verify existing test coverage.** Before making any changes, run `bun run test --coverage` on the code to be refactored.
    - **Ask:** "Current test coverage for the target module is X%. Is this sufficient to safely proceed? (Yes/No)".
    - If "No", **first write additional tests** to fully cover the existing behavior. Commit them with `test:` prefix.

3.  **Iterative Refactoring Cycle**
    - **Make one atomic change:** Apply a single, small, isolated refactoring (e.g., rename variable, extract method) from the checklist.
    - **Run tests:** After *every single atomic change*, run `bun run test`. **If any test fails, revert the change immediately** and reconsider the approach.
    - **Commit the change:** Create a commit with the `refactor:` prefix.
    - Repeat this cycle until the goal is achieved.

4.  **Finalization & Pull Request**
    - **Run Quality Gate Protocol.** (This will run linting and a final full test suite).
    - Sync with the integration branch: `git pull --rebase origin develop`.
    - Push the task branch: `git push --set-upstream origin <branch-name>`.
    - Create a Pull Request targeting the `develop` branch. The description should clearly state that **no functional changes are expected.**
    - **Paste the Vercel Preview URL and the PR link.** The preview is used to visually confirm that nothing broke.
    - **Halt and await code review.**

## Handoff
- After PR is merged by the user, proceed to the **Cleanup Protocol**.