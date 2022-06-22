import { getStyleTag, Nano, sheet } from "./deps.ts";

interface PageProps {
  component: any;
  twind?: boolean;
}

export function page(props: PageProps): string {
  /* @ts-ignore */
  sheet.reset();

  const app = Nano.renderSSR(Nano.h(props.component, null, []));
  return html(app);
}

function html(app: string) {
  const { attributes, head, body, footer } = Nano.Helmet.SSR(app);
  return `
  <!DOCTYPE html>
  <html ${attributes.html.toString()}>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${getStyleTag(sheet)}
      ${head.join("\n")}
    </head>
    <body ${attributes.body.toString()}>
      ${body}
      ${footer.join("\n")}
    </body>
  </html>`;
}
