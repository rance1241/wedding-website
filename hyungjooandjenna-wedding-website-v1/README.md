# Hyung Joo & Jenna Wedding Website — Version 2.4

Version 2.4 changes the homepage visual structure.

## Main design change

The names and date are now on a clean ivory intro screen.

They DO NOT overlap:
- the video
- engagement photos
- future wedding photos

The visual order is now:

1. Hyung Joo & Jenna
2. June 26, 2027 · Seoul
3. Full-width video
4. Engagement photos
5. Wedding information
6. The rest of the website

## Video

The site is already prepared for a video.

Right now it shows:
"Video coming soon"

When your video is ready:

1. Use an MP4 file.
2. Rename it:
   wedding-film.mp4
3. In GitHub, create/open:
   hyungjooandjenna-wedding-website-v1/media
4. Upload:
   wedding-film.mp4
5. Commit changes.

The site automatically looks for:
media/wedding-film.mp4

When the file loads successfully, the placeholder disappears and the real video player appears.

## Photos later

The site currently has three engagement-photo placeholders.

Once the photos are ready, ChatGPT can update the HTML/CSS to use the exact photos you choose.

The names and text will remain outside the photos.

## How to install Version 2.4

Keep Vercel Root Directory:
hyungjooandjenna-wedding-website-v1

Do not change Spaceship DNS or Vercel domain settings.

1. Download and unzip Version 2.4.
2. Open GitHub → wedding-website.
3. Open:
   hyungjooandjenna-wedding-website-v1
4. Replace:
   - index.html
   - style.css
   - script.js
   - README.md
5. Also upload the new `media` folder.
6. Commit changes.
7. Vercel redeploys automatically.
8. Refresh:
   https://www.hyungjooandjenna.com

If GitHub does not let you upload an empty folder, that is okay. The media folder in this package contains PUT-VIDEO-HERE.txt so it can be uploaded now.
