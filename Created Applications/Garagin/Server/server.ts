import { Application } from "./deps.ts";
import { router } from "./Routes/Router.ts";

const app = new Application();
const router = new Router();
const port: number = 8000;

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("fetch", app.fetchEventHandler());
