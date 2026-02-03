# SmileSmith Ltd - Dental Implants & GBR Products Website

A modern, animated website for SmileSmith Ltd, featuring a creative landing page with smooth animations and a professional design.

## Features

- 🎨 Modern, responsive design with blue, white, black, and orange color scheme
- ✨ Smooth animations and transitions using Framer Motion
- 📱 Fully responsive mobile design
- 🎯 Interactive navbar with smooth scrolling
- 🦷 Creative landing page with animated elements
- 📊 Statistics section
- 🎭 Beautiful hero section with floating shapes

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
smile/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── LandingPage.jsx
│   │   ├── LandingPage.css
│   │   ├── AboutSection.jsx
│   │   └── AboutSection.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Technologies Used

- React 18
- Vite
- Framer Motion (for animations)
- CSS3 (custom styling)

## Color Scheme

- Primary Blue: `#1e3a8a`
- Light Blue: `#3b82f6`
- Bright Blue: `#60a5fa`
- Orange: `#f97316`
- White: `#ffffff`
- Black: `#1a1a1a`

## Sections

1. **Hero Section** - Animated landing area with floating shapes
2. **Products Section** - Feature cards showcasing products
3. **About Section** - Company information and values
4. **Stats Section** - Key statistics and achievements
5. **CTA Section** - Call-to-action for contact

## Customization

To add your own images, place them in a `public` folder and reference them in your components. The current setup uses placeholder SVG graphics that can be replaced with actual product images.
