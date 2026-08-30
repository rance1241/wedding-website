# Hyung Joo & Jenna Wedding Website — Version 2

This is the second version of the wedding website for:

- Hyung Joo & Jenna
- June 26, 2027
- Jamsil Lotte World Korean Traditional Wedding Venue
- Seoul, Korea

## What Version 2 adds

- Full EN / 한국어 language switching
- Wedding countdown
- Mobile navigation
- Ivory / charcoal / sage wedding palette
- Improved wedding layout
- Travel section
- Hotel section
- Seoul guide
- FAQ
- RSVP placeholder
- Engagement photo placeholders

## IMPORTANT: How to update your existing website

Your Vercel project currently uses this GitHub folder as its Root Directory:

hyungjooandjenna-wedding-website-v1

Do NOT upload this whole Version 2 folder as another folder unless you want to change your Vercel Root Directory again.

Instead, replace the existing files INSIDE your current GitHub folder.

### Step-by-step

1. Download and unzip the Version 2 ZIP.
2. You will see:
   - index.html
   - style.css
   - script.js
   - README.md
3. Open GitHub.
4. Open your `wedding-website` repository.
5. Open the folder:
   `hyungjooandjenna-wedding-website-v1`
6. Delete the old:
   - index.html
   - style.css
   - script.js
   - README.md
7. Upload the four new Version 2 files into that SAME folder.
8. Commit the changes.
9. Vercel should automatically detect the GitHub update and redeploy.
10. Wait 1–3 minutes.
11. Refresh:
    https://www.hyungjooandjenna.com

You do NOT need to change:
- Spaceship DNS
- Vercel Domains
- Vercel Root Directory

## Adding engagement photos later

The current site contains gray photo placeholders.

When the engagement photos are ready, create an `images` folder inside the same GitHub folder and upload your images there.

Then update CSS or HTML references to use:
images/your-photo-name.jpg

ChatGPT can prepare those edits for you once the photos are available.
