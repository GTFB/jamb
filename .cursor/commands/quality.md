# Quality Gate Protocol

## Steps
1. **Static Analysis:**
   - Run `bun run lint`. Fix all errors and warnings.

2. **Testing:**
   - Run `bun run test --coverage`.
   - Fix all failing tests.
   - If new logic was added, **write new tests** to cover it.

3. **Index Generation:**
   - Run `bun run build:search-index`. Ensure it completes without errors.

4. **Announce completion:** "Quality Gate passed successfully."