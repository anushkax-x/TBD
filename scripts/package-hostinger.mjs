/**
 * Cross-platform Hostinger zip (Windows / macOS / Linux).
 * Usage: npm run zip
 */
import { existsSync, mkdirSync, unlinkSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out =
  process.env.HOSTINGER_ZIP ||
  join(homedir(), "Downloads", "flowmint-hostinger.zip");

mkdirSync(dirname(out), { recursive: true });
if (existsSync(out)) unlinkSync(out);

function run(cmd, args) {
  return spawnSync(cmd, args, { cwd: root, stdio: "inherit" });
}

if (process.platform !== "win32") {
  const r = run("zip", [
    "-r",
    out,
    ".",
    "-x",
    "*.git/*",
    "*node_modules/*",
    "*.env",
    "*.env.local",
    "*.env.*.local",
    "*apps/web/.next/*",
    "*apps/web/.swc/*",
    "dist/*",
    "*apps/api/dist/*",
    "*packages/shared/dist/*",
    "*coverage/*",
    "*.DS_Store",
    "*tsconfig.tsbuildinfo",
    "flowmint-hostinger.zip",
  ]);
  if (r.status === 0) {
    console.log(`Wrote ${out}`);
    process.exit(0);
  }
  console.error("zip failed; falling back to tar…");
}

const r = run("tar", [
  "-a",
  "-c",
  "-f",
  out,
  "--exclude=.git",
  "--exclude=node_modules",
  "--exclude=.env",
  "--exclude=.env.local",
  "--exclude=apps/web/.next",
  "--exclude=apps/web/.swc",
  "--exclude=apps/api/dist",
  "--exclude=packages/shared/dist",
  "--exclude=dist",
  "--exclude=coverage",
  "--exclude=.DS_Store",
  "--exclude=tsconfig.tsbuildinfo",
  "--exclude=flowmint-hostinger.zip",
  ".",
]);

if (r.status !== 0) {
  console.error("Zip failed. On Windows, `tar` should be available by default.");
  process.exit(r.status ?? 1);
}

const sizeMb = (statSync(out).size / (1024 * 1024)).toFixed(1);
console.log(`Wrote ${out} (${sizeMb} MB)`);
