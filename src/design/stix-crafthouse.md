---
layout: page.njk
title: STiX Crafthouse
description: Branding and social media for STiX Crafthouse, the hockey bar Aaron Beaudoin owned and operated in Olde Town Arvada, Colorado.
eyebrow: Brand & marketing work
lede: "Owner/operator · 2020–2024 · Logo, event flyers, and social media"
next:
  title: "Rinkside: find ice, run your team"
  url: /design/rinkside-b2c/
---

STiX Crafthouse was a sports bar I owned and operated in Olde Town Arvada, just outside Denver. We started planning it and formed the company in 2020, and opened the doors in 2022. Before we opened, I worked on all of it: contract and vendor negotiations, the renovation, marketing and the website, hiring, and the business plan. We built it as a home for Colorado Avalanche fans and anyone who loves hockey, with a rotating list of Colorado craft beers and food from our scratch kitchen.

As an owner, I ran our whole online presence. I designed the logo and every flyer and post we put out. I also ran our Facebook, Instagram, X, and Untappd accounts: making the content, posting on a regular schedule, and talking with the people who followed us.

{% figure "img/stix/stix-logo.png",
  "STiX Crafthouse logo: the word STiX in blue letters, with two hockey sticks forming the X, inside a maroon mountain outline, with CRAFTHOUSE in maroon underneath.",
  "The STiX Crafthouse logo.", "light" %}

## Event flyers

<ul class="figure-grid" role="list">
<li>{% figure "img/stix/anniversary-party.jpg",
  "Flyer for the STiX Anniversary Party, Saturday, September 9, 2023: STiX Olympics from 1 to 6 pm with bar games and cash prizes, UFC 293 prelims at 6 pm and main card at 8 pm, an after party from 11 pm to 2 am with a late-night happy hour, and food and drink specials all day. Breckenridge Brewery logo, beside a photo of a packed bar.",
  "Anniversary party, September 2023." %}</li>
<li>{% figure "img/stix/stix-olympics.jpg",
  "Flyer for the STiX Olympics, 1 to 6 pm: teams of 4 compete in bar games for cash prizes and a spot in the STiX hall of fame. Registration link in bio; $10 entry per person includes a free pint, glass of house wine, or well drink. Games: beer pong, flip cup, cornhole, pool, bubble hockey. Live DJ. Beside a photo of a pint of beer.",
  "STiX Olympics bar-games tournament." %}</li>
<li>{% figure "img/stix/halloween.png",
  "Flyer: Celebrate Halloween at STiX! Trick or Treat Street on Friday, with candy and a kids' costume contest. Pumpkin carving contest from Friday the 27th through Tuesday the 31st, with voting on Instagram. Halloween party all day Saturday the 28th, with a costume contest, Halloween cocktails, and bar games. Beside a photo of glowing jack-o'-lanterns.",
  "Halloween weekend events." %}</li>
</ul>

## The website

I built the bar's website myself on one.com, a drag-and-drop site builder. The layout, the photos, and the words were all mine. Looking at it now as a UX designer, I'd change a lot.

<ul class="compare" role="list">
<li>{% figure "img/stix/website-home-phone.jpg",
  "The STiX Crafthouse homepage on a phone: the logo, a dark red mountain outline with STiX in blue, sits on a faded photo of a packed hockey arena. Below it, the headline Welcome all Hockey Freaks and Beer Geeks in dark red over the same photo, then the opening hours.",
  "<strong>The homepage on a phone.</strong> Saved by the Internet Archive, October 2022.", "phone" %}</li>
<li>{% figure "img/stix/website-signup-phone.jpg",
  "A text-message sign-up box on the same site: Stay Connected! Sign-up to Receive Exclusive Text Promotions, a phone number field, a checkbox, and a light gray Sign Up button, with fine print from the texting service.",
  "<strong>The text sign-up.</strong> The texting service's stock form.", "phone" %}</li>
</ul>

### What I'd change

