// anti-fp audio.js
(function () {
  try {
    const AudioContextProto = (window.AudioContext || window.webkitAudioContext || {}).prototype;
    if (AudioContextProto) {
      const getChannelData = AudioBuffer.prototype.getChannelData;
      AudioBuffer.prototype.getChannelData = function () {
        try {
          const data = getChannelData.apply(this, arguments);
          // add tiny noise to first few samples
          for (let i = 0; i < Math.min(5, data.length); i++) {
            data[i] = data[i] * 0.999999 + 1e-12;
          }
          return data;
        } catch (e) { return getChannelData.apply(this, arguments); }
      };
    }
  } catch (e) { /* ignore */ }
})();