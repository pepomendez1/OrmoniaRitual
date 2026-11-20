# ORMONIA · Responsive & Accessibility

## Responsive is art direction

Mobile is not simply desktop stacked vertically.

Check:
- photography crop;
- headline wrapping;
- product scale;
- nav hierarchy;
- card peek;
- touch interactions;
- fixed controls;
- section density.

## Breakpoints to inspect

At minimum:
- ~1440 desktop
- ~1280 laptop
- ~768 tablet
- ~390 mobile

## Product rail

Mobile:
- one card dominant;
- peek of next card;
- swipe;
- no hover dependency.

## Photography

Provide per-image object position.

Do not crop:
- face;
- product label;
- hands;
without intent.

## Navigation

Desktop:
clean split navigation around wordmark where space allows.

Mobile:
use menu.

Do not squeeze every item horizontally.

## Accessibility

Use:
- real buttons;
- real links;
- labels;
- aria where needed;
- keyboard navigation;
- visible focus;
- Escape to close overlays;
- focus trapping for drawers/menus;
- correct alt behavior.

Decorative photography:
`alt=""`

Informative product photography:
short factual alt.

## Forms

Inputs must have:
- label or accessible name;
- error state;
- focus state;
- disabled state where needed.

## Contrast

Do not solve contrast with massive overlays by default.

But readability wins over “pure photography”.

## Motion

Respect reduced motion.

## Touch

Do not hide essential actions behind hover.
