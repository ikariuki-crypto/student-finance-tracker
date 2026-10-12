# Student Finance Tracker

Live site: https://github.com/ikariuki-crypto/student-finance-tracker 

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
- The Table becomes cards on small screens so nothing scrolls sideways


### Wireframes
- Phone: `assets/wireframes/phone-wireframe.jpg`
- Desktop: `assets/wireframes/desktop-wireframe.jpg`
