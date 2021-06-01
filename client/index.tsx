import { React, render } from "./deps.ts";
import { App } from "./components/App.tsx";

render(
  <App />,
  // @ts-expect-error
  document.getElementById("root"),
);
