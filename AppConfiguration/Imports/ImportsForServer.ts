
export const importString: string = `import { h, jsx, serve, serveStatic, json, validateRequest } from "https://deno.land/x/sift@0.3.2/mod.ts";
import { createClient } from "https://denopkg.com/chiefbiiko/dynamodb/mod.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { render } from "https://x.lcas.dev/preact@10.5.12/ssr.js";
import type { VNode } from "https://x.lcas.dev/preact@10.5.12/mod.d.ts";
import {
  contentType,
  lookup,
} from "https://raw.githubusercontent.com/usesift/media_types/34656bf398c81f2687fa5010e56844dac4e7a2e9/mod.ts";`

export const setUp: string = `

const app = new Application();
const router = new Router(); 
const port: number = 8000;
`


export const fetchHandler: string = `
  app.addEventListener("fetch", app.fetchEventHandler())

`