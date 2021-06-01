import { React, ReactDOM, ReactRouter } from "../../deps.ts";

type props = {
  sideToolBarVW: number;
  setSideToolBarVW: (sideToolBarVW: number) => void;
}

const SaveApplicationButton = ({ sideToolBarVW, setSideToolBarVW}:props) => {
  return (
    <div>
      <button>Save Application</button>
    </div>
  );
};

export default SaveApplicationButton;