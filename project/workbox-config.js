module.exports = {
  "globDirectory": "./",
  "globPatterns": [
    "img/**.*",
    "offline.html",
    "icons/**.*",
    "shell.html",
    "js/app.js"
  ],
  "swSrc": "src/sw.js",
  "swDest": "sw.js",
  "globIgnores": [
    "./workbox-config.js"
  ]
};