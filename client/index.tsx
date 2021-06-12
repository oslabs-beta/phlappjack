<<<<<<< HEAD
import { React, render } from "./deps.ts";
import { App } from "./components/App.tsx";

render(
  <App />,
  // @ts-expect-error
  document.getElementById("root"),
);
=======
import { React, ReactDOM, ReactRouter } from "./deps.ts";
import App from './app.tsx';

//@ts-ignore So that we don't have to pull in DOM declarations
ReactDOM.render(<App />, document.getElementById("root"));
>>>>>>> a0ec3fdcac635b29b71614a97c3c06ef7546dd04
