import { parse } from "./deps.ts";

interface PathMapping {
  path: string;
}

const pathMappings = new Map<string, PathMapping>([
  ["/index", { path: "/" }],
  ["/_404", { path: "/*" }],
]);

export function mappedPath(path: string): string {
  const parsedPath = parse(path);
  const mappedPath = pathMappings.get(`/${parsedPath.name}`);

  if (mappedPath) {
    return `${parsedPath.dir.replace(/\/$/, "")}${mappedPath}`;
  }

  return path;
}
