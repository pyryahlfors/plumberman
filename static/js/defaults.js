//  Defaults
const pixelRatio = (window.devicePixelRatio) ? Math.floor(window.devicePixelRatio) : 1;
const enemies = [];
const blockWidth = 32;
const blockHeight = 32;
const debug = !!document.location.search;

export { pixelRatio, enemies, blockWidth, blockHeight, debug }
