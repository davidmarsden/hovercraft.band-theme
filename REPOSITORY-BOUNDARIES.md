# Repository Boundaries

This repository is the **presentation and theme layer for hovercraft.band**.

It controls how published content is rendered in Micro.blog/Hugo.

## What belongs here

- Hugo/Micro.blog layouts;
- CSS;
- JavaScript;
- reusable components;
- album/player presentation;
- navigation and page chrome;
- responsive behaviour;
- visual design system;
- theme-specific documentation;
- `plugin.json` and related theme configuration.

This repository represents **how hovercraft.band looks and behaves**.

## What does not belong here

- canonical lyrics;
- release metadata;
- album provenance;
- historical research;
- private correspondence;
- rights decisions;
- booklet or press drafts;
- song analysis;
- source-of-truth release documentation.

## Relationship to the other repositories

### davidmarsden/hovercraft-release-2026
Private documentary and release-control source of truth.

It answers:
**What do we know, what did we decide, and why?**

### davidmarsden/hovercraft.band
Public content/data repository.

It answers:
**What are we publishing?**

This theme repository then answers:
**How should that published material be rendered?**

## Working flow

```
hovercraft-release-2026
        ↓ review / approve
hovercraft.band
        ↓ rendered by
hovercraft.band-theme
        ↓
hovercraft.band
```

## Rule of thumb

**hovercraft-release-2026 = what we know and why**  
**hovercraft.band = what we publish**  
**hovercraft.band-theme = how it looks and behaves**

Avoid duplicating canonical content here unless a theme fixture/example genuinely requires it.
