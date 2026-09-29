# Hyung Joo & Jenna Wedding Website — Version 3.2

Version 3.2 includes your actual wedding trailer video.

## What changed

- Added the uploaded video directly to:
  `media/wedding-film.mp4`
- The Trailer section will automatically load this video.
- The video keeps its original aspect ratio.
- The full frame is shown without forced cropping or stretching.
- All Version 3.1 features remain:
  - Trailer title
  - Cutscenes photo carousel
  - 20 photos in the selected order
  - left/right arrows
  - swipe support
  - keyboard arrow support
  - bilingual EN / 한국어
  - detailed venue directions
  - U.S. reception section
  - RSVP dietary restriction question

## How to update the live site

Keep the existing Vercel Root Directory:

`hyungjooandjenna-wedding-website-v1`

1. Download and unzip Version 3.2.
2. Open GitHub → `wedding-website`.
3. Open `hyungjooandjenna-wedding-website-v1`.
4. Replace:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
5. Upload/replace these folders too:
   - `images`
   - `media`
6. Make sure the video exists at:
   `media/wedding-film.mp4`
7. Commit changes.
8. Vercel will redeploy automatically.
9. Refresh:
   `https://www.hyungjooandjenna.com`

Do not change Spaceship DNS or Vercel domain settings.
