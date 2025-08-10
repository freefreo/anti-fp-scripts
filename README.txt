Anti-Fingerprint JS Scripts for Surge
Files:
- canvas.js  : tiny noise to Canvas outputs
- webgl.js   : mask GPU/vendor strings
- audio.js   : tiny noise in AudioBuffer samples
- font.js    : relax font-check responses

How to use:
1. Host these files somewhere reachable by Surge (GitHub raw, gist, or any static hosting).
2. In your Surge config, under [Script] use script-path pointing to raw URLs, for example:
   canvas-fingerprint = type=http-response,pattern=^https?:\/\/.*$,requires-body=1,script-path=https://raw.githubusercontent.com/youruser/yourrepo/main/canvas.js
3. Enable MITM and install Surge CA certificate on your device.
4. Test with non-sensitive sites first. Disable scripts for banking sites if you face issues.

Warnings:
- These scripts introduce minor changes to web APIs; some websites may break.
- Do NOT use these scripts on websites where integrity checks are critical (banking, government) unless you know how to whitelist them.
- Keep the Surge CA certificate secure.