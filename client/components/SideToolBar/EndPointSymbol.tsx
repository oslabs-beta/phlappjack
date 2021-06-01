import { React, ReactDOM, ReactRouter } from "../../deps.ts";

const { useEffect } = React;


type props = {
  sideToolBarVW: number;
  setSideToolBarVW: (sideToolBarVW: number) => void;
  isElementBeingDragged: boolean;
  setIsElementBeingDragged: (isElementBeingDragged: boolean) => void;
  draggedElementName: Array<string>;
  setDraggedElementName: (draggedElementName: Array<string>) => void;
  draggedElementPosition: Array<Array<number>>;
  setDraggedElementPosition: (draggedElementPosition: Array<Array<number>>) => void;
  definedDBToolbar: number;
}

const EndPointSymbol = ({ sideToolBarVW, setSideToolBarVW, isElementBeingDragged, setIsElementBeingDragged, draggedElementName, setDraggedElementName, draggedElementPosition, setDraggedElementPosition, definedDBToolbar }:props ) => {

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setIsElementBeingDragged(false);
  }

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const mouseXAsVW = (e.clientX / document.documentElement.clientWidth) * 100
    const mouseYAsVH = (e.clientY / document.documentElement.clientWidth) * 100
    if(mouseXAsVW > sideToolBarVW && mouseXAsVW < (100 - definedDBToolbar)){
      setIsElementBeingDragged(true);
      const dropPosition: Array<number> = [mouseXAsVW,mouseYAsVH];
      draggedElementPosition.push(dropPosition);
      setDraggedElementPosition(draggedElementPosition);
      const draggedElement = (e.target as Element).id;
      draggedElementName.push(`<${draggedElement}/>`);
      setDraggedElementName(draggedElementName);
      alert('This is a context menu')
    }
  }

  return (
    <div id = 'EndPointSymbol' draggable = 'true' onDragStart = {(e) => handleDragStart(e)} onDragEnd = {(e) => handleDragEnd(e)} >
      <div style = {{height:'0.5vw', width:'0.5vw', borderRadius:'50%', border:'1px solid', marginLeft: String(((sideToolBarVW/16) - 0.25) + 'vw')}}/> 
      <div style = {{height:String(sideToolBarVW/8 +'vw'), width: String(sideToolBarVW/8 +'vw'), border:'1px solid'}}/>
      <div style = {{height:'0.5vw', width:'0.5vw', borderRadius:'50%', border:'1px solid', marginLeft: String(((sideToolBarVW/16) - 0.25) + 'vw')}}/> 
    </div>
  );
};

export default EndPointSymbol;