import { Application } from "./deps.ts";
import { router } from "./Routes/Router.ts";
import { oakCors } from "./deps.ts";

const app = new Application();
const port: number = 8000;

app.use(
  oakCors({
    origin: "http://localhost:3333"
  })
);

app.use(router.routes());
app.use(router.allowedMethods());

// app.addEventListener("fetch", app.fetchEventHandler())
console.log("running on port ", port);
await app.listen({ port: port });
