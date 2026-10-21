---
layout: page.njk
title: Research
description: Undergraduate astrophysics research by Aaron Beaudoin. Hubble UV spectra of Type Ia supernovae, and PHP analysis software for the ALMA radio telescope's front-end test system.
eyebrow: Astrophysics
lede: "Before UX, I studied astronomy and astrophysics at the University of Illinois. These are two projects from that time: one on exploding stars, one on software I wrote to test ALMA's radio receivers."
---

<!--
  Edit this page freely. Text is plain Markdown.
  Figures use: {% raw %}{% figure "img/research/file.png", "Alt text", "Caption" %}{% endraw %}
-->

## Searching for Imprints of Circumstellar Material in the Ultraviolet Spectra of Type Ia Supernovae

<p class="byline">Aaron T. Beaudoin &amp; Ryan J. Foley (U. Illinois)</p>

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

### References

<ul class="references">
  <li>Patat et al., 2013, A&amp;A, 549, 62.</li>
  <li>Welty et al., 2014, ApJ, 792, 2.</li>
  <li>Goobar et al., 2014, ApJL, 784 12.</li>
  <li>Foley et al., 2014, MNRAS, 433, 2887.</li>
</ul>

## Modular Analysis Software for the ALMA Front End Test and Measurement System

### Introduction

The Atacama Large Millimeter/ Submillimeter Array (ALMA) is a radio interferometer that is located in the Atacama Desert in Chile (altitude ~16,400 ft.). It consists of 66 antennae, creating a synthesized aperture with a diameter of up to 16 km. There are 59 12-m antennae and seven 7-m antennae, each of which has a parabolic dish (cannot deviate from a perfect parabola by more than 20 microns), sub-reflector, and receiver.

{% figure "img/research/alma-overview.jpg",
  "Diagram of the ALMA signal path: a parabolic antenna's front end sends an analog signal to the back end, which digitizes it and sends it over up to 16 km of optical fiber from the 66 antennas to the correlator at the Array Operations Site, then to the Operations Support Facility.",
  "<strong>Figure 1</strong>" %}

**The Front End:** Each front end is a cryogenically cooled system that has 10 receiver bands that allow a frequency coverage from 31.3 GHz to 962 GHz. Each band, except bands 1 & 2, is cooled to 4 K and consists of an orthomode transducer (OMT) and either a pair of SIS mixers (bands 3-7) or a single SIS mixer (bands 8-10) that are fed by a 90° hybrid RF coupler and LO couplers. This structure can be seen in Figure 2. This system essentially takes a sky signal and 1) mixes it with a reference frequency generated by a local oscillator (LO), 2) lowers the signal to an intermediate frequency (IF), 3) splits it between its polarizations (using the OMT), then splits it again into an upper and lower sideband (using the SIS mixers), and 4) sends these signals to the back end.

{% figure "img/research/alma-front-end-diagram.png",
  "Two block diagrams of a front-end receiver cartridge, nested inside 80 K, 15 K and 4 K cooling stages. Left: cold optics feed an orthomode transducer, which splits to two 2SB SIS mixers, each followed by a 90° hybrid. Right: cold optics feed two LO injection optics blocks (band 9 only), each followed by a DSB SIS mixer.",
  "<strong>Figure 2</strong>" %}

**The Test System:** The test system compares system outputs to pre-determined specifications for minimal noise in the observations made by the receivers. This system tests noise temperature (noise added to the output from the receiver) and the IF output spectrum (checks for spikes in power over the IF window and the maximum power variation a specified IF range), along with other attributes in the Warm Cartridge Assembly (WCA).

**New Modular Library:** This library is written in PHP and is used to accept, analyze, and display test data from the Front Ends. This upgrade features a more structured interface that allows flexible database retrieval, universal data structures that allows for simple data manipulation, and an adaptable plotting algorithm.

{% figure "img/research/alma-plots-noise.png",
  "Two line plots produced by the analysis library: noise temperature against LO frequency, and corrected noise temperature against IF frequency with specification lines.",
  "(Left) The plot shows the LO frequency (GHz) vs. the corrected noise temperature for the receiver (red), for the cartridge (blue), and the difference (black). For optimization, the black needs to be as close to 0 as possible. (Right) The plot shows IF signal (GHz) vs. corrected noise temperature (K), for each sideband for each polarization, which must be below the 100% (black) and 80% (dotted) specification.",
  "light" %}

{% figure "img/research/alma-plots-if-power.png",
  "Two line plots produced by the analysis library: IF power against IF frequency for band 3, and power variation over a 31 MHz window with a specification line.",
  "(Left) The plot shows IF frequency (GHz) vs. power (dB) for band 3, and is looking for spikes and large variations between the desired IF window (4 – 8 GHz). Each LO frequency for the band is represented. (Right) The plot shows the power variation (dB) over a 31 MHz window at the center frequency of the window (GHz). Each LO frequency for the band is represented, along with the specification line at 1.35 dB.",
  "light" %}
