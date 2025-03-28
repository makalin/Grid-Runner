// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('game-container').appendChild(renderer.domElement);

// Grid
const gridGeometry = new THREE.PlaneGeometry(100, 1000, 10, 100);
const gridMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
const grid = new THREE.Mesh(gridGeometry, gridMaterial);
grid.rotation.x = -Math.PI / 2;
scene.add(grid);

// Player and utils
const player = new Player(scene);
const utils = new Utils();

// Particle trail
const particleGeometry = new THREE.BufferGeometry();
const particleCount = 100;
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = 0;
  positions[i * 3 + 1] = 0;
  positions[i * 3 + 2] = 0;
  colors[i * 3] = 1; // Magenta-ish
  colors[i * 3 + 1] = 0;
  colors[i * 3 + 2] = 1;
}
particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
const particleMaterial = new THREE.PointsMaterial({ size: 0.1, vertexColors: true });
const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// Camera setup
camera.position.set(0, 5, 10);
camera.lookAt(player.mesh.position);

// Game state
let obstacles = [];
let powerUps = [];
let lastSpawn = 0;

// Game loop
function animate() {
  if (!utils.gameOver) {
    requestAnimationFrame(animate);

    // Update player and world
    player.update(1);
    player.mesh.position.z -= player.speed;
    grid.position.z -= player.speed;
    camera.position.z -= player.speed;
    if (grid.position.z < -500) grid.position.z = 0;

    // Spawn obstacles and power-ups
    lastSpawn++;
    if (lastSpawn > 60) { // Every ~1 second at 60fps
      spawnObstacles(scene, obstacles);
      if (Math.random() > 0.7) spawnPowerUp(scene, powerUps); // 30% chance
      lastSpawn = 0;
    }

    // Update obstacles
    obstacles = obstacles.filter(ob => {
      const despawn = ob.update(player.speed);
      if (utils.checkCollision(player.mesh, ob.mesh) && !player.powerUps.shield) {
        utils.endGame();
      }
      if (despawn) ob.remove();
      return !despawn;
    });

    // Update power-ups
    powerUps = powerUps.filter(pu => {
      const despawn = pu.update(player.speed);
      if (utils.checkCollision(player.mesh, pu.mesh)) {
        if (pu.type === 'orb') utils.addScore(100);
        else player.activatePowerUp(pu.type);
        pu.remove();
        return false;
      }
      if (despawn) pu.remove();
      return !despawn;
    });

    // Update particles
    const posArray = particles.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3] -= player.speed; // Move with player
      posArray[i * 3 + 1] -= 0.01; // Fall slightly
      if (posArray[i * 3 + 2] > player.mesh.position.z) {
        posArray[i * 3] = player.mesh.position.x + (Math.random() - 0.5) * 0.5;
        posArray[i * 3 + 1] = player.mesh.position.y + 0.5;
        posArray[i * 3 + 2] = player.mesh.position.z - 1;
      }
    }
    particles.geometry.attributes.position.needsUpdate = true;

    // Render
    renderer.render(scene, camera);
  }
}
animate();

// Controls
document.addEventListener('keydown', (event) => {
  if (utils.gameOver) return;
  if (event.key === 'ArrowLeft') player.move('left');
  if (event.key === 'ArrowRight') player.move('right');
  if (event.key === 'ArrowUp') player.jump();
});