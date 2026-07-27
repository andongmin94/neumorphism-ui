import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const registryRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const workspaceRoot = path.dirname(registryRoot);
const sourceDir = path.join(registryRoot, "public", "r");
const docsPublicRoot = path.join(workspaceRoot, "docs", "public");
const targetDir = path.join(docsPublicRoot, "r");

function assertManagedPath(root, candidate, label) {
  const resolvedRoot = path.resolve(root);
  const resolvedCandidate = path.resolve(candidate);
  const relative = path.relative(resolvedRoot, resolvedCandidate);

  if (
    relative === "" ||
    relative.startsWith("..") ||
    path.isAbsolute(relative)
  ) {
    throw new Error(`${label} must stay below ${resolvedRoot}: ${resolvedCandidate}`);
  }
}

if (!fs.existsSync(sourceDir)) {
  throw new Error(`Registry output does not exist: ${sourceDir}`);
}

if (!fs.existsSync(docsPublicRoot)) {
  throw new Error(`Docs public directory does not exist: ${docsPublicRoot}`);
}

assertManagedPath(registryRoot, sourceDir, "Registry source");
assertManagedPath(docsPublicRoot, targetDir, "Docs Registry target");

fs.rmSync(targetDir, { force: true, recursive: true });
fs.cpSync(sourceDir, targetDir, { recursive: true });

console.log(`Synced Registry JSON to ${targetDir}`);
