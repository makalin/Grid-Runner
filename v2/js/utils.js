class Utils {
  constructor() {
    this.score = 0;
    this.gameOver = false;

    // HUD setup (simple DOM overlay)
    this.scoreElement = document.createElement('div');
    this.scoreElement.style.position = 'absolute';
    this.scoreElement.style.top = '10px';
    this.scoreElement.style.left = '10px';
    this.scoreElement.style.color = '#00ffff'; // Neon cyan
    this.scoreElement.style.fontFamily = 'monospace';
    this.scoreElement.style.fontSize = '24px';
    document.body.appendChild(this.scoreElement);
    this.updateScoreDisplay();

    this.gameOverElement = document.createElement('div');
    this.gameOverElement.style.position = 'absolute';
    this.gameOverElement.style.top = '50%';
    this.gameOverElement.style.left = '50%';
    this.gameOverElement.style.transform = 'translate(-50%, -50%)';
    this.gameOverElement.style.color = '#ff00ff'; // Neon magenta
    this.gameOverElement.style.fontFamily = 'monospace';
    this.gameOverElement.style.fontSize = '48px';
    this.gameOverElement.style.display = 'none';
    document.body.appendChild(this.gameOverElement);
  }

  // Update score and display
  addScore(points) {
    this.score += points;
    this.updateScoreDisplay();
  }

  updateScoreDisplay() {
    this.scoreElement.textContent = `SCORE: ${this.score}`;
  }

  // Check collision between two objects (player and obstacle)
  checkCollision(obj1, obj2) {
    const box1 = new THREE.Box3().setFromObject(obj1);
    const box2 = new THREE.Box3().setFromObject(obj2);
    return box1.intersectsBox(box2);
  }

  // Trigger game over
  endGame() {
    this.gameOver = true;
    this.gameOverElement.textContent = `GAME OVER\nSCORE: ${this.score}`;
    this.gameOverElement.style.display = 'block';
  }

  // Reset game state
  reset() {
    this.score = 0;
    this.gameOver = false;
    this.updateScoreDisplay();
    this.gameOverElement.style.display = 'none';
  }
}