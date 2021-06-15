import { Application } from "./deps.ts";
import { router } from "./Routes/router.ts";

const app = new Application();
const port: number = 8000;

app.use(router.routes());
app.use(router.allowedMethods());

// app.addEventListener("fetch", app.fetchEventHandler())
console.log("running on port ", port);
await app.listen({ port: port });
