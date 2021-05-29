# phlappjack

## React

React dependencies are now served from Skypack rather than JSPM. This is because
it includes a http header with the correct types.

The bundle can now be built by running
`deno run --allow-write --allow-read --allow-net  --unstable createBundle.ts`

## Deps

Dependencies are stored in `deps.ts`

======= These have now been deprecated, leaving for reference.

React can be run in DENO using JSPM's CDN. The URL is derived from the NPM pkg
name.

React for example:

```
import React from "https://jspm.dev/react";
import { render } from "https://jspm.dev/react-dom";
```

# N.B. This is using the dev CDN but there is a production one we should probably migrate to.

### Build commands for bundle

`deno bundle ./client/index.jsx ./build/bundle.js`

### Command to run local static file server

`deno run --allow-net --allow-read https://deno.land/std@0.97.0/http/file_server.ts`
