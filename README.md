# phlappjack

[![Leaf CI](https://github.com/mandarineorg/leaf/workflows/Unit%20Tests/badge.svg)](https://github.com/mandarineorg/leaf)

![image](./assets/logo.svg)

![image](assets/PHlappstack.gif)

## Front end dev (Node)
run 
`npm install`
`npm run dev`

The Dev repository for the node version of the application has now been merged here.

## How to run the server

`deno run --unstable --allow-read --allow-write --allow-net server.ts`

Optionally run with the `--watch` flag for file reloading.

This will serve the static react content and watch for file changes.

## Docker and Compose

You can run the deployment using `docker-compose up` **BUT** you need to build
the phlappjack react image first using `docker build -t phlappjack .`

## Mongo

There is now a .env file to support connecting to Mongo. Please add a .env file
to the root of the repo and populate the fields, e.g:

MONGO_HOST=cluster0.yybae.mongodb.net MONGO_DB=phlappjack MONGO_USER=dbUser
MONGO_PASS=secret123

The connection uri is already set up in `server/models/`

## React

React dependencies are now served from Skypack rather than JSPM. This is because
it includes a http header with the correct types.

The bundle is automatically built when running the `mod.ts` file. It can also be
built using:

`deno run --allow-write --allow-read --allow-net  --unstable createBundle.ts`

## Compiling executables

The `createBundle()` must be disabled in `mod.ts` before running this command!

`deno compile --unstable --prompt mod.ts`

This will prompt the user for the permissions required at execution time.

## Dependencies

Server Dependencies are stored in `deps.ts`

Client Dependencies are stored in `client/deps.ts`

This is required to keep server dependencies out of the client bundle and allow
React to work.

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
