---
layout: page.njk
title: Accessibility
description: Accessibility statement for Aaron Beaudoin's portfolio site.
---

I want everyone to be able to use this site, including people who use screen readers, keyboards, zoom, or other assistive tools.

## The standard

This site aims to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA. It was last tested on October 20, 2026, and passed every automated and scripted check listed below.

## What I've done

- Pages use headings in order and clear landmarks, with a "Skip to content" link at the top.
- Everything works with a keyboard, and the focus outline is always visible.
- Images have text descriptions. Charts and figures have written captions.
- Text and controls meet WCAG contrast levels. Status labels use words, not just color.
- Pages reflow at 200% zoom and on small screens, and follow your browser's text size.
- Nothing plays on its own. Animation turns off when your device's "reduce motion" setting is on.
- The site works with Windows high-contrast mode.

## How I tested it

- **Automated checks:** axe-core 4.10 (WCAG 2.0–2.2 A and AA rules plus best practices) on every page at 320, 375, 768, and 1280 pixels wide: no issues found. Lighthouse accessibility score: 100 on every page tested.
- **Keyboard:** tabbed through every page. "Skip to content" comes first, the order follows the page, and focus is always visible and never hidden behind other content.
- **Reflow and zoom:** no sideways scrolling at 320 pixels wide (the same as 400% zoom on a laptop) or at 200% zoom.
- **Text spacing:** pages stay readable with extra line, letter, and word spacing applied.
- **Contrast:** every text and background color pair checked against WCAG ratios. Text over the starfield photo was checked against the photo itself.
- **High contrast and reduced motion:** checked with Windows forced-colors mode and the reduce-motion setting turned on.
- **HTML:** checked with an HTML validator.
- **Screen reader:** read through with NVDA on Windows: headings, links, buttons, and image descriptions.

## Known issues

- Some case study images are detailed diagrams, like the competitive feature matrix and journey maps. Each one has a written description and an "Open full size" link, but the description summarizes the diagram rather than listing every cell.

## Tell me about a problem

If something on this site doesn't work for you, email me at <a href="mailto:{{ site.email }}">{{ site.email }}</a>. Tell me the page and what happened, and I'll fix it.
