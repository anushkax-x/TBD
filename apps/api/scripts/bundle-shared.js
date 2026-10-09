const fs = require("fs");
const path = require("path");

const sharedRoot = path.join(__dirname, "../../../packages/shared");
const sharedEntry = path.join(sharedRoot, "dist/index.js");
const dest = path.join(__dirname, "../dist/node_modules/@consultancy/shared");

if (!fs.existsSync(sharedEntry)) {
  console.error("Missing packages/shared/dist/index.js. Build @consultancy/shared first.");
  process.exit(1);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.cpSync(path.join(sharedRoot, "package.json"), path.join(dest, "package.json"));
fs.cpSync(path.join(sharedRoot, "dist"), path.join(dest, "dist"), { recursive: true });

console.log("Bundled @consultancy/shared into the API dist output");
