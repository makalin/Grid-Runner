class Player {
  constructor(scene) {
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshBasicMaterial({ color: 0xff00ff }); // Magenta glow
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0, 0.5, 0); // Starting position above grid
    scene.add(this.mesh);

    // Player state
    this.speed = 0.1; // Base forward speed (adjusted in main.js)
    this.velocityY = 0; // For jumping
    this.isJumping = false;
    this.powerUps = {
      shield: false,
      overclock: false,
      shieldTime: 0,
      overclockTime: 0
    };
  }

  // Update player position and states
  update(delta) {
    // Apply gravity and jumping
    if (this.isJumping) {
      this.mesh.position.y += this.velocityY;
      this.velocityY -= 0.05; // Gravity
      if (this.mesh.position.y <= 0.5) {
        this.mesh.position.y = 0.5;
        this.isJumping = false;
        this.velocityY = 0;
      }
    }

    // Handle power-up timers
    if (this.powerUps.shield) {
      this.powerUps.shieldTime -= delta;
      if (this.powerUps.shieldTime <= 0) this.powerUps.shield = false;
    }
    if (this.powerUps.overclock) {
      this.powerUps.overclockTime -= delta;
      if (this.powerUps.overclockTime <= 0) {
        this.powerUps.overclock = false;
        this.speed = 0.1; // Reset speed
      }
    }

    // Update material color based on power-ups
    this.material.color.setHex(
      this.powerUps.shield ? 0x00ff00 : // Green for shield
      this.powerUps.overclock ? 0xffff00 : // Yellow for overclock
      0xff00ff // Default magenta
    );
  }

  // Move left or right
  move(direction) {
    const laneWidth = 2;
    if (direction === 'left' && this.mesh.position.x > -5) {
      this.mesh.position.x -= laneWidth;
    }
    if (direction === 'right' && this.mesh.position.x < 5) {
      this.mesh.position.x += laneWidth;
    }
  }

  // Jump action
  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.velocityY = 0.5; // Jump strength
    }
  }

  // Apply power-ups
  activatePowerUp(type) {
    if (type === 'shield') {
      this.powerUps.shield = true;
      this.powerUps.shieldTime = 500; // 500 frames (~8-10 seconds at 60fps)
    } else if (type === 'overclock') {
      this.powerUps.overclock = true;
      this.powerUps.overclockTime = 300; // 300 frames (~5 seconds)
      this.speed = 0.2; // Double speed
    }
  }

  // Get player bounding box for collision
  getBoundingBox() {
    return new THREE.Box3().setFromObject(this.mesh);
  }
}