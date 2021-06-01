import { React, ReactDOM, ReactRouter } from "../../deps.ts";

const { useEffect } = React;


type props = {
  isContextMenuOpen: boolean;
  setIsContextMenuOpen: (isContextMenuOpen: boolean) => void;
}

const ContextMenu = ({ isContextMenuOpen, setIsContextMenuOpen }:props) => {

  return (
    <div style = {{border:'1px solid'}}>
      This is a context menu!
    </div>
  );
};

export default ContextMenu;