- **Let the logo stand on its own.** It sits on a busy arena photo, and the dark red mountain blends into the crowd. WCAG doesn't hold logos to a contrast ratio, but that doesn't make it easy to see. I'd put it on a plain background and move the photo down the page.
- **Put the headline on something solid.** Against the photo it measures about 4 to 1. That passes for text this large, which needs 3 to 1, but the photo changes behind every letter, so it only just works.
- **Proofread.** "11:PM" and "two hour after any Avalanche game" both went live.
- **Make the sign-up form fit the brand.** I used the texting service's stock form. Its gray Sign Up button looks switched off before you've typed anything.
- **Use the room on a laptop.** On a wide screen, the page stays a narrow column, and the menu hides behind a menu button.

## A restaurant owner's journey with POS and payments

**v1: my own experience only. Interviewing two more owners next.**

I ran STiX on Toast for about two years, from picking a POS in spring 2022 to closing in March 2024. This map follows that whole stretch from my side as the owner: setting it up, running game nights, getting paid, borrowing money, and closing down. Staff show up where they were part of it.

**How I made it.** This map is built from memory. I don't have the old statements or the contract anymore, and when the Toast account closed I lost access to it. I checked the facts about Toast features and Colorado's surcharge law against Toast's support docs and the state statute. Every box says where it came from: "Stated by Aaron," or a public source. Made in FigJam, November 2026.

{% figure "img/stix/owner-journey-map.png",
  "Journey map of a restaurant owner's experience with POS and payments at STiX Crafthouse, from picking a POS in spring 2022 to closing in March 2024, in 12 stages. Rows for goals, actions, touchpoints, feelings, an emotion curve, pain points, what worked, opportunities and evidence. The low point is the St. Patrick's Day 2023 internet outage. The full text is in the section below the picture.",
  "<strong>The owner's journey, v1.</strong> 12 stages, from picking a POS to closing.",
  "light" %}

{% from "blueprint.njk" import blueprint %}{{ blueprint(stixJourney, "Read the map as text", 3) }}

### What it says so far

This is one owner's account, so these are things to test, not findings yet.

1. **The product won the sale, but the money side caused the pain.** Toast's screens and search beat Aloha for my staff. Fees, deductions and cash timing are what hurt me as the owner.
2. **The costs showed up after signing.** Payroll fees were the first surprise. Card fees, monthly fees and loan repayments all came out of one deposit, so I saw what landed in the bank, not why.
3. **Busy nights are where it breaks.** Game nights meant 100+ tabs closing at once. One internet outage on St. Patrick's Day cost us about $5,000. We set the system up ourselves, and offline setup never came up.
4. **Easy money, no way out.** The loan took days to get. When we closed, there was no wind-down path, and my records went dark.

### The top pain points

<div class="side-figure">
<div class="side-figure__fig">
{% figure "img/stix/owner-journey-closeup.jpg",
  "Close-up of three stages: getting paid, payroll and taxes, and the St. Patrick's Day outage, with the feeling scores dropping to 2, 3 and 1.",
  "<strong>Close-up:</strong> getting paid, payroll, and the outage.", "light" %}
</div>
<div class="side-figure__text">

1. **St. Patrick's Day 2023.** Comcast took the internet down. Our devices couldn't see each other's tabs and some tickets got lost. About $5,000 gone on the busiest day of the year.
2. **Deductions from deposits.** Fees, monthly charges and loan repayments came out of the money we needed for payroll and bills. It left us short exactly when we needed cash most.
3. **Game nights.** 100+ tabs all needing to close at once when the game ended.

</div>
</div>

The outage is the only one I can put a dollar figure on. The cash crunch probably cost more over those two years, but I can't prove it without the statements.

### What I'd fix first: a payout breakdown before every deposit

Show sales, card fees, monthly fees, loan holdback and anything else, then the amount that actually hits the bank, with a warning before any deduction that isn't routine. I never knew why a deposit was short until it already was.

### What's next

1. Ask Toast for my old statements and the Toast Capital loan records.
2. Interview two more owners: my in-laws, who run a restaurant in rural Colorado, and one more, ideally on a different POS. I want to know whether my pain points hold up outside a suburban sports bar. Do they understand their deposits and fees? What happens on their busiest nights and during outages? Have they borrowed through their POS company, looked at switching, or thought about how they'd ever leave?
3. Compare all three and update this map, marking what holds across owners and what was just STiX.
