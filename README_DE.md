# AI Disclosure – Hintergrundbilder gemäß EU AI Act kennzeichnen

Eine schlanke, abhängigkeitsfreie Lösung zur Kennzeichnung KI-generierter Hintergrundbilder auf Webseiten — konform mit Artikel 50 des EU AI Act.

![Beispielblid KI-generated mit Button  ](Title-picture_for_readme-md.jpg "Beispielblid KI-generated mit Button  ")

## Das Problem

Der EU AI Act (Art. 50, gültig ab 2. August 2026) verpflichtet Unternehmen, KI-generierte Bilder, die als echt erscheinen könnten, klar zu kennzeichnen. Eine einfache Bildunterschrift genügt — aber Hintergrundbilder haben keine Bildunterschrift. Sie werden per CSS eingebunden, sind für normale Besucher unsichtbar, und ein aufgeklebter Badge wird höchstwahrscheinlich vom Seiteninhalt verdeckt.

Das ergibt eine Compliance-Lücke, die leicht übersehen wird und abmahngefährdet ist.

## Die Lösung

Drei Dateien. Keine Dependencies. Kein CMS-Eingriff. Keine Datenbankmigrationen.

Beim ersten Besuch einer Seite mit KI-generiertem Hintergrundbild erscheint ein kleiner, fixed positionierter Hinweis-Button. Der Nutzende kann ihn wegklicken — er erscheint in der gleichen Session nicht erneut, kommt aber beim Reload zurück.

**Die elegante Idee:** Die Entscheidung, ob ein Hintergrundbild KI-generiert ist, liegt bei der Person, die es erstellt hat. Statt CMS-Felder oder redaktionelle Checklisten einzuführen, trägt **der Dateiname** diese Information:

```
hero-AI-generated.jpg
background-landscape-AI-generated.webp
```

Das Script liest die CSS `background-image`-URL des Body und prüft, ob beide Begriffe `ai` und `generated` im Dateinamen enthalten sind. Treffer → Button wird angezeigt. Kein Treffer → kein Button. Trennzeichen, Reihenfolge und Groß-/Kleinschreibung spielen keine Rolle.

Implementiert wurde direkt Mehrsprachigkeit (DE / EN / FR) des Buttons: Vom Browser automatisch gesteuert wird ein Text in der Sprache des Clients ausgerollt

## Funktionsweise

```javascript
var bg = window.getComputedStyle(document.body).backgroundImage.toLowerCase();
if (!bg || !bg.includes("ai") || !bg.includes("generated")) return;
```

Session-Handling via `sessionStorage`: Key gesetzt → Button ausgeblendet. Seitenreload → Key gelöscht → Button erscheint wieder. Navigation innerhalb der Session → Button bleibt ausgeblendet (Nutzende wurde bereits informiert).

Mehrsprachigkeit (DE / EN / FR) out of the box, automatisch über die Browsersprache ermittelt.

## Einbindung

Zwei Zeilen im HTML:

```html
<link rel="stylesheet" href="disclosure.css" />
<script src="disclosure.js"></script>
```

Funktioniert auf jeder statischen Seite, in jedem CMS oder Template — sofern das Hintergrundbild per CSS auf dem `body`-Element gesetzt ist.

## Dateien

| Datei            | Zweck                                            |
| ---------------- | ------------------------------------------------ |
| `disclosure.js`  | Kernlogik: Erkennung, Sprache, sessionStorage    |
| `disclosure.css` | Styling: fixed Position, Blur-Effekt, Transition |
| `test.html`      | Demo-Seite mit KI-generiertem Hintergrund        |

## Einschränkungen

- Erkennt nur Hintergrundbilder, die per CSS direkt am `body` gesetzt sind
- Basiert auf der Dateinamen-Konvention — Umbenennung der Datei => keine automatische Erkennung (mehr)
- Es ist BEWUSST keine automatische Erkennung von KI-Inhalten, das bleibt grundsätzlich eine menschliche Entscheidung

## Rechtlicher Hinweis

> **IANAL – Ich bin kein Anwalt.** Diese Lösung ist auf Basis von Art. 50 i.V.m. Art. 3 Nr. 60 EU AI Act konzipiert, stellt aber keine Rechtsberatung dar. Bei konkreten Compliance-Fragen bitte einen Fachanwalt hinzuziehen.

## Wen betrifft das?

- Unternehmen und alle, die KI geschäftlich oder beruflich einsetzen
- Privatpersonen ohne geschäftlichen Kontext sind ausdrücklich ausgenommen
- Kennzeichnungspflichtig sind fotorealistische KI-Bilder; offensichtlich künstliche Illustrationen sind ausgenommen

## Lizenz

MIT
