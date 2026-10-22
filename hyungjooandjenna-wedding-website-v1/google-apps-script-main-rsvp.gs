const SHEET_ID = "1b2Ffsjqf7IEbnPmCVbX2doHhvDGzWYhzPC00q8idjm0";

function doGet() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    return jsonResponse({
      ok: true,
      message: "RSVP endpoint is working",
      spreadsheet: ss.getName()
    });
  } catch (error) {
    return jsonResponse({
      ok: false,
      error: String(error)
    });
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const data = JSON.parse(e.postData.contents || "{}");

    if (data.type !== "main_website_rsvp") {
      return jsonResponse({
        ok: false,
        error: "Unsupported submission type."
      });
    }

    let sheet = ss.getSheetByName("Website RSVP");

    if (!sheet) {
      sheet = ss.insertSheet("Website RSVP");
      sheet.appendRow([
        "Submitted At",
        "Attendance",
        "Name",
        "Additional Guests?",
        "Additional Guest Names",
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

    return jsonResponse({
      ok: true,
      message: "RSVP saved successfully"
    });

  } catch (error) {
    return jsonResponse({
      ok: false,
      error: String(error)
    });
  } finally {
    lock.releaseLock();
  }
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
