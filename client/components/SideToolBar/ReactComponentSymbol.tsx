import { React, ReactDOM, ReactRouter } from "../../deps.ts";
import { FaReact } from "../../deps.ts";

const ReactSymbol = FaReact;

type props = {
  sideToolBarVW: number;
  setSideToolBarVW: (sideToolBarVW: number) => void;
}

const ReactComponentSymbol = ({ sideToolBarVW,setSideToolBarVW }: props) => {
  return (
    <div draggable = 'true' style = {{color:'#ADD8E6'}}>
      <ReactSymbol size = {'42'}/>
    </div>
  );
};

export default ReactComponentSymbol;