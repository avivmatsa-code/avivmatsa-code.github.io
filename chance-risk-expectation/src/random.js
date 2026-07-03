export class RandomEngine {
  constructor(seed = null) {
    this.setSeed(seed);
  }

  setSeed(seed = null) {
    this.seed = seed;
    this.state = seed == null ? null : this.hashSeed(String(seed));
  }

  hashSeed(text) {
    let h = 2166136261;
    for (let i = 0; i < text.length; i += 1) {
      h ^= text.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  next() {
    if (this.state == null) return Math.random();
    let t = this.state += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  int(maxExclusive) {
    return Math.floor(this.next() * maxExclusive);
  }
}
