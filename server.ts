import { Application, send } from "./deps.ts";

const app = new Application();

app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/examples/static`,
    index: "index.html",
  });
});

await app.listen({ port: 8000 });
