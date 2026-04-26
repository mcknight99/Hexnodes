import BootScene from "./scenes/BootScene.js";
import MainScene from "./scenes/MainScene.js";

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 700,
  parent: "game-container",
  scene: [BootScene, MainScene],
  backgroundColor: "#1e1e1e"
};

new Phaser.Game(config);