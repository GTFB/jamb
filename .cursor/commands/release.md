# Release & Hotfix Protocol

## Steps
1.  **Branch Creation**
    - **For Release:**
        - Analyze `develop` branch history to suggest a new version (major/minor/patch).
        - Await user confirmation for version `v*.*.*`.
        - Create branch `release/v*.*.*` from `develop`.
    - **For Hotfix:**
        - Ask for the issue description.
        - Create branch `hotfix/<short-description>` from `main`.

2.  **Implementation & Versioning (Hotfix only)**
    - Implement the fix.
    - Write a test that reproduces and fixes the bug.

3.  **Finalization & Versioning (Release only)**
    - Update `CHANGELOG.md` and version numbers in `package.json`.
    - Commit the version bump.

4.  **Merge into `main`**
    - Push the `release` or `hotfix` branch.
    - Create a Pull Request targeting `main`.
    - **Paste the Vercel Preview URL and the PR link.**
    - After user approval and merge:
        - Create a Git tag `v*.*.*` on `main`. `git tag v*.*.* ; git push origin v*.*.*`.

5.  **Backport to `develop`**
    - Run `git switch develop ; git pull`.
    - Run `git merge main`.
    - Push `develop`: `git push origin develop`.

6.  **Handoff**
    - Proceed to the **Cleanup Protocol**.