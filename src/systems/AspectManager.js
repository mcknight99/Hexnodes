export default class AspectManager {
  constructor(scene) {
    this.scene = scene;

    this.recipes = new Map();   // "a+b" → c
    this.reverse = new Map();   // c → [a, b]
    this.graph = new Map();     // aspect → Set(connected aspects)
    this.aspects = new Set();
  }

  loadFromText(text) {
    const lines = text.split("\n");

    lines.forEach(line => {
      line = line.trim();
      if (!line) return;

      const [left, result] = line.split("=");
      const [a, b] = left.split("+").map(s => s.trim());
      const res = result.trim();

      // Store recipes
      this.recipes.set(`${a}+${b}`, res);
      this.recipes.set(`${b}+${a}`, res);

      this.reverse.set(res, [a, b]);

      // Track aspects
      this.aspects.add(a);
      this.aspects.add(b);
      this.aspects.add(res);

      // Build graph connections
      this.addEdge(a, res);
      this.addEdge(b, res);
      this.addEdge(res, a);
      this.addEdge(res, b);
    });
  }

  addEdge(from, to) {
    if (!this.graph.has(from)) {
      this.graph.set(from, new Set());
    }
    this.graph.get(from).add(to);
  }

  combine(a, b) {
    return this.recipes.get(`${a}+${b}`) || null;
  }

  getConnections(aspect) {
    return this.graph.get(aspect) || new Set();
  }

  getTextureKey(aspect) {
    const key = `aspect_${aspect}`;
    return this.scene.textures.exists(key)
      ? key
      : "aspect_unknown";
  }

  getParents(aspect) {
    return this.reverse.get(aspect) || [];
  }

  getChildren(aspect) {
    return this.graph.get(aspect) || new Set();
  }
}