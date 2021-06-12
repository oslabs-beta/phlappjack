import { React, ReactDOM, ReactRouter } from "../../deps.ts";

type props = {
  definedDBToolbar: number;
  setDefinedDBToolbar: (sideToolBarVW: number) => void;
}

const DefinedDBToolbar = ( {definedDBToolbar,setDefinedDBToolbar}: props ) => {
  return (
    <div style = {{ display:'flex', flexDirection:'column', width:'15vw', alignItems:'center', border:'1px solid' }}>
      DefinedDBToolbar
    </div>
  );
};

export default DefinedDBToolbar;

