const message: string = "hello world";
console.log(message);

// import React, { useState } from "https://jspm.dev/react";
// import ReactDOM from "https://jspm.dev/react-dom";
import { serve } from "https://deno.land/std/http/server.ts";
import { serveFile } from "https://deno.land/std/http/file_server.ts";


const PORT = 3000;
const HOSTNAME = "0.0.0.0";

const server = serve({ port: PORT, hostname: HOSTNAME });

for await (const req of server) {
    const html = await serveFile(req, 'index.html')
    req.respond(html)
}




// function App() {
//     const [thing, setThing] = useState(0);
//     return (
//         <div>some</div>
//     )
// }

// ReactDOM.render(<App />, root)Pdeno