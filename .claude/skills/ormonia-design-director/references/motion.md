# ORMONIA · Motion

## Principle

Motion should communicate:
- continuity;
- state change;
- product transition;
- atmosphere.

It should not exist to prove the site is interactive.

## Allowed / preferred

- subtle crossfade;
- restrained product hover;
- existing El Ciclo choreography;
- slow autonomous video where approved;
- small entrance transitions when they add orientation.

## Avoid

- snap scrolling;
- excessive pinning;
- automatic carousels everywhere;
- continuous parallax;
- floating decorative elements;
- overshoot/bounce;
- dramatic zoom transitions;
- blur as a default transition;
- every heading fading in;
- every image scaling on scroll.

## Hero

If multiple images:
- slow;
- no visible carousel UI;
- no changing copy;
- no aggressive scale.

Reduced motion:
static.

## El Ciclo

Existing interaction is important.

Preserve:
- continuous scrub;
- no artificial pauses;
- no snap;
- synced phase indicator;
- lifecycle cleanup.

The section previously had a GSAP unmount bug.

Do not regress cleanup behavior.

Never use global:
`ScrollTrigger.killAll()`

## Videos

Autoplay content:
- muted;
- playsInline;
- no visible controls when used as ambient media;
- never tie playback position directly to scroll unless explicitly designed that way.

## Reduced motion

Respect `prefers-reduced-motion`.

Do not make the reduced-motion experience feel broken.
