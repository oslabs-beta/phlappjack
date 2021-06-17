import { Application, send, Router } from "./deps.ts";
import { createBundle } from "./createBundle.ts";
import gitClone from "./gitfunctions/gitClone.ts"
import gitCommitPush from "./gitfunctions/gitCommitPush.ts"
import { Leaf } from "./deps.ts";
import { configureApplication } from "./AppConfiguration/appConfigurator.ts"
import openChrome from "./openChrome.ts"

// build bundle console messages, single line stdout
const messageBuilding = new TextEncoder().encode("Building Bundle...");
const messageDone = new TextEncoder().encode("Done!\n");

await Deno.writeAll(Deno.stdout, messageBuilding);
// build bundle
// await createBundle();
await Deno.writeAll(Deno.stdout, messageDone);

const index = Leaf.readTextFileSync("./build/index.html")
const bundle = Leaf.readTextFileSync("./build/bundle.js")
const logo = Leaf.readTextFileSync("./build/logo.svg")

//open chrome 
openChrome(Deno.build.os)

const router = new Router();
router
.get("/", (context) => {
  context.response.body = index;
})
.get("/bundle.js", (context) => {
  context.response.headers.set("Content-Type", "application/javascript; charset=utf-8")
  context.response.body = bundle;
})
.get("/logo.svg", (context) => {
  context.response.headers.set("Content-Type", "image/svg+xml")
  context.response.body = logo;
})
  .post("/export", async (context) => {
    const response = await context.request.body();
    const props = await response.value;
    const dir = './Created Applications';
    const { newApplication, atlasHostCluster, atlasUserName, atlasPassword, atlasDB, dbInputDisplay, dockerFile, dockerCompose, routes } = props;
    configureApplication(dir, newApplication, atlasHostCluster, atlasUserName, atlasPassword, atlasDB, dbInputDisplay, dockerFile, dockerCompose, routes);
  })
  .post("/gitclone/:app", async (context) => {
    const dir = '/Created Applications';
    const appDirectory = `${dir}/${context.params.app}`
    console.log(appDirectory)
    const request = context.request.body()
    const repoUrl = await request.value
    console.log(repoUrl)
    gitClone(appDirectory, repoUrl)
    context.response.body = "Cloned repo!";
  })
  .post("/gitpush/:app", async (context) => {
    const dir = './Created Applications';
    const appDirectory = `${dir}/${context.params.app}`
    const request = context.request.body()
    const repoUrl = await request.value
    gitCommitPush(appDirectory, repoUrl)
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
