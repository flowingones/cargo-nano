import { page } from "../page/mod.ts";
import { Integration, mappedPath } from "../mod.ts";

interface TaskConfig {
  cssIntegration?: Integration;
}

export function autoloadPages(
  routes: Record<string, unknown>,
  config?: TaskConfig,
) {
  return (app: any) => {
    for (const route in routes) {
      /* @ts-ignore */
      const component: any = routes[route];

      app.getProtocol("http")?.router.add({
        path: mappedPath(route),
        method: "GET",
        handler: () => {
          return new Response(
            page({
              component: component.default,
              cssIntegration: config?.cssIntegration,
            }),
            {
              headers: {
                "content-type": "text/html",
              },
            },
          );
        },
      });
    }
  };
}
