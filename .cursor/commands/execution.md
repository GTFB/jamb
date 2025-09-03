# Task Execution Protocol

## Overview
A unified workflow for `feature`, `fix`, and `refactor` tasks, deeply integrated with the project's specific tooling (Hygen, Zod, Shadcn).

## Steps
1.  **Preparation & Branching**
    - Determine task type (`feature`, `fix`, `refactor`) and short description from the goal.
    - Create a new branch from `develop`: `git switch -c <type>/<issue_number>-<short-description>`.

2.  **Planning & Scaffolding**
    - **Propose an algorithm.** Await user approval.
    - **Generate a technical checklist.**
    - **Analyze the checklist for scaffolding opportunities:**
        - **"Need a new component?"** -> Ask: "Scaffold a new component named 'X' using Hygen? (Yes/No)". If yes, run `bun hygen component new --name X`.
        - **"Need a new content type?"** -> Ask: "Define a new content collection named 'Y'? (Yes/No)". If yes:
            1. Create a new Zod schema in `/apps/web/content/_schemas/Y.ts`.
            2. Create a new directory `/apps/web/content/<site>/Y/`.
            3. Update the DAL (`lib/api.ts`) with new functions to handle 'Y'.
        - **"Need a new PDF template?"** -> Ask: "Scaffold a new PDF template named 'Z'? (Yes/No)". If yes, run `bun hygen pdf new --name Z`.

3.  **Implementation & Iteration**
    - **Implement the logic.** Follow the checklist.
    - **Work with MDX:** When editing or creating MDX content, strictly validate the frontmatter against the corresponding Zod schema.
    - **Compose UI:** Use existing components from `packages/ui` or scaffold new ones.
    - **Commit frequently** with conventional commit messages.

4.  **Finalization & Pull Request**
    - **Run Quality Gate Protocol.** Wait for it to complete successfully.
    - Sync with the integration branch: `git pull --rebase origin develop`.
    - Push the task branch: `git push --set-upstream origin <branch-name>`.
    - Create a Pull Request targeting the `develop` branch.
    - **Paste the Vercel Preview URL and the PR link into the chat.**
    - **Halt and await code review.**

## Handoff
- After PR is merged by the user, proceed to the **Cleanup Protocol**.