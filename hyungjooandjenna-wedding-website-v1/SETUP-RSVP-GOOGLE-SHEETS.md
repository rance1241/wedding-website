# Connect the Main Website RSVP to Google Sheets

The RSVP interface is already built into the website. This one-time setup makes submissions save automatically to a Google Sheet.

## 1. Create a Google Sheet
Create a new Google Sheet for wedding RSVPs.

The Sheet URL will look similar to:

`https://docs.google.com/spreadsheets/d/ABC123XYZ/edit`

The Sheet ID is the part between `/d/` and `/edit`:

`ABC123XYZ`

## 2. Open Apps Script
Inside the Google Sheet, choose:

**Extensions → Apps Script**

Delete the starter code.

## 3. Paste the backend
Open this file from the website package:

`google-apps-script-main-rsvp.gs`

Paste all of it into Apps Script.

Replace:

`PASTE_GOOGLE_SHEET_ID_HERE`

with your real Google Sheet ID.

## 4. Deploy it
In Apps Script choose:

**Deploy → New deployment → Web app**

Use:

- Execute as: **Me**
- Who has access: **Anyone**

Click Deploy and authorize it.

Copy the Web App URL.

## 5. Add the URL to the website
Open:

`script.js`

Find:

`const MAIN_RSVP_ENDPOINT = "";`

Paste the Web App URL between the quotes:

`const MAIN_RSVP_ENDPOINT = "YOUR_WEB_APP_URL";`

Commit the updated `script.js` to GitHub. Vercel will redeploy automatically.

## What the Google Sheet stores

The sheet tab will be called:

`Website RSVP`

Columns:

- Submitted At
- Attendance
- Name
- Plus One
- Plus-One Name
- Party Size
- Dietary Restrictions / Food Allergies
- Note
- Language

## Attendance choices

- Korea Wedding
- U.S. Reception Party
- Both
- Not Attending
