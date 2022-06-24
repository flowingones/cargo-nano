interface PathMapping {
  path: string;
}

const pathMappings = new Map<string, PathMapping>([
  ["index", { path: "" }],
  ["_404", { path: "*" }],
]);

export function mappedPath(path: string): string {
  console.log(pathMappings.get(path));
  return pathMappings.get(path)?.path ?? path;
}
