import { React, ReactDOM, ReactRouter } from "../../deps.ts";

const { useState } = React;

import EndPointSymbol  from '../SideToolBar/EndPointSymbol.tsx';
import ContextMenu from './ContextMenu.tsx';

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
  draggedElementTranslation: Array<Array<number>>;
  setdraggedElementTranslation:(draggedElementPosition: Array<Array<number>>) => void;
  isContextMenuOpen: boolean;
  setIsContextMenuOpen: (isContextMenuOpen: boolean) => void;
  appConfiguration: AppConfig;
  setAppConfiguration: (appConfiguration: AppConfig) => void;
}


const DisplayGrid = ({ 
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
  setdraggedElementTranslation,
  isContextMenuOpen,
  setIsContextMenuOpen,
  appConfiguration,
  setAppConfiguration
}: props ) => {

  const displaySymbols = [];

  for (let i = 0; i < draggedElementName.length; i++){
    const elementLeft: number = draggedElementPosition[i][0] + draggedElementTranslation[i][0];
    const elementTop: number = draggedElementPosition[i][1] + draggedElementTranslation[i][1];
    if(i === (draggedElementName.length - 1)){
      displaySymbols.push(
        <div key = {i} style = {{position:'absolute', left:String(elementLeft + 'vw'), top:String(elementTop + 'vh')}}>
          <ContextMenu
            isContextMenuOpen = {isContextMenuOpen}
            setIsContextMenuOpen = {setIsContextMenuOpen}
            appConfiguration = {appConfiguration}
            setAppConfiguration = {setAppConfiguration}
          />
          {appConfiguration['EndPoints'][i]}
          {draggedElementName[i]}
        </div>
      )
    } else {
      displaySymbols.push(
        <div key = {i} style = {{position:'absolute', left:String(elementLeft + 'vw'), top:String(elementTop + 'vh')}}>
          {appConfiguration['EndPoints'][i]}
          {draggedElementName[i]}
        </div>
      )
    }
  }


  return (
    <div>
      {displaySymbols}
    </div>
  );
};

export default DisplayGrid;