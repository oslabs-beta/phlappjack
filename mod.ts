import { Application, send, Router } from "./deps.ts";
import { createBundle } from "./createBundle.ts";
import gitClone from "./gitfunctions/gitClone.ts"
import gitCommitPush from "./gitfunctions/gitCommitPush.ts"
import { Leaf } from "./deps.ts";

// build bundle console messages, single line stdout
const messageBuilding = new TextEncoder().encode("Building Bundle...");
const messageDone = new TextEncoder().encode("Done!\n");

await Deno.writeAll(Deno.stdout, messageBuilding);
// build bundle
// await createBundle();
await Deno.writeAll(Deno.stdout, messageDone);

const index = Leaf.readTextFileSync("./build/index.html")
const bundle = Leaf.readTextFileSync("./build/bundle.js")

const router = new Router();
router
.get("/", (context) => {
  context.response.body = index;
})
.get("/bundle.js", (context) => {
  context.response.headers.set("Content-Type", "application/javascript; charset=utf-8")
  context.response.body = bundle;
})
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
app.addEventListener("error", (evt) => {
  // Will log the thrown error to the console.
  console.log(evt.error);
});


console.log(`Listening on http://localhost:8000`);
await app.listen({ port: 8000 });
