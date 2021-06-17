import { Oak, path } from "./deps.ts";

const HOSTNAME = "0.0.0.0";
const PORT = 3000;

const app = new Oak.Application();

// Don't use Deno.cwd(), since that requires access to the root of the directory, and the application
// only really needs read access to the public folder

// Send static content
app.use(async (ctx) => {
  await Oak.send(ctx, ctx.request.url.pathname, {
    hidden: true,
    root: path.fromFileUrl(new URL("../client", import.meta.url)),
    index: "index.html",
  }).catch(async (e) => {
    // If the file is not found, redirect to the React app where a 404 page can be displayed if desired
    if (e instanceof Oak.httpErrors.NotFound) {
      // This was made manually so that I didn't have to use the send methods again
      const imageBuf = await Deno.readFile(
        new URL("../client/index.html", import.meta.url),
      );
      ctx.response.body = imageBuf;
      ctx.response.headers.set("Content-Type", "text/html; charset=utf-8");
    } else {
      throw e;
    }
  });
});

console.log(`Server listening on http://${HOSTNAME}/:${PORT}`);
await app.listen({
  hostname: HOSTNAME,
  port: PORT,
});