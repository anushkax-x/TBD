import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

const monorepoRoot = path.join(__dirname, "../..");

function readEnvFile(filePath: string): Record<string, string> {
  if (!fs.existsSync(filePath)) return {};
  const values: Record<string, string> = {};
  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    values[key] = value;
  }
  return values;
}

// Next only auto-loads env files inside apps/web. The repo-root .env is
// applied here so NEXT_PUBLIC_* edits are not hidden by apps/web/.env.local.
const rootPublicEnv = Object.fromEntries(
  Object.entries(readEnvFile(path.join(monorepoRoot, ".env"))).filter(([key]) =>
    key.startsWith("NEXT_PUBLIC_"),
  ),
);

for (const [key, value] of Object.entries(rootPublicEnv)) {
  process.env[key] = value;
}

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@consultancy/shared"],
  outputFileTracingRoot: monorepoRoot,
};

export default nextConfig;
