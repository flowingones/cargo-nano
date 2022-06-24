interface PathMapping {
  path: string;
}

const pathMappings = new Map<string, PathMapping>([
  ["index", { path: "" }],
  ["_404", { path: "*" }],
]);

export function mappedPath(path: string): string {
  return pathMappings.get(path)?.path || path;
}
