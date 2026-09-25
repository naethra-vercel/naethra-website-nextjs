# Premium Services Scroll Animation Prompt

Redesign the existing Services section into a premium Awwwards-style scroll-driven editorial experience.

## Important Constraints

- Do not use cards.
- Do not create separate visible service cards.
- Do not use a normal horizontal carousel.
- Keep the Services composition visually fixed while the user scrolls.
- Only the service content on the right should transition between services.
- Keep the left-side editorial heading fixed.

## Core Interaction

Create a tall scroll section using a sticky viewport. The section height must scale dynamically with the number of services.

```css
.services-section {
  height: calc(var(--service-count) * 100vh);
}

.services-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
}
```

The viewport composition remains fixed while scrolling. Only the right-side service content changes:

- Service number or progress state
- Service title
- Service description
- Optional service metadata or icon

The component must support any number of services dynamically. Do not hardcode the animation for four items.

## Layout

Use a two-column editorial layout:

```text
WHAT WE DO                  SERVICE CONTENT

Technology that             Large service title
works for the way           Description and metadata
you work.

                            01 / 09
```

The left side contains:

- `What we do`
- `Technology that works for the way you work.`
- Generous whitespace
- A fixed or sticky editorial position

The right side contains one fixed content viewport. Do not render the services as visible cards or stacked panels.

Use large typography and a clean premium background. The service content should occupy most of the viewport.

## Scroll Behavior

Use normalized scroll progress based on the Services section:

```ts
const normalizedProgress = Math.min(
  1,
  Math.max(0, sectionProgress),
);

const serviceProgress = normalizedProgress * (services.length - 1);
```

For each service transition:

```text
Outgoing service moves upward and fades out.
Incoming service enters from below and fades in.
```

The transition must be continuous and directly controlled by scroll progress. Do not abruptly replace the content.

## Animation Model

For each service layer, calculate its offset from the current scroll progress:

```ts
const offset = serviceIndex - serviceProgress;
const distance = Math.abs(offset);
const opacity = Math.max(0, 1 - distance);
```

Use transform-based animation:

```text
Outgoing content:
translateY: 0 -> -100%
opacity: 1 -> 0

Incoming content:
translateY: 100% -> 0
opacity: 0 -> 1
```

Use different movement speeds to create subtle layered depth:

- Service number or icon: fastest
- Service title: medium
- Service description: slightly slower
- Service link or metadata: slowest

Recommended easing:

```css
cubic-bezier(0.22, 1, 0.36, 1)
```

Use GPU-friendly `transform` and `opacity`. Avoid layout thrashing and excessive bounce effects. Subtle scale or blur may be used sparingly.

## Typography

Use the existing project font system or a premium modern font such as:

- Inter
- Geist
- Manrope
- Satoshi

Typography hierarchy:

- Service title: very large, bold, editorial, and highly legible
- Description: significantly smaller with comfortable line-height
- Service number or progress state: small but visually important
- Supporting metadata: restrained and uppercase when appropriate

## Brand Color

Use the existing brand color:

```text
#005B96
```

Use it primarily for:

- Service number
- Small accents
- Progress indicator
- Hover states
- Active navigation elements
- Subtle glow or emphasis

Do not make the entire section blue. Keep the main background clean and premium.

## Progress Indicator

Add a small fixed progress indicator inside the right-side composition:

```text
01 / 09
```

The total must be generated dynamically from the service data. Update the active service smoothly according to scroll progress.

Optionally include small vertical progress bars:

```text
01
02
03
04
```

The active indicator uses `#005B96`.

## Reusable Service Data

Keep service content in a reusable data structure:

```ts
const services = [
  {
    title: "Web Development",
    description:
      "We build high-performance digital experiences for modern businesses.",
    href: "/web-app",
  },
  {
    title: "Mobile App Development",
    description:
      "We create modern Flutter applications for connected users.",
    href: "/mobile-app",
  },
  {
    title: "UI/UX Design",
    description:
      "We design intuitive and engaging digital products.",
    href: "/contact-us",
  },
  {
    title: "Cloud & DevOps",
    description:
      "We build scalable and reliable cloud infrastructure.",
    href: "/services/aws-cloud-support",
  },
];
```

The animation must work automatically when services are added or removed.

## Accessibility and Mobile

- Respect `@media (prefers-reduced-motion: reduce)`.
- Reduced motion should use a simple fade or short vertical transition.
- Keep the section sticky on mobile where practical.
- Preserve vertical service transitions on mobile.
- Reduce typography size and animation distance on small screens.
- Do not introduce horizontal scrolling.
- Keep service links keyboard accessible.
- Do not hide the only accessible service content from screen readers.

## Final Visual Direction

The result should feel like one continuous editorial Services story controlled entirely by scrolling.

It should feel:

- Cinematic
- Minimal
- Premium
- Editorial
- Intentional
- Brand-led

It must not feel like:

- Four cards stacked on top of each other
- A generic AI-generated template
- A standard carousel
- A crowded dashboard
- A flashy animation demo
