---
layout: case-study.njk
title: Host galaxy morphology catalog
eyebrow: Research · Team project
description: "Group research project at the University of Illinois: cataloging 514 Type Ia supernova host galaxies and comparing composite spectra with MySQL and Python."
lede: "Does the kind of galaxy a supernova explodes in change how bright it gets? We sorted 514 host galaxies by shape and compared the supernovae inside them."
glance:
  - label: My role
    value: "One of 10 undergraduate and graduate students on a team project at the University of Illinois. We all shared the work of writing the code and building the database."
  - label: What we did
    value: "Pulled a large sample of Type Ia supernovae from public databases, classified each host galaxy's shape, and looked for links between galaxy type and how the supernovae behaved."
  - label: What we compared
    value: "Intrinsic brightness, how fast each supernova faded, and metallicity (how rich in heavy elements it was)."
stats:
  - { value: "10", label: "students on the team" }
  - { value: "514", label: "host galaxies cataloged" }
  - { value: "80", label: "of my commits in the project's code" }
meta:
  - label: Team
    value: "10 undergraduate and graduate students"
  - label: Tools
    value: "MySQL · Python"
  - label: Where
    value: "University of Illinois at Urbana-Champaign, Department of Astronomy"
links:
  - label: View the code (kaepora)
    url: https://github.com/msiebert1/kaepora
  - label: Read the 2019 paper
    url: https://arxiv.org/abs/1905.02204
next:
  title: Modular analysis software for ALMA
  url: /research/alma-test-software/
---

{% figure "img/research/ngc5643-hubble.jpg",
  "Hubble image of NGC 5643, a face-on spiral galaxy with a bright core, two main spiral arms laced with dark dust lanes, and pink star-forming regions.",
  "An example of a supernova host galaxy: the spiral galaxy NGC 5643, home of Type Ia supernova 2017cbv (after our project, so not in our sample). Image: <a href=\"https://esahubble.org/images/potw2039a/\">ESA/Hubble</a> &amp; NASA, A. Riess et al.; acknowledgement: Mahdi Zamani, <a href=\"https://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>." %}

## The question

Type Ia supernovae are used to measure distances across the universe, because they all reach about the same peak brightness. But "about the same" isn't exactly the same. We wanted to know whether the galaxy a supernova lives in helps explain the differences.

## What we did

I looked at a large sample of Type Ia supernovae taken from the supernova database at the Harvard-Smithsonian Center for Astrophysics, the UC Berkeley Filippenko Group's Supernova Database, and other sources. We looked for correlations between host galaxy morphology and intrinsic brightness, decline rates, and metallicities.

The project involved cataloging 514 host galaxy morphologies, then using MySQL and Python to compare composite spectra, built by combining spectra from nearby supernovae measured at maximum brightness.

## What it became

The database our team started became [kaepora](https://github.com/msiebert1/kaepora), an open-source database of Type Ia supernova spectra. Foley's group described it in a [2019 paper](https://arxiv.org/abs/1905.02204) (Siebert et al.), by which point it held 4,975 spectra of 777 supernovae. I'm one of 13 contributors to its code, with 80 commits.

The paper's composite spectra answered the question we started with: once you account for how fast each supernova fades, supernovae in early-type and late-type galaxies look much the same, with only small differences in their calcium features.
