# AI Disclosure – Background Image Labeling for EU AI Act Compliance

A lightweight, dependency-free solution to label AI-generated background images on websites — compliant with Article 50 of the EU AI Act.

![Example image for the volatile badge](Title-pictureEN_for_readme-md.jpg "Example image for the volatile badge")

## The Problem

The EU AI Act (Art. 50, in force since August 2, 2026) requires businesses to clearly label AI-generated images that could be mistaken for real ones. A simple caption below an image is sufficient — but background images don't have captions. They're injected via CSS, invisible to the casual visitor, and any label badge placed on top is likely covered by page content.

This creates a compliance gap that is easy to overlook and potentially actionable.

## The Solution

Three files. No dependencies. No CMS changes. No database migrations.

A small, fixed-position disclosure button appears on first visit when a page has an AI-generated background image. The visitor can dismiss it — it won't reappear during the same session, but returns on page reload.

**The key insight:** The decision of whether a background image is AI-generated belongs with the person who created it. Rather than adding CMS fields or editorial checklists, the image filename carries that information:

```
hero-AI-generated.jpg
background-landscape-AI-generated.webp
```

The script reads the CSS `background-image` URL and checks for the presence of both `ai` and `generated` in the filename. If both are found, the disclosure button is shown. No match — no button. Separator, order, and capitalization are irrelevant.

Multilingual support is built in (DE / EN / FR): the button label is automatically rendered in the visitor's browser language.

## How It Works

```javascript
var bg = window.getComputedStyle(document.body).backgroundImage.toLowerCase();
if (!bg || !bg.includes("ai") || !bg.includes("generated")) return;
```

Session handling via `sessionStorage`: key set → button hidden. Page reload → key cleared → button reappears. Navigation within the session → button stays hidden (user has already been informed).

Multilingual out of the box (DE / EN / FR), detected via browser language.

## Integration

Two lines in your HTML:

```html
<link rel="stylesheet" href="disclosure.css" />
<script src="disclosure.js"></script>
```

Works in any static site, CMS, or template — as long as background images are set on `body` via CSS.

## Files

| File             | Purpose                                         |
| ---------------- | ----------------------------------------------- |
| `disclosure.js`  | Core logic: detection, language, sessionStorage |
| `disclosure.css` | Styling: fixed position, blur, transition       |
| `test.html`      | Demo page with AI-generated background          |

## Limitations

- Only detects background images set on `body` via CSS
- Relies on filename convention — renaming the file breaks the detection (silently, no warning)
- No automated detection of AI-generated content; that remains a human decision by design

## Legal Note

> **IANAL.** This solution is designed with Art. 50 in conjunction with Art. 3 No. 60 EU AI Act in mind, but this is not legal advice. Consult a qualified attorney for specific compliance questions.

## Who Is Affected?

- Businesses and anyone using AI commercially
- Private individuals without a commercial context are explicitly exempt
- Labeling applies to photorealistic AI-generated images; clearly artificial illustrations are exempt

## License

MIT
