// scripts/copy-fonts.js
const fs = require("fs");
const path = require("path");

// Source fonts from node_modules
const sourceDir = path.join(
  __dirname,
  "../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts"
);

// Destination directory in your dist folder
const destDir = path.join(__dirname, "../dist/assets/fonts");

// Ensure destination exists
fs.mkdirSync(destDir, { recursive: true });

// Copy each font file
fs.readdirSync(sourceDir).forEach((file) => {
  if (file.endsWith(".ttf")) {
    fs.copyFileSync(path.join(sourceDir, file), path.join(destDir, file));
    console.log(`✅ Copied font: ${file}`);
  }
});

console.log("🎉 All Expo icon fonts copied to dist/assets/fonts/");
