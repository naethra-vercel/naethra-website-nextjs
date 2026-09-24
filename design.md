# Putech About Design System

## Direction

- Pattern: Branded navigation + centered specialty statement + key services + team + light footer.
- Style: Minimalism and Swiss editorial design: spacious, functional, geometric, high contrast, and grid-based.
- Theme: Light-only. Do not introduce dark-mode surfaces or dark section backgrounds on the About page.
- Audience: Teams looking for an experienced technology partner for web, data, and cloud work.
- Platform: Responsive desktop web with keyboard and reduced-motion support.
- Conversion: Primary conversation CTA in the navigation and footer, with the same primary site navigation as the home page.

## Design Tokens

| Role | Value | CSS token |
| --- | --- | --- |
| Primary | `#2563EB` | `--about-primary` |
| Accent / CTA | `#EA580C` | `--about-accent` |
| Ink | `#1E293B` | `--about-ink` |
| Background | `#F8FAFC` | `--about-background` |
| Card | `#FFFFFF` | `--about-card` |
| Muted text | `#475569` | `--about-muted` |
| Border | `#E2E8F0` | `--about-border` |

## Typography

- Headings: Outfit, weights 500-700, tight editorial line-height.
- Body: Work Sans, weights 400-600, 1.55-1.8 line-height for readable copy.
- Navigation and metadata: uppercase, 0.12em tracking, compact text sizes.
- Keep long-form copy below roughly 65rem and preserve generous section spacing.

## Layout And Interaction

- Do not use a hero section on the About page; begin with the centered specialty statement.
- Center the specialty heading and supporting content within a readable max-width.
- Use light backgrounds for specialty, services, team, cards, and footer.
- Use simple section labels without numbered indexes.
- Keep service rows stable on hover; use color change only rather than layout-shifting padding.
- Use Lucide outline icons for service concepts and hide decorative icons from assistive technology.
- Keep visible focus rings, 44px minimum interactive targets, and clear hover states.
- Respect `prefers-reduced-motion`; remove scroll, hover, and reveal motion when requested.
- Validate at 375px, 768px, 1024px, and 1440px widths.

## Accessibility And Quality Bar

- Maintain at least 4.5:1 contrast for normal text and visible focus boundaries.
- Do not use emoji or text glyphs as structural icons.
- Preserve meaningful image alternative text and semantic landmarks.
- Avoid content overlap, hidden keyboard focus, and motion-dependent comprehension.
- Keep the primary CTA visually distinct with the existing home-page blue treatment and orange accent.

## Anti-Patterns

- Avoid purple-on-white defaults, dark About sections, dense card stacks, oversized marketing copy, and decorative gradients.
- Avoid replacing semantic controls with generic containers.
- Avoid hover transforms or spacing changes that shift neighboring content.
