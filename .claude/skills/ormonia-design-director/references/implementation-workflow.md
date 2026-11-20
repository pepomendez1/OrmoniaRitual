# ORMONIA · Design / Implementation Workflow

## Why this exists

The project becomes generic when Claude is asked to:
design + decide + implement + polish everything at once.

Separate judgment from execution.

## Recommended two-role workflow

### Role A · Design Director

Does NOT edit code first.

Receives:
- screenshot;
- current route;
- objective;
- references.

Produces:
1. what works;
2. what feels generic/AI;
3. maximum 3 changes;
4. what must stay locked;
5. optional reference rationale.

### Role B · Implementer

Receives the approved 1–3 changes.

Implements only those.

Does not reinterpret the page.

## Iteration rule

One screen/section at a time.

Example:

1. Hero screenshot.
2. Audit.
3. Implement.
4. Review.
5. Lock.

Then move to El Ritual.

## Never do this

“Improve the whole website.”

“Make it more premium.”

“Make it more editorial.”

“Add more polish.”

These prompts create generic AI output.

## Better prompts

“Review only the composition of this section. Keep content and interaction unchanged. Identify the 3 strongest AI-design tells and propose the smallest changes that remove them.”

“Implement only changes 1 and 2. Do not change typography, photography or spacing outside this component.”

## Locking

Once approved, add the section to `locked-decisions.md`.

Future passes must not touch it except:
- bugfix;
- responsive issue;
- accessibility;
- explicit user request.

## Technical validation after implementation

Use project commands:
- `tsc -p tsconfig.app.json`
- `pnpm lint`
- `pnpm build:prod`

Do not rely on `pnpm check` for typechecking if root config still has `files: []`.

## Git

Before large visual passes:
- inspect `git status`;
- preserve unrelated changes;
- create a checkpoint/commit when a major approved state is reached.

Do not let many unrelated visual passes accumulate uncommitted.
