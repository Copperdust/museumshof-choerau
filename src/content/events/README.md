---
title: Beispiel
date: 2099-01-01
description: Diese Datei ist nur eine Anleitung - bitte nicht loeschen.
---

# Termine hinzufuegen

Um einen neuen Termin hinzuzufuegen, erstellen Sie eine neue .md Datei in diesem Ordner.

Felder:

- `title` (Pflicht) — Name der Veranstaltung.
- `date` (Pflicht) — Startdatum im Format `JJJJ-MM-TT`.
- `endDate` (optional) — Enddatum fuer mehrtaegige Ausstellungen.
- `description` (optional) — Kurze Unterzeile unter dem Titel (z. B. `von Apfelreibe bis Zitronenpresse`). Weglassen, wenn es nichts hinzuzufuegen gibt.
- `badge` (optional) — Kurzer Hinweis als Plakette, z. B. `Eintritt frei`.

Beispiel:

```
---
title: Name der Veranstaltung
date: 2026-05-15
endDate: 2026-05-22
description: Kurze Unterzeile
badge: Eintritt frei
---
```

Der Dateiname spielt keine Rolle, aber ein Format wie `2026-05-15-name.md` hilft bei der Uebersicht.
