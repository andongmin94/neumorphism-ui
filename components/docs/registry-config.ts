export const REGISTRY_NAMESPACE = "@neumorphism-ui";

export const REGISTRY_URL_TEMPLATE =
  "https://neumorphism-ui.dev/r/{name}.json";

export const REGISTRY_ADD_COMMAND =
  `npx shadcn@latest registry add ${REGISTRY_NAMESPACE}=${REGISTRY_URL_TEMPLATE}`;

export function getInstallCommand(name: string) {
  return `npx shadcn@latest add ${REGISTRY_NAMESPACE}/${name}`;
}

export const COMPONENTS_JSON_REGISTRY = `{
  "registries": {
    "${REGISTRY_NAMESPACE}": "${REGISTRY_URL_TEMPLATE}"
  }
}`;
