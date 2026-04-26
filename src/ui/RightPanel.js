export default class RightPanel {
  constructor(scene, aspectManager) {
    this.scene = scene;
    this.aspectManager = aspectManager;

    const width = 300;
    const x = scene.scale.width - width;

    this.bg = scene.add.rectangle(x, 0, width, 700, 0x2a2a2a)
      .setOrigin(0);

    scene.add.text(x + 20, 20, "Aspects", { color: "#ffffff" });

    this.populateAspects(x);
  }

  populateAspects(startX) {
  const cols = 5;        // number of columns
  const spacing = 60;    // space between cells
  const offsetX = startX + 30;
  const offsetY = 80;

  let i = 0;

  this.aspectManager.aspects.forEach(aspect => {
    const col = i % cols;
    const row = Math.floor(i / cols);

    const x = offsetX + col * spacing;
    const y = offsetY + row * spacing;

    this.createAspect(x, y, aspect);

    i++;
  });
}

  createAspect(x, y, aspect) {
    const scene = this.scene;

    // const icon = scene.add.image(x, y, this.aspectManager.getTextureKey(aspect))
    //   .setDisplaySize(40, 40)
    //   .setInteractive();
    const icon = scene.add.image(x, y,this.aspectManager.getTextureKey(aspect))
    .setDisplaySize(40, 40)
    .setInteractive()
    .setDepth(5);
    // glow circle
    const glow = scene.add.circle(x, y, 28, 0xffffff, 0.25)
      .setBlendMode(Phaser.BlendModes.ADD)
      .setVisible(false)
      .setDepth(4); // behind icon but visible


    // Store reference for later highlighting
    if (!this.icons) this.icons = new Map();
    // this.icons.set(aspect, icon);
    this.icons.set(aspect, {icon, glow});
    
    icon.on("pointerdown", () => {
      scene.draggedAspect = {
        type: aspect,
        sprite: scene.add.image(x, y, this.aspectManager.getTextureKey(aspect))
          .setDisplaySize(40, 40)
      };
    });

    // Start drag
    icon.on("pointerdown", () => {
      scene.draggedAspect = {
        type: label,
        sprite: scene.add.rectangle(x, y, 40, 40, 0xaaaaaa)
      };
    });

    // Follow mouse
    scene.input.on("pointermove", (pointer) => {
      if (scene.draggedAspect) {
        scene.draggedAspect.sprite.x = pointer.x;
        scene.draggedAspect.sprite.y = pointer.y;
      }
    });

    // Drop
    scene.input.on("pointerup", () => {
      // if (!scene.draggedAspect) return;

      // scene.board.tryPlaceDragged(scene.draggedAspect);

      // // remove dragging sprite
      // scene.draggedAspect.sprite.destroy();
      // scene.draggedAspect = null;

      if (!scene.draggedAspect) return;

      scene.board.tryPlaceDragged(scene.draggedAspect);

      // destroy drag sprite
      scene.draggedAspect.sprite.destroy();

      scene.draggedAspect = null;
    });

    icon.on("pointerover", () => {
      scene.tooltip.setText(aspect);
      scene.tooltip.setVisible(true);
      scene.tooltip.setText(aspect.charAt(0).toUpperCase() + aspect.slice(1));
      this.highlightRelations(aspect);
    });

    icon.on("pointerout", () => {
      scene.tooltip.setVisible(false);
      this.clearHighlights();
    });
  }

  clearHighlights() {
    this.icons.forEach(entry => {
      entry.glow.setVisible(false);
    });
  }

  highlightRelations(aspect) {
    this.clearHighlights();

    const parents = this.aspectManager.getParents(aspect);
    const children = this.aspectManager.getChildren(aspect);

    children.forEach(c => {
      const entry = this.icons.get(c);
      if (entry) {
        entry.glow.setFillStyle(0x5555ff, 0.3);
        entry.glow.setVisible(true);
      }
    });

    parents.forEach(p => {
      const entry = this.icons.get(p);
      if (entry) {
        entry.glow.setFillStyle(0x11aa11, 0.3);
        entry.glow.setVisible(true);
      }
    });

    const self = this.icons.get(aspect);
    if (self) {
      self.glow.setFillStyle(0xffffff, 0.4);
      self.glow.setVisible(true);
    }
  }

  
  
}