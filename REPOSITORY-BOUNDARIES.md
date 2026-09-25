# Repository Boundaries

This repository is the **presentation and Micro.blog/Hugo publishing layer for hovercraft.band**.

It controls how published content is rendered and may contain small, generated publication manifests that Hugo needs at build time.

## What belongs here

- Hugo/Micro.blog layouts;
- CSS and JavaScript;
- reusable components;
- album/player presentation;
- navigation, responsive behaviour and visual design;
- theme-specific documentation and configuration;
- **generated, publication-safe Hugo data** required by the theme, such as `data/songbook.json`.

A generated publication manifest is an output of editorial review, not a new source of truth. It should contain only material approved for the public site and should be reproducible from the private release repository.

## What does not belong here

- canonical lyrics;
- canonical release metadata;
- working album provenance or historical research;
- private correspondence;
- unresolved rights or credit decisions;
- booklet or press drafts;
- full working song analysis;
- source-of-truth release documentation.

## Relationship to the other repositories

### davidmarsden/hovercraft-release-2026
Private documentary and release-control source of truth.

It answers: **What do we know, what did we decide, and why?**

Approved material can be harvested from here into a deliberately smaller public manifest used by the theme.

### Micro.blog / hovercraft.band
The live publishing system and canonical home of public Pages, posts, lyrics, uploads and site content.

It answers: **What is actually published?**

### davidmarsden/hovercraft.band
An **automated backup of the live Micro.blog site**. It is downstream output, not a publishing input and not a repository to maintain manually.

### davidmarsden/hovercraft.band-theme
The GitHub-managed presentation layer and home of generated build-time manifests consumed by Micro.blog/Hugo.

It answers: **How should the published material be rendered, and what approved structured data does Hugo need to render it?**

## Working flow

```
hovercraft-release-2026
        ↓ review / approve / harvest
hovercraft.band-theme
  layouts + generated publication manifests
        ↓ Micro.blog/Hugo build
hovercraft.band (live Micro.blog site)
        ↓ automatic backup
davidmarsden/hovercraft.band
```

## Rule of thumb

**hovercraft-release-2026 = what we know and why**  
**Micro.blog = public content and uploads**  
**hovercraft.band-theme = presentation + generated public build data**  
**davidmarsden/hovercraft.band = downstream backup**

Never hand-maintain publishing inputs in the backup repository. Never promote unresolved/private release material into a public manifest.
