# Hyung Joo & Jenna Wedding Website — Version 2.8

Version 2.8 fixes the wedding video display.

## What changed

The website no longer forces the uploaded video into a fixed screen shape.

The real video now:
- keeps its original aspect ratio
- shows the full frame
- does not crop the top, bottom, or sides
- does not stretch the image
- does not use `object-fit: cover`

The placeholder remains 16:9 only until an actual video is uploaded.

## Video file

Keep the video at:

`media/wedding-film.mp4`

You do not need to resize or re-export the original video just for the website.

## How to update the live site

Keep the existing Vercel Root Directory:

`hyungjooandjenna-wedding-website-v1`

1. Download and unzip Version 2.8.
2. Open GitHub → `wedding-website`.
3. Open `hyungjooandjenna-wedding-website-v1`.
4. Replace:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
5. Keep your existing `media/wedding-film.mp4`.
6. Commit the changes.
7. Vercel redeploys automatically.
8. Refresh `https://www.hyungjooandjenna.com`.

Do not change Spaceship DNS or Vercel domain settings.
