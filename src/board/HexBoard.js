export default class HexBoard {
  constructor(scene, aspectManager) {
    this.scene = scene;
    this.aspectManager = aspectManager;
    this.size = 30; // radius of hex
    this.originX = scene.scale.width / 2;
    this.originX-= 75; // temporary offset, should try to center board between L and R panels
    this.originY = scene.scale.height / 2;

    this.tiles = new Map(); // stores tiles by "q,r"

    this.graphics = scene.add.graphics();
    this.connectionGraphics = scene.add.graphics() // connection between nodes
     .setDepth(1); // behind sprites, above grid
     this.directions = [
      { q: 1, r: 0 }, // right
      { q: -1, r: 0 }, // left
      { q: 0, r: 1 }, // down-right
      { q: 0, r: -1 }, // up-left
      { q: 1, r: -1 }, // up-right
      { q: -1, r: 1 } // down-left
    ];
    this.scene.tweens.add({ //pulsating, disable when puzzle is complete
      targets: this.connectionGraphics,
      alpha: 0.5,
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    this.createHexGrid(3); // radius of board
    this.enableInteraction();
  }

  // Convert axial to pixel
  hexToPixel(q, r) {
    const x = this.size * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r);
    const y = this.size * (3 / 2 * r);

    return {
      x: this.originX + x,
      y: this.originY + y
    };
  }

  // Draw a hex
  drawHex(x, y, color = 0x444444) {
    const g = this.graphics;

    g.lineStyle(2, 0xffffff, 0.2);
    g.fillStyle(color, 1);

    g.beginPath();

    for (let i = 0; i < 6; i++) {
      const angle = Phaser.Math.DegToRad(60 * i - 30);
      const px = x + this.size * Math.cos(angle);
      const py = y + this.size * Math.sin(angle);

      if (i === 0) g.moveTo(px, py);
      else g.lineTo(px, py);
    }

    g.closePath();
    g.fillPath();
    g.strokePath();
  }

  // Create board shape
  createHexGrid(radius) {
    for (let q = -radius; q <= radius; q++) {
      for (let r = -radius; r <= radius; r++) {
        if (Math.abs(q + r) <= radius) {
          const pos = this.hexToPixel(q, r);

          this.drawHex(pos.x, pos.y);

          this.tiles.set(`${q},${r}`, {
            q,
            r,
            x: pos.x,
            y: pos.y,
            aspect: null,
            sprite: null
          });
        }
      }
    }
  }

  // Enable clicking + hover
  enableInteraction() {
    this.hoverHex = null;

    // light up hexagons with mouse over
    this.scene.input.on("pointermove", (pointer) => {
      const hex = this.pixelToHex(pointer.x, pointer.y);

      if (!hex) return;
      this.hoverHex = hex;
      this.redraw();
    });

    // left click
    this.scene.input.on("pointerdown", (pointer) => {
      const hex = this.pixelToHex(pointer.x, pointer.y);
      if (!hex) return;

      console.log("Clicked hex:", hex);

      const tile = this.tiles.get(`${hex.q},${hex.r}`);
      if(!tile) return;
      
      // right click to delete
      if (pointer.rightButtonDown()) {
        tile.aspect = null;
        tile.sprite?.destroy();
        tile.sprite = null;
        // this.drawHex(tile.x, tile.y, 0xff4444);
        this.drawConnections();
        this.redraw();
        return;
      }

      this.redraw();
    });
  }

  // Convert pixel to current hex 
  pixelToHex(x, y) {
    const px = x - this.originX;
    const py = y - this.originY;

    const q = (Math.sqrt(3)/3 * px - 1/3 * py) / this.size;
    const r = (2/3 * py) / this.size;

    return this.hexRound(q, r);
  }

  // Round to nearest hex 
  hexRound(q, r) {
    let x = q;
    let z = r;
    let y = -x - z;

    let rx = Math.round(x);
    let ry = Math.round(y);
    let rz = Math.round(z);

    const x_diff = Math.abs(rx - x);
    const y_diff = Math.abs(ry - y);
    const z_diff = Math.abs(rz - z);

    if (x_diff > y_diff && x_diff > z_diff) {
      rx = -ry - rz;
    } else if (y_diff > z_diff) {
      ry = -rx - rz;
    } else {
      rz = -rx - ry;
    }

    return { q: rx, r: rz };
  }

  // Redraw board (handles hover + placed items)
  redraw() {
    // this.drawConnections(); // slow to redraw connections every call. move this to when aspects get placed and deleted once deletes are fixed
    if (tile.aspect) {
      const key = this.aspectManager.getTextureKey(tile.aspect);

      if (!tile.sprite) {
        // create once
        tile.sprite = this.scene.add.image(tile.x, tile.y, key)
          .setDisplaySize(36, 36);
        tile.sprite.setTexture(key);
        tile.sprite.setVisible(true);
      } 
  }
}

  tryPlaceDragged(dragged) {
    if (!this.hoverHex) return;

    const key = `${this.hoverHex.q},${this.hoverHex.r}`;
    const tile = this.tiles.get(key);
    if (!tile) return;

    // prevent overwrite
    if (tile.aspect) return;

    // assign data only
    tile.aspect = dragged.type;

    // create tile sprite HERE (not in redraw)
    if (!tile.sprite) {
      tile.sprite = this.scene.add.image(
        tile.x,
        tile.y,
        this.aspectManager.getTextureKey(tile.aspect)
      )
      .setDisplaySize(36, 36)
      .setDepth(10); // above grid
    } else {
      tile.sprite.setTexture(this.aspectManager.getTextureKey(tile.aspect));
      tile.sprite.setVisible(true);
    }
    this.drawConnections();
    
  }

  areConnected(a, b) {
    if (!a || !b) return false;

    const connections = this.aspectManager.getConnections(a);
    return connections.has(b);
  }

  drawConnections() {
    const g = this.connectionGraphics;
    g.clear();

    for (let tile of this.tiles.values()) {
      if (!tile.aspect) continue;

      for (let dir of this.directions) {
        const nq = tile.q + dir.q;
        const nr = tile.r + dir.r;

        const neighbor = this.tiles.get(`${nq},${nr}`);
        if (!neighbor || !neighbor.aspect) continue;

        // Avoid drawing duplicates (only one direction)
        if (nq < tile.q || (nq === tile.q && nr < tile.r)) continue;

        if (this.areConnected(tile.aspect, neighbor.aspect)) {
          this.drawGlowLine(tile, neighbor);
        }
      }
    }
  }

  drawGlowLine(a, b) {
    const g = this.connectionGraphics;

    const x1 = a.x;
    const y1 = a.y;
    const x2 = b.x;
    const y2 = b.y;

    // Outer glow (soft, thick, transparent)
    g.lineStyle(10, 0x88ccff, 0.15);
    g.beginPath();
    g.moveTo(x1, y1);
    g.lineTo(x2, y2);
    g.strokePath();

    // Inner glow
    g.lineStyle(6, 0xaaddff, 0.25);
    g.beginPath();
    g.moveTo(x1, y1);
    g.lineTo(x2, y2);
    g.strokePath();

    // Core bright line
    g.lineStyle(2, 0xffffff, 0.9);
    g.beginPath();
    g.moveTo(x1, y1);
    g.lineTo(x2, y2);
    g.strokePath();
  }

}