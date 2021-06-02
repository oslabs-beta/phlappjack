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
  urlEndPointCount: number;
  setURLEndPointCount: (urlEndPointCount: number) => void;
  isContextMenuOpen: boolean;
  setIsContextMenuOpen: (isContextMenuOpen: boolean) => void;
  appConfiguration: AppConfig;
  setAppConfiguration: (appConfiguration: AppConfig) => void;
  routeInputCoordinates: Array<Array<number>>;
  setRouteInputCoordinates: (routeInputCoordinates: Array<Array<number>>) => void;
  routeOutputCoordinates: Array<Array<number>>;
  setRouteOutputCoordinates: (routeInputCoordinates: Array<Array<number>>) => void;
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
  urlEndPointCount,
  setURLEndPointCount,
  isContextMenuOpen,
  setIsContextMenuOpen,
  appConfiguration,
  setAppConfiguration,
  routeInputCoordinates,
  setRouteInputCoordinates,
  routeOutputCoordinates,
  setRouteOutputCoordinates
}: props ) => {

  const displaySymbols = [];

  for (let i = 0; i < draggedElementName.length; i++){
    const elementLeft: number = draggedElementPosition[i][0] + draggedElementTranslation[i][0];
    const elementTop: number = draggedElementPosition[i][1] + draggedElementTranslation[i][1];
    if(i === (draggedElementName.length - 1)){
      displaySymbols.push(
        <div key = {i} style = {{position:'absolute', left:String(elementLeft + 'vw'), top:String(elementTop + 'vh')}}>
          <ContextMenu
            urlEndPointSymbolID = {String('urlEndPointSymbol ' + i)}
            isContextMenuOpen = {isContextMenuOpen}
            setIsContextMenuOpen = {setIsContextMenuOpen}
            appConfiguration = {appConfiguration}
            setAppConfiguration = {setAppConfiguration}
          />
          {draggedElementName[i]}
        </div>
      )
    } else {
      displaySymbols.push(
        <div key = {i} style = {{position:'absolute', left:String(elementLeft + 'vw'), top:String(elementTop + 'vh')}}>
          {draggedElementName[i]}
        </div>
      )
    }
  }

  // const displayRouteLines = [];
  // for(let i = 0; i < routeInputCoordinates.length; i++){
  //   displayRouteLines.push(
  //     <svg x1={String(routeInputCoordinates[i][0])} y1={String(routeInputCoordinates[i][1])} x2={String(routeOutputCoordinates[i][0])} y2={String(routeOutputCoordinates[i][0])} color="black"/>
  //   )
  // }

  return (
    <div>
      {displaySymbols}
      {displayRouteLines}
    </div>
  );
};

export default DisplayGrid;