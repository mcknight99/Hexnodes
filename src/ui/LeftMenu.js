export default class LeftMenu {
  constructor(scene) {
    this.scene = scene;

    // Panel background
    this.bg = scene.add.rectangle(0, 0, 150, 700, 0x2a2a2a)
      .setOrigin(0);

    // Title
    scene.add.text(20, 20, "Menu", { color: "#ffffff" });

    // Example buttons
    const options = ["All", "Favorites", "Solved", "Daily"];

    options.forEach((label, i) => {
      scene.add.text(20, 60 + i * 30, label, {
        color: "#aaaaaa"
      });
    });
  }
}