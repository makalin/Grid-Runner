class Obstacle {
  constructor(scene, type, positionZ) {
    this.type = type;
    this.scene = scene;

    if (type === 'drone') {
      this.geometry = new THREE.BoxGeometry(1, 1, 1);
      this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red drones
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.mesh.position.set(Math.random() * 10 - 5, 0.5, positionZ);
      this.speed = 0.15; // Slightly faster than player
    } else if (type === 'wall') {
      this.geometry = new THREE.BoxGeometry(4, 2, 0.5);
      this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true }); // Green wireframe walls
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.mesh.position.set(Math.random() * 6 - 3, 1, positionZ);
      this.speed = 0; // Static
    }

    this.scene.add(this.mesh);
  }

  update(playerSpeed) {
    this.mesh.position.z += this.speed - playerSpeed; // Relative movement
    if (this.type === 'drone') {
      this.mesh.rotation.x += 0.05; // Spin for effect
      this.mesh.rotation.y += 0.05;
    }
    return this.mesh.position.z > 10; // Return true if out of bounds
  }

  getBoundingBox() {
    return new THREE.Box3().setFromObject(this.mesh);
  }

  remove() {
    this.scene.remove(this.mesh);
  }
}

class PowerUp {
  constructor(scene, type, positionZ) {
    this.type = type;
    this.scene = scene;

    this.geometry = new THREE.SphereGeometry(0.5, 8, 8); // Low-poly retro sphere
    this.material = new THREE.MeshBasicMaterial({
      color: type === 'orb' ? 0xffff00 : type === 'overclock' ? 0xff00ff : 0x00ffff, // Yellow, magenta, cyan
      wireframe: true
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(Math.random() * 10 - 5, 0.5, positionZ);
    this.scene.add(this.mesh);
  }

  update(playerSpeed) {
    this.mesh.position.z -= playerSpeed;
    this.mesh.rotation.y += 0.03; // Gentle spin
    return this.mesh.position.z > 10; // Out of bounds check
  }

  getBoundingBox() {
    return new THREE.Box3().setFromObject(this.mesh);
  }

  remove() {
    this.scene.remove(this.mesh);
  }
}

function spawnPowerUp(scene, powerUps) {
  const types = ['orb', 'overclock', 'shield'];
  const type = types[Math.floor(Math.random() * types.length)];
  powerUps.push(new PowerUp(scene, type, -20));
}

function spawnObstacles(scene, obstacles) {
  const type = Math.random() > 0.5 ? 'drone' : 'wall';
  obstacles.push(new Obstacle(scene, type, -20));
}