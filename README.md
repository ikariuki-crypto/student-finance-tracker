# Student Finance Tracker

Live site: https://ikariuki-crypto.github.io/student-finance-tracker/
Repo: https://github.com/ikariuki-crypto/student-finance-tracker
Demo video: 

## Theme
Student Finance Tracker: log expenses, search them with regex, track spending against a monthly cap.

## Features
- Add transactions with description, amount, category and date
- Four regex validation rules plus a back-reference rule for duplicate words
- Live regex search with case-insensitive toggle and `<mark>` highlighting
- Sort by date, description and amount
- Dashboard: total records, total spent, top category, remaining of cap
- Cap announced via ARIA live region (polite under budget, assertive over)
- Auto-save to localStorage; JSON import with structure validation; JSON export
- Mobile-first layout with breakpoints at 768px and 1024px
- Skip link, visible focus styles, labelled inputs, semantic landmarks

## Regex catalog
| Rule | Pattern | Accepts | Rejects |
|---|---|---|---|
| Description | `^\S(?:.*\S)?$` | `Lunch at cafe` | ` Lunch` (leading space) |
| Amount | `^(0\|[1-9]\d*)(\.\d{1,2})?$` | `12.50`, `0`, `7` | `007`, `1.500` |
| Date | `^\d{4}-(0[1-9]\|1[0-2])-(0[1-9]\|[12]\d\|3[01])$` | `2026-10-13` | `13-10-2026` |
| Category | `^[A-Za-z]+(?:[ -][A-Za-z]+)*$` | `Food`, `Self-care` | `Food123` |
| Duplicate word (advanced, back-reference) | `\b(\w+)\s+\1\b` | flags `the the` | — |

Search examples: `(coffee|tea)` with case-insensitive on, `\.\d{2}\b` for amounts with cents, `^T` for descriptions starting with T.

## Keyboard map
- Tab / Shift+Tab: move between controls
- Enter on a focused button: activate it
- Enter in the form: submit (Save)
- First Tab on page load: "Skip to content" link

## Accessibility notes
- Skip-to-content link is the first thing to appear once landing on the page.
- Semantic landmarks: header, navigation, main, section, footer.
- Each input has been set with a visible label bound with for/id.
- Clear and easily visible focus outlines on every focusable element.
- Status and error messages are announced via aria-live / role="status".
- Everything (add, edit, delete, search, settings) can fully be used with a keyboard alone.
- Colour contrast has been checked to meet WCAG AA
- The Table becomes cards on small screens so nothing scrolls sideways

## How to run
Open `index.html` via any static server (VS Code Live Preview) or the GitHub Pages link. No build step.

## How to run tests
Open `tests.html` in the browser. Each line shows PASS or FAIL for one validator case.

## Known limitations
- Date regex accepts non-existent dates such as 2026-02-29
- Currency rates are stored but not yet applied to amounts
- inline edit not implemented, 7-day chart not implemented.

## Milestones
M1 spec and wireframes, M2 semantic HTML and CSS, M3 validation and tests, M4 render/sort/search, M5 stats and cap, M6 persistence and import/export, M7 polish.

## M1 - Spec and wireframes

### Data model
Each transaction looks like this: 

```json
{
  "id": "rec_0001",
  "description": "Lunch at cafeteria",
  "amount": 12.50,
  "category": "Food",
  "date": "2026-10-11",
  "createdAt": "2026-10-11T10:00:00Z",
  "updatedAt": "2026-10-11T10:00:00Z"
}
```

Field rules:
- id: rec_followed by a number, unique, generated automatically.
- description: Text, no leading or trailing spaces, no double spaces. 
- amount: number with up to 2 decimals.
- category: letters, spaces and hyphens only;must be one of the category list
- date: YYYY-MM-DD
- createdAt / updatedAt: ISO timestamps set by the app, not typed by the user.

Default categories: Food, Transport, Books, Entertainment, Fees, Other
Base currency: KES Other currencies: RWF and EUR

### Accessibility plan
- Skip-to-content link is the first thing to appear once landing on the page.
- Semantic landmarks: header, navigation, main, section, footer.
- Each input has been set with a visible label bound with for/id.
- Clear and easily visible focus outlines on every focusable element.
- Status and error messages are announced via aria-live / role="status".
- Everything (add, edit, delete, search, settings) can fully be used with a keyboard alone.
- Colour contrast has been checked to meet WCAG AA
- The table scrolls horizontally inside its container or small screens.


### Wireframes
- Phone: `assets/wireframes/phone-wireframe.jpg`
- Desktop: `assets/wireframes/desktop-wireframe.jpg`
