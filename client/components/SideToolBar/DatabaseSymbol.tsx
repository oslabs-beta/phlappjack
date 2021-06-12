import { React, ReactDOM, ReactRouter } from "../../deps.ts";

import { FiDatabase } from "../../deps.ts";

const DatabaseImage = FiDatabase;

type props = {
  sideToolBarVW: number;
  setSideToolBarVW: (sideToolBarVW: number) => void;
}

const DatabaseSymbol = ({ sideToolBarVW, setSideToolBarVW}:props ) => {
  return (
    <div draggable = 'true' >
      <DatabaseImage size = {'42'} />
    </div>
  );
};

export default DatabaseSymbol;