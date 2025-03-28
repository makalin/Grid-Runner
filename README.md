# Grid Runner

*An 80s-inspired endless runner built with Three.js*

**Grid Runner** is a retro-style arcade game where you pilot a rogue AI across a glowing, wireframe grid. Dodge Security Drones, leap over Glitch Walls, and collect power-ups to rack up your score in this fast-paced, neon-drenched digital world. Built with Three.js, it brings 80s vector graphics into a modern 3D browser experience.

---

## Features
- **Endless Gameplay:** Survive as long as you can on an infinite grid.
- **Obstacles:** Evade spinning Security Drones and static Glitch Walls.
- **Power-Ups:** Grab Data Orbs (score), Overclock (speed boost), and Shields (invincibility).
- **Retro Polish:** Neon bloom effects, particle trails, and CRT scanlines for that 80s arcade vibe.
- **Controls:** Arrow keys for left/right movement and jumping.

---

## Demo
Play it live on [GitHub Pages](https://makalin.github.io/Grid-Runner/)

---

## Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, etc.).
- A local server (e.g., `npx serve`, Live Server in VS Code, or similar) to run the game locally due to module imports.

### Setup
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/makalin/Grid-Runner.git
   cd Grid-Runner
   ```

2. **Install Dependencies (Optional):**
   If using a bundler like Vite:
   ```bash
   npm install
   ```
   Otherwise, the game uses CDN-hosted Three.js and postprocessing libraries—no local install needed.

3. **Run Locally:**
   Start a local server:
   ```bash
   npx serve .
   ```
   Open `http://localhost:3000` (or your server’s port) in your browser.

4. **Deploy (Optional):**
   Host on GitHub Pages by pushing to the `gh-pages` branch or using a static site deploy tool.

---

## How to Play
- **Objective:** Survive and score points by avoiding obstacles and collecting power-ups.
- **Controls:**
  - `Arrow Left`: Move left
  - `Arrow Right`: Move right
  - `Arrow Up`: Jump
- **Game Over:** Collide with an obstacle without a shield to end the game. Your score displays on the screen.

---

## Project Structure
```
grid-runner/
├── index.html        # Main entry point
├── js/
│   ├── main.js       # Game loop and Three.js setup
│   ├── player.js     # Player movement and power-ups
│   ├── utils.js      # Score, collision, and HUD
│   └── obstacles.js  # Obstacles and power-ups logic
├── assets/           # Images, sounds (optional)
├── style.css         # Retro CRT styling
└── README.md         # This file
```

---

## Technical Details
- **Framework:** Three.js for 3D rendering.
- **Post-Processing:** UnrealBloomPass for neon glow.
- **Modules:** ES6 imports (requires a local server or bundler).

---

## Contributing
Feel free to fork this repo and submit pull requests! Ideas for improvement:
- High-score system with local storage.
- Additional power-ups or obstacle types.
- Synthwave soundtrack integration.

---

## Credits
- **Powered by:** [Three.js](https://threejs.org/).
- **Inspiration:** 80s arcade classics like *Tron* and *Tempest*.

---

Enjoy running the grid!
