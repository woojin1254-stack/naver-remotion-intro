# 🚀 Naver Intro Remotion Project

### ✨ Ultra-High Optimization & Premium Visuals

This project is a high-performance **Remotion** video introduction for Naver services, built with **React**.

---

## 💎 Premium Features Included
- 🌀 **Spring Physics**: Dynamic, smooth animations using `spring()` interpolation for a high-end feel.
- ⚡ **Turbo Rendering**: Configured with **16x concurrency** and **parallel frame rendering**.
- 🖼️ **Optimized Assets**: Uses Remotion's specialized `<Img />` components for faster loading and zero flicker.
- 🎙️ **Multi-track Audio**: Synchronized TTS and background music support.

---

## 🛠️ Performance Optimizations
- **Frame Parallelization**: Set `Config.setConcurrency(16)` in `remotion.config.ts`.
- **PNG Interpolation**: High-fidelity frame sequences for zero-loss output.
- **Smart Caching**: Local caching enabled via `.cache/` directory.

---

## 🌐 Deploy & View (Your URL)
1. **GitHub Ready**: Initialized with `.github/workflows/render.yml`.
2. **Auto-Render**: Every push to `main` will automatically build the video artifact on GitHub.
3. **Vercel Host**: Compatible with `vercel.json` for manual or automatic deployment.

### Commands
```bash
# Preview locally
npm run dev

# High-speed render
npm run build

# Push to GitHub
git remote add origin YOUR_REPO_URL
git push -u origin main
```
