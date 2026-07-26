import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const workspaceRoot = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));
export const registryPath = path.join(workspaceRoot, "registry", "registry.json");

const allowedItemTypes = new Set([
  "registry:base",
  "registry:block",
  "registry:component",
  "registry:hook",
  "registry:lib",
  "registry:page",
  "registry:style",
  "registry:theme",
  "registry:ui",
]);

const allowedFileTypes = new Set([
  "registry:component",
  "registry:hook",
  "registry:lib",
  "registry:page",
  "registry:style",
  "registry:ui",
]);

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function resolveSourcePath(relativePath) {
  const sourcePath = path.resolve(workspaceRoot, relativePath);
  const relative = path.relative(workspaceRoot, sourcePath);

  assert(
    relative.startsWith(`registry${path.sep}`) &&
      !relative.startsWith("..") &&
      !path.isAbsolute(relative),
    `File path must stay under the registry directory: ${relativePath}`,
  );

  return sourcePath;
}

export function readRegistry() {
  return JSON.parse(fs.readFileSync(registryPath, "utf8"));
}

export function validateRegistry(registry) {
  const errors = [];

  try {
    assert(isPlainObject(registry), "Registry must be an object.");
    assert(
      registry.$schema === "https://ui.shadcn.com/schema/registry.json",
      "Registry must use the official shadcn registry schema URL.",
    );
    assert(registry.name === "neumorphism-ui", 'Registry name must be "neumorphism-ui".');
    assert(registry.author === "Neumorphism UI", 'Registry author must be "Neumorphism UI".');
    assert(typeof registry.homepage === "string", "Registry homepage is required.");
    assert(Array.isArray(registry.items), "Registry items must be an array.");

    const itemNames = new Set();

    for (const [index, item] of registry.items.entries()) {
      const label = `items[${index}]`;

      assert(isPlainObject(item), `${label} must be an object.`);
      assert(
        typeof item.name === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.name),
        `${label}.name must be a kebab-case registry name.`,
      );
      assert(!itemNames.has(item.name), `Duplicate registry item name: ${item.name}`);
      itemNames.add(item.name);
      assert(allowedItemTypes.has(item.type), `${item.name} has unsupported type: ${item.type}`);

      if (item.registryDependencies !== undefined) {
        assert(
          Array.isArray(item.registryDependencies),
          `${item.name}.registryDependencies must be an array.`,
        );

        for (const dependency of item.registryDependencies) {
          assert(
            typeof dependency === "string" &&
              (dependency.startsWith("@neumorphism-ui/") ||
                dependency.startsWith("https://") ||
                dependency.startsWith("http://")),
            `${item.name} has invalid registry dependency: ${String(dependency)}`,
          );
        }
      }

      if (item.files !== undefined) {
        assert(Array.isArray(item.files), `${item.name}.files must be an array.`);

        for (const file of item.files) {
          assert(isPlainObject(file), `${item.name} contains an invalid file entry.`);
          assert(typeof file.path === "string", `${item.name} contains a file without a path.`);
          assert(
            allowedFileTypes.has(file.type),
            `${item.name}/${file.path} has unsupported file type: ${file.type}`,
          );

          const sourcePath = resolveSourcePath(file.path);
          assert(fs.existsSync(sourcePath), `${item.name} source file not found: ${file.path}`);
          assert(fs.statSync(sourcePath).isFile(), `${item.name} source is not a file: ${file.path}`);
        }
      }
    }

    assert(itemNames.has("neumorphism-ui"), "The registry:base item is missing.");
    assert(
      registry.items.find((item) => item.name === "neumorphism-ui")?.type === "registry:base",
      'The "neumorphism-ui" item must be registry:base.',
    );

    for (const coreName of ["button", "card", "input", "badge", "skeleton", "tooltip"]) {
      const coreItem = registry.items.find((item) => item.name === coreName);
      assert(coreItem?.type === "registry:ui", `Core registry:ui item is missing: ${coreName}`);
      assert(
        coreItem.registryDependencies?.includes("@neumorphism-ui/neumorphism-ui"),
        `${coreName} must depend on @neumorphism-ui/neumorphism-ui.`,
      );
    }

    for (const item of registry.items) {
      for (const dependency of item.registryDependencies ?? []) {
        if (!dependency.startsWith("@neumorphism-ui/")) continue;
        const dependencyName = dependency.slice("@neumorphism-ui/".length);
        assert(
          itemNames.has(dependencyName),
          `${item.name} references missing registry item: ${dependency}`,
        );
        assert(dependencyName !== item.name, `${item.name} cannot depend on itself.`);
      }
    }
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }

  return errors;
}
