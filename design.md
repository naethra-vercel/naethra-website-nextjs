# Putech About Design System

## Direction

- Pattern: Branded navigation + centered specialty statement + key services + team + light footer.
- Style: Minimalism and Swiss editorial design: spacious, functional, geometric, high contrast, and grid-based.
- Theme: Light-only. Do not introduce dark-mode surfaces or dark section backgrounds on the About page.
- Audience: Teams looking for an experienced technology partner for web, data, and cloud work.
- Platform: Responsive desktop web with keyboard and reduced-motion support.
- Conversion: Primary conversation CTA in the navigation and footer, with the same primary site navigation as the home page.

## Design Tokens

| Role         | Value     | CSS token            |
| ------------ | --------- | -------------------- |
| Primary      | `#2563EB` | `--about-primary`    |
| Accent / CTA | `#EA580C` | `--about-accent`     |
| Ink          | `#1E293B` | `--about-ink`        |
| Background   | `#F8FAFC` | `--about-background` |
| Card         | `#FFFFFF` | `--about-card`       |
| Muted text   | `#475569` | `--about-muted`      |
| Border       | `#E2E8F0` | `--about-border`     |

## Typography

- Live pairing: Syne for display type and DM Sans for readable body copy.
- Headings use tight editorial line-height and the selected display family.
- Navigation and metadata use IBM Plex Mono, uppercase, `.08em-.12em` tracking, and compact text sizes.
- Keep long-form copy below roughly 65rem and preserve generous section spacing.

### Font Pairings

1. **Bold Graphic: Syne + DM Sans**
	Syne's irregular, art-directed forms make headlines feel authored and poster-like; DM Sans keeps service copy immediate and calm.
	```css
	@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap");
	```

2. **Luxury Editorial: Cormorant Garamond + Space Grotesk**
	Cormorant Garamond adds fashion-editorial drama and italic contrast, while Space Grotesk gives labels and interfaces a precise geometric counterpoint.
	```css
	@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,500;1,600&family=Space+Grotesk:wght@400;500;600;700&display=swap");
	```

3. **Futuristic / Tech-Creative: IBM Plex Mono + Manrope**
	IBM Plex Mono turns metadata and hero fragments into technical artifacts; Manrope supplies a smooth, contemporary reading voice for longer content.
	```css
	@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Manrope:wght@400;500;600;700;800&display=swap");
	```

## Site-Wide Brand Rules

- Use `Syne` for expressive headings, `DM Sans` for body copy, and `IBM Plex Mono` for labels and metadata.
- Use the logo blue `#005B96` (`--blue`) as the primary theme color for buttons, links, focus states, and page accents. Do not introduce a new amber or purple CTA color on shared content, legal, or contact pages.
- Keep the existing homepage button shape, spacing, hover behavior, and theme tokens. Page-specific backgrounds may change, but shared buttons must remain visually consistent.
- Mobile page sections may use the source page's navy and violet bands, but interactive accents and CTA buttons remain logo blue.

## Mobile Page Content Rules

- Preserve the source page sequence: service hero, service introduction, Strong Track Record, Mobile App technology cluster, technology and quality sections, Large Skill Pool, Blogs, and Contact/Demo.
- Prefer the supplied source wording and technology references over generic replacement marketing copy.
- Use responsive, readable text blocks and preserve the timeline and technology-cluster relationships on small screens.

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
