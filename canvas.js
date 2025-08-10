// anti-fp canvas.js
(function () {
  try {
    const toDataURL = HTMLCanvasElement.prototype.toDataURL;
    HTMLCanvasElement.prototype.toDataURL = function () {
      try {
        const w = this.width, h = this.height;
        if (w && h) {
          const ctx = this.getContext('2d');
          if (ctx) {
            // introduce tiny noise into canvas pixels
            const img = ctx.getImageData(0, 0, Math.min(100, w), Math.min(100, h));
            for (let i = 0; i < Math.min(10, img.data.length); i += 4) {
              img.data[i] = (img.data[i] + 1) & 255;
            }
            ctx.putImageData(img, 0, 0);
          }
        }
      } catch (e) { /* ignore */ }
      return toDataURL.apply(this, arguments);
    };
    const getImageData = CanvasRenderingContext2D.prototype.getImageData;
    CanvasRenderingContext2D.prototype.getImageData = function () {
      try {
        const img = getImageData.apply(this, arguments);
        for (let i = 0; i < Math.min(10, img.data.length); i += 4) {
          img.data[i] = (img.data[i] + 1) & 255;
        }
        return img;
      } catch (e) { return getImageData.apply(this, arguments); }
    };
  } catch (e) { /* ignore */ }
})();