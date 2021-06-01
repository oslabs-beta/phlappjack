import { React, ReactDOM, ReactRouter } from "../../deps.ts";

import DisplayGrid from './DisplayGrid.tsx';

declare global {
  namespace JSX {
      interface IntrinsicElements {
        DisplayGrid: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      }
  }
}

type props = {
  sideToolBarVW: number;
  setSideToolBarVW: (sideToolBarVW: number) => void;
  mainContainerVW: number;
  setMainContainerVW: (sideToolBarVW: number) => void;
  isElementBeingDragged: boolean;
  setIsElementBeingDragged: (isElementBeingDragged: boolean) => void;
  draggedElementName: Array<any>;
  setDraggedElementName: (draggedElementName: Array<any>) => void;
  draggedElementPosition: Array<Array<number>>;
  setDraggedElementPosition: (draggedElementPosition: Array<Array<number>>) => void;
  definedDBToolbar: number;
  draggedElementTranslation:Array<Array<number>>;
  setdraggedElementTranslation: (draggedElementPosition: Array<Array<number>>) => void;
}

const MainContainer = ({ 
  sideToolBarVW, 
  setSideToolBarVW, 
  mainContainerVW, 
  setMainContainerVW, 
  isElementBeingDragged, 
  setIsElementBeingDragged, 
  draggedElementName, 
  setDraggedElementName, 
  draggedElementPosition, 
  setDraggedElementPosition, 
  definedDBToolbar,
  draggedElementTranslation,
  setdraggedElementTranslation
}: props ) => {
  
  return (
      <div style = {{width: String(mainContainerVW + 'vw'), border:'solid', textAlign:'center' }}>
        MainContainer
        <DisplayGrid
          sideToolBarVW = {sideToolBarVW}
          setSideToolBarVW = {setSideToolBarVW}
          mainContainerVW = {mainContainerVW} 
          setMainContainerVW = {setMainContainerVW}
          isElementBeingDragged = {isElementBeingDragged}
          setIsElementBeingDragged = {setIsElementBeingDragged}
          draggedElementName = {draggedElementName}
          setDraggedElementName = {setDraggedElementName}
          draggedElementPosition = {draggedElementPosition}
          setDraggedElementPosition = {setDraggedElementPosition}
          definedDBToolbar = {definedDBToolbar}
          draggedElementTranslation = {draggedElementTranslation}
          setdraggedElementTranslation = {setdraggedElementTranslation}
        />
      </div>
  ); 
};

export default MainContainer;
