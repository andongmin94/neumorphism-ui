export const REGISTRY_NAMESPACE = "@neumorphism-ui";

export function getRegistryUrlTemplate(origin = "https://neumorphism-ui.andongmin.com") {
  return `${origin.replace(/\/+$/, "")}/r/{name}.json`;
}

export function getInstallCommand(name: string) {
  return `npx shadcn@latest add ${REGISTRY_NAMESPACE}/${name}`;
}

export function getRegistryAddCommand(origin?: string) {
  return `npx shadcn@latest registry add ${REGISTRY_NAMESPACE}=${getRegistryUrlTemplate(origin)}`;
}

export function getComponentsJsonRegistry(origin?: string) {
  return `{
  "registries": {
    "${REGISTRY_NAMESPACE}": "${getRegistryUrlTemplate(origin)}"
  }
}`;
}
