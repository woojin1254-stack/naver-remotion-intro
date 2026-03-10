---
description: [How to deploy and connect to GitHub]
---
1. Create a new repository on GitHub.
2. Run `git remote add origin [YOUR_REPO_URL]`
3. Run `git push -u origin main`
4. Connect the repository to Vercel (https://vercel.com) for a live preview URL.
5. The GitHub Action in `.github/workflows/render.yml` will automatically build the video for you.
