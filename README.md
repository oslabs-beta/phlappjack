# phlappjack

## How to run the server

`deno run --unstable --allow-read --allow-write --allow-net server.ts`

Optionally run with the `--watch` flag for file reloading.

This will serve the static react content and watch for file changes.

## React

React dependencies are now served from Skypack rather than JSPM. This is because
it includes a http header with the correct types.

The bundle is automatically built when running the server.ts file. It can also
be built using:

`deno run --allow-write --allow-read --allow-net  --unstable createBundle.ts`

## Dependencies

Dependencies are stored in `deps.ts`

Server deps and client deps need to be split to prevent Deno modules from being
bundles in with the front end code. This will likely need seperate front-end and
back-end deps.ts files. For the time being server related deps should be
imported in their own file.

## Oak Server

The backend is running Oak and serving static files from the build directory.

### Server log messages

In order to display the messages on the same line in stdout `Deno.writeAll()`
has been used.

```js
// build bundle console messages, single line stdout
const messageBuilding = new TextEncoder().encode("Building Bundle...");
const messageDone = new TextEncoder().encode("Done!\n");

await Deno.writeAll(Deno.stdout, messageBuilding);
// build bundle
await createBundle();
await Deno.writeAll(Deno.stdout, messageDone);
```
