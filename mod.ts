import { Application, send } from "./deps.ts";
import { createBundle } from "./createBundle.ts";

const app = new Application();

// build bundle console messages, single line stdout
const messageBuilding = new TextEncoder().encode("Building Bundle...");
const messageDone = new TextEncoder().encode("Done!\n");

await Deno.writeAll(Deno.stdout, messageBuilding);
// build bundle
await createBundle();
await Deno.writeAll(Deno.stdout, messageDone);

// serve cwd as static files
app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}`,
    index: "index.html",
  });
});

console.log(`Listening on http://localhost:8000`);
await app.listen({ port: 8000 });
