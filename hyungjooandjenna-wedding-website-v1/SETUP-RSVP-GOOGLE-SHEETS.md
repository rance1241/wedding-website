# FINAL RSVP SETUP — PRECONFIGURED

Your Google Sheet ID is already inserted into the supplied Apps Script:

`1b2Ffsjqf7IEbnPmCVbX2doHhvDGzWYhzPC00q8idjm0`

Your wedding website is already configured to call:

`https://script.google.com/macros/s/AKfycbw81TUn78l1R8wq8bM9kiS79tA9eYIbH0SITj0mYXL2EM4vxqHDC2ElETprccZ30FM/exec`

## Do this exactly

1. Open the Apps Script project connected to your RSVP Google Sheet.
2. Delete ALL code currently in the editor.
3. Open `google-apps-script-main-rsvp.gs` from this package.
4. Copy/paste the entire file into Apps Script.
5. Click Save.
6. At the top of the Apps Script editor, confirm the function dropdown contains:
   - `doGet`
   - `doPost`
   - `jsonResponse`

If `doGet` is not in that dropdown, the code was not pasted/saved correctly.

7. Click **Deploy → Manage deployments**.
8. Edit the deployment that uses this URL:
   `https://script.google.com/macros/s/AKfycbw81TUn78l1R8wq8bM9kiS79tA9eYIbH0SITj0mYXL2EM4vxqHDC2ElETprccZ30FM/exec`
9. Under Version, choose **New version**.
10. Confirm:
   - Execute as: Me
   - Who has access: Anyone
11. Click Deploy.

## Test the backend BEFORE testing the wedding website

Open:

`https://script.google.com/macros/s/AKfycbw81TUn78l1R8wq8bM9kiS79tA9eYIbH0SITj0mYXL2EM4vxqHDC2ElETprccZ30FM/exec`

You should see JSON similar to:

`{"ok":true,"message":"RSVP endpoint is working","spreadsheet":"YOUR SHEET NAME"}`

If you still see `Script function not found: doGet`, Google is still serving an older deployment version.

Only after the `/exec` URL shows `"ok":true` should you test the RSVP on the wedding website.
