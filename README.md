# 🎥 ScrollXP — Next-Gen Scroll Animation Engine

[![Deploy to GitHub Pages](https://github.com/yashasvi9199/scroll-animation/actions/workflows/deploy.yml/badge.svg)](https://github.com/yashasvi9199/scroll-animation/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://yashasvi9199.github.io/scroll-animation/)

An ultra-premium, high-performance scroll-driven experience built with **React 19**, **Canvas API**, and **Tailwind CSS v4**. Experience seamless frame-by-frame animation that responds with surgical precision to user interaction.

---

## ✨ Core Features

### 🚀 High-Frequency Frame Rendering

Powered by direct Buffer-to-Canvas rendering, ScrollXP delivers buttery-smooth 60FPS animations by preloading frame sequences and mapping scroll progress to specific frame indices.

### 🎨 Immersive Design System

- **Jet-Black Aesthetic**: Advanced background blending using CSS `mix-blend-mode` to ensure frame backgrounds match the site UI perfectly.
- **Dynamic Text Overlays**: Semantic typography that fades, translates, and scales based on scroll depth.
- **Micro-interactions**: Subtle glow effects, glassmorphic loading screens, and responsive progress indicators.

### ⚡ Technical Excellence

- **Vite 7**: Lightning-fast development and optimized production builds.
- **Tailwind CSS v4**: Leveraging the latest engine for high-performance styling.
- **Canvas-Driven**: Optimized memory usage for handling large frame sequences without UI jank.

---

## 🛠️ Technology Stack

| Layer         | Technology                                                  |
| :------------ | :---------------------------------------------------------- |
| **Framework** | [React 19](https://react.dev/)                              |
| **Styling**   | [Tailwind CSS v4](https://tailwindcss.com/)                 |
| **Bundler**   | [Vite 7](https://vitejs.dev/)                               |
| **Animation** | HTML5 Canvas API + Custom Hooks                             |
| **Language**  | [TypeScript (Strict Mode)](https://www.typescriptlang.org/) |

---

## 🏃 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/yashasvi9199/scroll-animation.git
cd scroll-animation
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

---

## 📦 Project Structure

```bash
src/
├── components/       # UI Components (Hero, Footer, Loading)
│   ├── FrameCanvas/  # Core Rendering Engine
│   └── TextOverlay/  # Scroll-driven narrative layers
├── hooks/            # Custom Logic (useScrollProgress, useFramePreloader)
├── utils/            # Shared utilities (Tailwind Merge, CN)
└── App.tsx           # Application Entry
```

---

## 📄 License

This project is open-source and available under the MIT License.

---

Built with ❤️ by [Yashasvi](https://github.com/yashasvi9199)
