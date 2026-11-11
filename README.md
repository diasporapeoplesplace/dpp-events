# DPP Events Guide

Listings and flyers for the events gallery at [diasporapeoplesplace.org/events](https://diasporapeoplesplace.org/events).

- `events.json` holds every listing. Past events hide themselves on the site automatically.
- `flyers/` holds the flyer images, named `YYYY-MM-DD_short-name.jpg`.
- `embed-code.html` is the small loader pasted once into the Squarespace Code Block on the Events page.
- `embed.js` is the page itself (spotlight carousel, filters, one-time and recurring sections, details popup). Changes here go live on push, with no re-paste.

The site is served by GitHub Pages at https://diasporapeoplesplace.github.io/dpp-events/.

## Listing fields

| Field | Example | Notes |
|---|---|---|
| `name` | `"Diaspora Fall Market"` | |
| `date` | `"2026-10-24"` | First day |
| `until` | `"2026-10-25"` | Optional, for multi-day events |
| `start` / `end` | `"12:00 PM"` / `"4:00 PM"` | Leave `start` empty if the flyer gives no time |
| `venue`, `area` | `"Holy Ground"`, `"Los Angeles"` | Use "Contact organizer for location" when unknown |
| `community`, `type` | `"Palestinian"`, `"Market & pop-up"` | Comma-separated; these build the filters |
| `price`, `note` | `"Free"`, `"RSVP required"` | Optional |
| `desc` | | Details from the flyer only |
| `host`, `instagram` | `"Palm Collective"`, `"palmcollective.la"` | Handle without the @ |
| `link` | | Tickets or RSVP page, optional |
| `flyer` | `"2026-10-24_palm-fall-market.jpg"` | File name in `flyers/` |
| `recurring` | `"Every Sunday"` | Optional. Marks a repeating or ongoing listing; it moves to the Recurring section with this label |
| `spotlight` | `true` or `1` | Optional. Puts the event in the top carousel (up to 5 shown). A number sets its slot (1 shows first); `true` events follow by date. Use for bigger social justice gatherings |
