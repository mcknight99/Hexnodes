import LeftMenu from "../ui/LeftMenu.js";
import RightPanel from "../ui/RightPanel.js";
import HexBoard from "../board/HexBoard.js";
import AspectManager from "../systems/AspectManager.js";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  create() {
    
    console.log("MainScene started");
    
    this.input.mouse.disableContextMenu();

    this.aspectManager = new AspectManager(this);

    const text = this.cache.text.get("aspectData");
    this.aspectManager.loadFromText(text);

    this.draggedAspect = null;

    this.leftMenu = new LeftMenu(this);
    this.rightPanel = new RightPanel(this, this.aspectManager);
    this.board = new HexBoard(this, this.aspectManager);

    this.tooltip = this.add.text(0, 0, "", {
        fontSize: "14px",
        color: "#ffffff",
        backgroundColor: "#000000",
        padding: { x: 4, y: 2 }
      })
      .setDepth(1000)
      .setVisible(false);
    this.input.on("pointermove", (pointer) => {
      if (this.tooltip.visible) {
        this.tooltip.setPosition(pointer.x + 10, pointer.y + 10);
      }
    });



  }

}