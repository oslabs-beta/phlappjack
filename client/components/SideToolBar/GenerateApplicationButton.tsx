import { React, ReactDOM, ReactRouter } from "../../deps.ts";

type props = {
  sideToolBarVW: number;
  setSideToolBarVW: (sideToolBarVW: number) => void;
}

const GenerateApplicationButton = ({ sideToolBarVW, setSideToolBarVW}:props ) => {
  return (
    <div>
      <button>Generate Application</button>
    </div>
  );
};

export default GenerateApplicationButton;