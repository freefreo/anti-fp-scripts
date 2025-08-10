// anti-fp webgl.js
(function () {
  try {
    const proto = WebGLRenderingContext && WebGLRenderingContext.prototype;
    if (proto) {
      const getParameter = proto.getParameter;
      proto.getParameter = function (p) {
        try {
          const res = getParameter.apply(this, arguments);
          // tamper with UNMASKED_VENDOR_WEBGL and UNMASKED_RENDERER_WEBGL
          if (p === 37445 || p === 37446) {
            if (typeof res === 'string') {
              return res.replace(/\b(GPU|Intel|AMD|NVIDIA)\b/gi, 'Vendor');
            }
            if (Array.isArray(res) && res.length) {
              return res.map(r => String(r).replace(/\b(GPU|Intel|AMD|NVIDIA)\b/gi, 'Vendor'));
            }
          }
          return res;
        } catch (e) { return getParameter.apply(this, arguments); }
      };
    }
  } catch (e) { /* ignore */ }
})();