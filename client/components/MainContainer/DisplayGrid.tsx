import { React, ReactDOM, ReactRouter } from "../../deps.ts";

import EndPointSymbol  from '../SideToolBar/EndPointSymbol.tsx';

type props = {
  sideToolBarVW: number;
  setSideToolBarVW: (sideToolBarVW: number) => void;
  mainContainerVW: number;
  setMainContainerVW: (sideToolBarVW: number) => void;
  isElementBeingDragged: boolean;
  setIsElementBeingDragged: (isElementBeingDragged: boolean) => void;
  draggedElementName: Array<string>;
  setDraggedElementName: (draggedElementName: Array<string>) => void;
  draggedElementPosition: Array<Array<number>>;
  setDraggedElementPosition: (draggedElementPosition: Array<Array<number>>) => void;
  definedDBToolbar: number;
}


const DisplayGrid = ({ sideToolBarVW, setSideToolBarVW, mainContainerVW, setMainContainerVW, isElementBeingDragged, setIsElementBeingDragged, draggedElementName, setDraggedElementName, draggedElementPosition, setDraggedElementPosition, definedDBToolbar }: props ) => {

  const displaySymbols = [];
  console.log(draggedElementName.length)
  for (let i = 0; i < draggedElementName.length; i++){
    displaySymbols.push(
      <div key = {i} style = {{position:'absolute', left:String(draggedElementPosition[i][0] + 'vw'), top:String(draggedElementPosition[i][1] + 'vh')}}>
        <EndPointSymbol
          sideToolBarVW = {sideToolBarVW}  
          setSideToolBarVW = {setSideToolBarVW}
          isElementBeingDragged = {isElementBeingDragged}
          setIsElementBeingDragged = {setIsElementBeingDragged}
          draggedElementName = {draggedElementName}
          setDraggedElementName = {setDraggedElementName}
          draggedElementPosition = {draggedElementPosition}
          setDraggedElementPosition = {setDraggedElementPosition}
          definedDBToolbar = {definedDBToolbar}
        />
      </div>
    )
  }

  return (
    <div>
      {displaySymbols}
    </div>
  );
};

export default DisplayGrid;