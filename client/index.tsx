import { React, ReactDOM, ReactRouter } from "./deps.ts";
import App from './app.tsx';

//@ts-ignore So that we don't have to pull in DOM declarations
ReactDOM.render(<App />, document.getElementById("root"));