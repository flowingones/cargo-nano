import { page } from "../page.tsx";

export function autoloadPages(
  routes: Record<string, unknown>,
) {
  return (app: any) => {
    for (const route in routes) {
      /* @ts-ignore */
      const component: any = routes[route];

      app.getProtocol("http")?.router.add({
        path: route,
        method: "GET",
        handler: () => {
          return new Response(page({ component: component.default }), {
            headers: {
              "content-type": "text/html",
            },
          });
        },
      });
    }
  };
}
