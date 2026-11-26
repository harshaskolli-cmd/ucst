# University College of Science, Tumkur – website

Static website (no build step). Deployed on Vercel from this repository.

Give this whole file (and the folder) to the person or tool doing the deployment.

## What this is
A static website. No build step, no framework, no server, no environment variables.
Entry point: `index.html` (about 6 MB, everything for the pages is inside it).
It loads these folders using relative paths:
- `media/`   (ucst_patches.js, campus_video.js, hero.mp4, hero_poster.jpg, tu_logo.jpg, campus/*.jpg)
- `faculty/` (faculty.js, cvpages.js, cv/*.pdf, cvimg/*.jpg, cvjs/*.js)
- `vercel.json` (in the project root, next to index.html)

## Rules – DO NOT CHANGE ANYTHING
- Do not edit, minify, rename, reformat, optimise or "clean up" any file.
- Do not move files. Keep the folder layout exactly as given: index.html, vercel.json, media/, faculty/ together in one root folder.
- Do not let Vercel convert images or videos.
- The site must look and behave identically to the preview.

## Vercel settings
- Framework Preset: **Other**
- Build Command: **leave empty**
- Output Directory: **leave empty** (or `.`)
- Install Command: **leave empty**
- Root Directory: the folder that contains index.html

## Deploy (any one way)
1. Dashboard: vercel.com/new -> drag the project folder in -> Deploy.
2. CLI: open a terminal in the folder, run `npm i -g vercel`, then `vercel --prod`, answering the questions with the settings above.

## After deploying, check
- Home page: hero video plays by itself (muted, looping), principal slider moves.
- Faculty page: photos and "CV" buttons open.
- Infrastructure and Campus Life: photo slideshows move.
- Campus Life (bottom): the 17 videos play. They stream from Google Drive; the Drive folder is already set to "anyone with the link".
- A phone: same pages, nothing overflows.

## Notes
- The video background is hero.mp4 (about 3 MB). Keep it.
- Deep links use `#` (for example `/#infrastructure`), so no rewrites are needed.
