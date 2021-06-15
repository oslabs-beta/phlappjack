import {
  h,
  jsx,
  serve,
  serveStatic,
  json,
  validateRequest
} from "https://deno.land/x/sift@0.3.2/mod.ts";
import { createClient } from "https://denopkg.com/chiefbiiko/dynamodb/mod.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { render } from "https://x.lcas.dev/preact@10.5.12/ssr.js";
import type { VNode } from "https://x.lcas.dev/preact@10.5.12/mod.d.ts";
import {
  contentType,
  lookup
} from "https://raw.githubusercontent.com/usesift/media_types/34656bf398c81f2687fa5010e56844dac4e7a2e9/mod.ts";
import {
  getusers,
  getAllusers,
  createusers,
  updateusers,
  deleteusers
} from "./Controllers/usersController.ts";
import {
  getusers2,
  getAllusers2,
  createusers2,
  updateusers2,
  deleteusers2
} from "./Controllers/users2Controller.ts";

const app = new Application();
const router = new Router();
const port: number = 8000;
router
  .get("/users", getAllusers)
  .get("/users/:id", getusers)
  .post("/users", createusers)
  .patch("/users/:id", updateusers)
  .delete("users/:id", deleteusers)
  .get("/users2", getAllusers2)
  .get("/users2/:id", getusers2)
  .post("/users2", createusers2)
  .patch("/users2/:id", updateusers2)
  .delete("users2/:id", deleteusers2);

app.addEventListener("fetch", app.fetchEventHandler());
