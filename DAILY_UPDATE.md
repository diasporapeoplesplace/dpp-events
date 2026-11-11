# Daily calendar update: how to run it

This is the routine for keeping diasporapeoplesplace.org/events current. The site reads `events.json` and the images in `flyers/`. A push to `main` deploys through GitHub Pages; check it with `gh run list -L 1`.

## 1. New flyers from Google Drive

The flyer folders live in the shared Drive folder "Community Events" (id `1ETNtpW7r0Rg-A7WPqkDxo-U-7IsTGjkf`):

- November Events: `1Gd7JHcFpjxMbeWyxM3ifIpc9dNbFtkwp`
- December Events: `1BFjcgUoxf-1SUmEcssABx93fQ69rz5Vk`
- General/Recurring Events: `1YcrNmuv-8z-KUYENeaWofGAidHtXZtvj`
- DPP Events Inbox (flyers for the calendar): `18ROclbAO83wC8vwx9wAtxJvATzttz35P`
- IG post (`1qRM-ChZLkb1GmTkfcPC_EBgMNwlBUDGQ`): flyers picked for that week's Instagram carousel, mixed with DPP's own slides. Add only event flyers that aren't on the site yet.
- Any newer month folder (January Events, etc.) inside Community Events

Search those folders for images created in the last 2 days, plus anything not yet on the site. Download each one with the Drive connector, look at it, and take every detail from the flyer itself.

Skip any event that is already in `events.json` (same date and same event, even if the name is worded differently). Skip working docs and DPP's own carousel slides (cover, mid and end slides).

## 2. Our own sourcing

Spend a few searches looking for new public events in Greater LA from organizers already on the calendar (the `host` values in `events.json`) and from similar groups. Look at their websites, Eventbrite, Partiful, Luma and venue calendars. Instagram usually blocks automated reading.

Only add an event you actually saw on a page you opened. Never guess a date.

## 3. Sourcing rules (the founder's)

- An event belongs when it relates to creativity, advocacy or liberation in Greater LA, across a wide range of BIPOC and diaspora communities. The calendar should not become a Muslim or Arab echo chamber.
- Exclude anything that promotes Zionism or its allies. Screen hosts, sponsors, venues and co-presenters.
- Exclude Wahhabism and Saudi-backed initiatives.
- Exclude events centered on alcohol.
- Exclude events where queerness is the main focus.

## 4. Listing format

- Match the existing schema: `name`, `date` (YYYY-MM-DD), `until` (optional), `start`, `end`, `venue`, `area`, `community`, `type`, `price`, `desc`, `host`, `instagram` (no @), `link`, `flyer`. Reuse the existing vocabulary for area, community and type.
- Always go with what the flyer says. If there's no location, set venue to "Contact organizer for location". Keep every eligible event.
- Write `desc` as 1 or 2 warm, plain sentences. No em dashes. Never use "we don't X, we Y" phrasing, and never use the words "queer" or "gay".
- Flyer file names start with the event date: `YYYY-MM-DD_short-slug.jpg`. Save as JPG, max 1600px on the long side, quality around 88.

## 5. Clean every flyer image

- Crop away black or white padding bars.
- Crop away screenshot elements: phone status bars, Instagram profile icons and avatars, carousel arrows and dots, like and comment bars, captions and app chrome.
- Look at the result before saving, and keep the whole flyer.
- Re-check all upcoming flyers already in `flyers/` too, and fix any that still show these elements.

## 6. Ship it

- Confirm `events.json` loads as valid JSON.
- Commit with a short message.
- Push to `main` and confirm the deploy started.
- Report what was added, skipped and cropped, and anything unclear on a flyer.
