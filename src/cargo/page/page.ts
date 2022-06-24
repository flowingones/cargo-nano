import { h, Helmet, renderSSR } from "./deps.ts";

import type { Integration } from "../integration.ts";

interface PageProps {
  component: any;
  cssIntegration?: Integration;
}

export function page(props: PageProps): string {
  const app = renderSSR(h(props.component, null, []));
  return html(app, props);
}

function html(app: string, props: PageProps) {
  const { attributes, head, body, footer } = Helmet.SSR(app);
  return `
  <!DOCTYPE html>
  <html ${attributes.html.toString()}>
    <head>
      ${props.cssIntegration?.getStyles()}
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${head.join("\n")}
    </head>
    <body ${attributes.body.toString()}>
      ${body}
      ${footer.join("\n")}
    </body>
  </html>`;
}
