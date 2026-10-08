const fs = require("fs");
const path = require("path");

const standaloneDir = path.join(__dirname, "../.next/standalone");
const entry = path.join(standaloneDir, "server.js");
const appServer = path.join(standaloneDir, "apps/web/server.js");

if (!fs.existsSync(appServer)) {
  console.error("Expected standalone server at", appServer);
  process.exit(1);
}

if (!fs.existsSync(entry)) {
  fs.writeFileSync(entry, "require('./apps/web/server.js');\n");
}

const appDir = path.join(standaloneDir, "apps/web");
copyInto(path.join(__dirname, "../public"), path.join(appDir, "public"));
copyInto(path.join(__dirname, "../.next/static"), path.join(appDir, ".next/static"));

console.log("Standalone entry ready:", entry);

function copyInto(from, to) {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.cpSync(from, to, { recursive: true });
}
