// anti-fp font.js
(function () {
  try {
    const original = document.fonts && document.fonts.check;
    if (original) {
      document.fonts.check = function () {
        try {
          // always return true for a few common queries to mask missing fonts
          const res = original.apply(this, arguments);
          if (!res) return true;
          return res;
        } catch (e) { return original.apply(this, arguments); }
      };
    }
    // also override CSSFontFaceRule to hide available fonts list attempts
    if (window.CSS && window.CSSFontFaceRule) {
      const orig = window.CSSFontFaceRule;
      window.CSSFontFaceRule = function () { return orig.apply(this, arguments); };
    }
  } catch (e) { /* ignore */ }
})();