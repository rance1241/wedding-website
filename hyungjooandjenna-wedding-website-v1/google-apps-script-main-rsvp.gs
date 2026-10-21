/*
Hyung Joo & Jenna — Main Wedding Website RSVP
Google Sheets backend

SETUP
1. Create a new Google Sheet.
2. Copy the Sheet ID from its URL.
3. Open Extensions > Apps Script.
4. Paste this entire file into the editor.
5. Replace PASTE_GOOGLE_SHEET_ID_HERE below.
6. Deploy > New deployment > Web app.
7. Execute as: Me
8. Who has access: Anyone
9. Copy the Web App URL.
10. In website script.js, paste that URL into:
    const MAIN_RSVP_ENDPOINT = "...";
*/

const SHEET_ID = "PASTE_GOOGLE_SHEET_ID_HERE";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const data = JSON.parse(e.postData.contents || "{}");

    if (data.type !== "main_website_rsvp") {
      return jsonResponse({ ok: false, error: "Unsupported submission type." });
    }

    let sheet = ss.getSheetByName("Website RSVP");

    if (!sheet) {
      sheet = ss.insertSheet("Website RSVP");
      sheet.appendRow([
        "Submitted At",
        "Attendance",
        "Name",
        "Plus One",
        "Plus-One Name",
        "Party Size",
        "Dietary Restrictions / Food Allergies",
        "Note",
        "Language"
      ]);

      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      data.attendance || "",
      data.name || "",
      data.plusOne || "No",
      data.plusOneName || "",
      data.partySize || 1,
      data.dietary || "",
      data.note || "",
      data.language || ""
    ]);

    return jsonResponse({ ok: true });

  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
