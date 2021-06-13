import { Application, send, Router } from "./deps.ts";
import { createBundle } from "./createBundle.ts";
import {gitClone} from "./gitfunctions/gitClone.ts"
import {gitCommitPush} from "./gitfunctions/gitCommitPush.ts"
import {bundle} from "./build/bundle.js"

// build bundle console messages, single line stdout
const messageBuilding = new TextEncoder().encode("Building Bundle...");
const messageDone = new TextEncoder().encode("Done!\n");

await Deno.writeAll(Deno.stdout, messageBuilding);
// build bundle
// await createBundle();
await Deno.writeAll(Deno.stdout, messageDone);

const router = new Router();
router
  .get("/export", (context) => {
    console.log("here")
    const write = Deno.writeTextFile("./hello.txt", "Hello World!");
    write.then(() => console.log("File written to ./hello.txt"));
    context.response.body = "Hello world!";

  })
  .get("/gitclone", (context) => {
    gitClone()
    context.response.body = "Cloned repo!";
  })
  .get("/gitpush", (context) => {
    gitCommitPush()
    context.response.body = "Pushed repo!";
  })


const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

// serve cwd as static files
app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}`,
    index: "index.html",
  });
});

console.log(`Listening on http://localhost:8000`);
await app.listen({ port: 8000 });
