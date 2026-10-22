---
layout: case-study.njk
title: Searching for Imprints of Circumstellar Material in the Ultraviolet Spectra of Type Ia Supernovae
eyebrow: Research · Astrophysics
description: "Undergraduate research by Aaron Beaudoin: measuring absorption lines in Hubble Space Telescope ultraviolet spectra of 8 Type Ia supernovae."
lede: "Do exploding white dwarfs leave gas behind from a companion star? I measured Hubble ultraviolet spectra of 8 supernovae to find out."
glance:
  - label: My role
    value: "My own project, with guidance from Professor Ryan Foley, as a research assistant at the University of Illinois."
  - label: What I did
    value: "Wrote Python scripts to measure absorption lines in 46 Hubble Space Telescope ultraviolet spectra, then checked whether any of them changed over time."
  - label: The result
    value: "None of the lines changed, which put new limits on the kind of star systems these supernovae come from. I presented it as a poster at the American Astronomical Society meeting in 2014."
stats:
  - { value: "8", label: "Type Ia supernovae" }
  - { value: "46", label: "Hubble ultraviolet spectra" }
  - { value: "3", label: "elements tracked: Mg I, Mg II, Fe II" }
hero: img/research/aas-2014-poster.jpg
heroAlt: "Aaron presenting his supernova research poster to a visitor at the 2014 American Astronomical Society meeting. The poster shows the SN 2011fe spectrum and the line-strength plots."
meta:
  - label: Byline
    value: "Aaron T. Beaudoin &amp; Ryan J. Foley (U. Illinois)"
  - label: Tools
    value: "Python"
  - label: Where
    value: "University of Illinois at Urbana-Champaign, Department of Astronomy"
next:
  title: Host galaxy morphology catalog
  url: /research/host-galaxy-morphology/
---

<p class="card__meta">The write-up below is from the poster.</p>


Type Ia supernovae (SNe Ia) are thermonuclear explosions that have high and relatively standard peak luminosities. It is accepted that SNe Ia originate in white dwarf (WD) binary systems, however, the companion star is still unclear. Two possible progenitor models are the single- (SD) and double-degenerate (DD) scenarios, where the companion in the DD scenario is another WD, while the companion in the SD scenario is a more normal star such as a red giant.

Here, we test these models by searching for indications of circumstellar material (CSM) in *Hubble Space Telescope* UV spectra of 8 SNe Ia. Imprinted on these UV spectra are narrow absorption lines from ISM and/or CSM. If these features vary in strength over time, the material is likely CSM, ionizing and recombining after the SN explosion. Such material is most easily explained in a SD progenitor system. Using a total of 46 spectra from 8 SNe Ia, we do not detect any variability in Mg I, Mg II, and Fe II lines, placing new, strong constraints on the progenitor systems of these SNe Ia.

{% figure "img/research/sn2011fe-spectrum.jpg",
  "Two-panel plot of the ultraviolet spectrum of SN 2011fe from about 2300 to 2900 ångströms. Narrow absorption lines from Fe II, Mg II and Mg I are marked.",
  "<strong>Fig. 1:</strong> (<em>Top</em>) Maximum-brightness spectrum of SN 2011fe. The blue curve is a 3rd-order interpolated fit to the data including Gaussian profiles for the Fe II λλ 2344, 2374, 2383, 2587, 2600; Mg II λλ2796, 2803; and Mg I λ2853 absorption features. (<em>Bottom</em>) Normalized maximum-brightness spectrum of SN 2011fe. The inset is a zoom-in showing the region near the Mg I and Mg II features.",
  "light" %}

We detect the Mg II λ2800 doublet and Mg I λ2853 in all spectra, although SNe 1992A, 2011ek, and 2011iv only show absorption from the Milky Way. We also detect Fe II in some observations from each SN. Measuring the EW of each feature at each epoch, we look for any variability. In our best measurements to date, we do not detect any significant change in any of the absorption features, consistent with studies of optical features for SN 2011fe (Patat et al., 2013) and SN 2014J (Welty et al., 2014; Goobar et al., 2014, Foley et al., 2014). We therefore do not detect a large amount of CSM along our line of sight.

{% figure "img/research/ew-deviations.jpg",
  "Three stacked plots of change in equivalent width against days from maximum brightness, for Mg II 2796, Mg II 2803 and Mg I 2853, across six supernovae. The points stay close to zero.",
  "<strong>Fig. 2:</strong> Deviations in the EW from the average measurement of the Mg II doublet and Mg I, respectively. We do not detect any absorption at the redshift of the host galaxy for the three SNe not listed. When a feature is not detected, we plot the 3-σ upper limit as a downward arrow. The measurements are all consistent with zero variability.",
  "light" %}

## References

<ul class="references">
  <li>Patat et al., 2013, A&amp;A, 549, 62.</li>
  <li>Welty et al., 2014, ApJ, 792, 2.</li>
  <li>Goobar et al., 2014, ApJL, 784 12.</li>
  <li>Foley et al., 2014, MNRAS, 433, 2887.</li>
</ul>
