export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    // Step 1: load aspect definitions
    this.load.text("aspectData", "assets/data/aspects.txt");
  }

  create() {
  const text = this.cache.text.get("aspectData");

  if (!text) {
    console.error("Aspect data failed to load!");
    return;
  }

  const aspects = new Set();

  const lines = text.split("\n");

  lines.forEach(line => {
    line = line.trim();
    if (!line) return;

    const [left, result] = line.split("=");
    const [a, b] = left.split("+").map(s => s.trim());
    const res = result.trim();

    aspects.add(a);
    aspects.add(b);
    aspects.add(res);
  });

  aspects.add("unknown");

  aspects.forEach(name => {
    this.load.image(
      `aspect_${name}`,
      `assets/images/aspects/${name}.png`
    );
  });

  console.log("Loading aspects:", [...aspects]);

  this.load.once("complete", () => {
    console.log("Assets loaded, starting MainScene");
    this.scene.start("MainScene");
  });

  this.load.start();
}
}