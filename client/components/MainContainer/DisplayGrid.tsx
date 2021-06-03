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

  const displayRouteLines = [];
  for(let i = 0; i < routeInputCoordinates.length; i++){
    if(routeOutputCoordinates[i][0] < routeInputCoordinates[i][0] && routeOutputCoordinates[i][1] < routeInputCoordinates[i][1]){
      const left: number = routeOutputCoordinates[i][0];
      const top: number = routeOutputCoordinates[i][1];
      const height: number = (routeInputCoordinates[i][1] - top) / 2;

      const left_2: number = routeOutputCoordinates[i][0];
      const top_2: number = routeInputCoordinates[i][1] - height;
      const width: number = routeInputCoordinates[i][0] - routeOutputCoordinates[i][0];

      const left_3: number = routeInputCoordinates[i][0];
      const top_3: number = top_2;
      const height_2: number = routeInputCoordinates[i][1] - top_2;

      displayRouteLines.push(
        <div>
          <div style = {{position: 'absolute', left:String(left + 'vw'), top:String(top + 'vh'), height:String(height + 'vh'),border:'1px solid black', backgroundColor:'black'}}/>
          <div style = {{position: 'absolute', left:String(left_2 + 'vw'), top:String(top_2 + 'vh'), width:String(width + 'vw'),border:'1px solid black', backgroundColor: 'black'}}/>
          <div style = {{position: 'absolute', left:String(left_3 + 'vw'), top:String(top_3 + 'vh'), height:String(height_2 + 'vh'),border:'1px solid black', backgroundColor:'black'}}/>
        </div>
      )
    }else if(routeOutputCoordinates[i][0] > routeInputCoordinates[i][0] && routeOutputCoordinates[i][1] < routeInputCoordinates[i][1]){
      const left: number = routeOutputCoordinates[i][0];
      const top: number = routeOutputCoordinates[i][1];
      const height: number = (routeInputCoordinates[i][1] - top) / 2;

      const left_2: number = routeInputCoordinates[i][0];
      const top_2: number = routeInputCoordinates[i][1] - height;
      const width: number = routeOutputCoordinates[i][0] - routeInputCoordinates[i][0];

      const left_3: number = routeInputCoordinates[i][0];
      const top_3: number = top_2;
      const height_2: number = routeInputCoordinates[i][1] - top_2;

      displayRouteLines.push(
        <div>
          <div style = {{position: 'absolute', left:String(left + 'vw'), top:String(top + 'vh'), height:String(height + 'vh'),border:'1px solid black', backgroundColor:'black'}}/>
          <div style = {{position: 'absolute', left:String(left_2 + 'vw'), top:String(top_2 + 'vh'), width:String(width + 'vw'),border:'1px solid black', backgroundColor: 'black'}}/>
          <div style = {{position: 'absolute', left:String(left_3 + 'vw'), top:String(top_3 + 'vh'), height:String(height_2 + 'vh'),border:'1px solid black', backgroundColor:'black'}}/>
        </div>
      )

    }else if(routeOutputCoordinates[i][0] <= routeInputCoordinates[i][0] && routeOutputCoordinates[i][1] > routeInputCoordinates[i][1]){
      const left: number = routeOutputCoordinates[i][0];
      const top: number = routeOutputCoordinates[i][1];
      const height: number = 2.5;

      const left_2: number = routeOutputCoordinates[i][0];
      const top_2: number = routeOutputCoordinates[i][1] + height;
      const width: number = (routeInputCoordinates[i][0] - routeOutputCoordinates[i][0]) / 2;
      
      const left_3: number = routeOutputCoordinates[i][0] + width;
      const top_3: number = routeInputCoordinates[i][1] - 2.5;
      const height_2: number = height * 2 + (routeOutputCoordinates[i][1] - routeInputCoordinates[i][1]);

      const left_4: number = left_3;
      const top_4: number = top_3;
      const width_2: number = width;

      const left_5: number = left_3 + width;
      const top_5: number = top_3;
      const height_3: number = 2.5;

      displayRouteLines.push(
        <div>
          <div style = {{position: 'absolute', left:String(left + 'vw'), top:String(top + 'vh'), height:String(height + 'vh'),border:'1px solid black', backgroundColor:'black'}}/>
          <div style = {{position: 'absolute', left:String(left_2 + 'vw'), top:String(top_2 + 'vh'), width:String(width + 'vw'),border:'1px solid black', backgroundColor: 'black'}}/>
          <div style = {{position: 'absolute', left:String(left_3 + 'vw'), top:String(top_3 + 'vh'), height:String(height_2 + 'vh'),border:'1px solid black', backgroundColor:'black'}}/>
          <div style = {{position: 'absolute', left:String(left_4 + 'vw'), top:String(top_4 + 'vh'), width:String(width_2 + 'vw'),border:'1px solid black', backgroundColor: 'black'}}/>
          <div style = {{position: 'absolute', left:String(left_5 + 'vw'), top:String(top_5 + 'vh'), height:String(height_3 + 'vh'),border:'1px solid black', backgroundColor:'black'}}/>
        </div>
      )

    }else if(routeOutputCoordinates[i][0] > routeInputCoordinates[i][0] && routeOutputCoordinates[i][1] > routeInputCoordinates[i][1]){
      const left: number = routeOutputCoordinates[i][0];
      const top: number = routeOutputCoordinates[i][1];
      const height: number = 2.5;

      const left_2: number = left - (routeOutputCoordinates[i][0] - routeInputCoordinates[i][0]) / 2;
      const top_2: number = routeOutputCoordinates[i][1] + height;
      const width: number = (routeOutputCoordinates[i][0] - routeInputCoordinates[i][0]) / 2;

      const left_3: number = left_2;
      const top_3: number = routeInputCoordinates[i][1] - 2.5;
      const height_2: number = height * 2 + (routeOutputCoordinates[i][1] - routeInputCoordinates[i][1]);

      const left_4: number = routeInputCoordinates[i][0];
      const top_4: number = routeInputCoordinates[i][1] - 2.5;
      const width_2: number = width;

      const left_5: number = left_4;
      const top_5: number = top_4;
      const height_3: number = 2.5;

      displayRouteLines.push(
        <div>
          <div style = {{position: 'absolute', left:String(left + 'vw'), top:String(top + 'vh'), height:String(height + 'vh'),border:'1px solid black', backgroundColor:'black'}}/>
          <div style = {{position: 'absolute', left:String(left_2 + 'vw'), top:String(top_2 + 'vh'), width:String(width + 'vw'),border:'1px solid black', backgroundColor: 'black'}}/>
          <div style = {{position: 'absolute', left:String(left_3 + 'vw'), top:String(top_3 + 'vh'), height:String(height_2 + 'vh'),border:'1px solid black', backgroundColor:'black'}}/>
          <div style = {{position: 'absolute', left:String(left_4 + 'vw'), top:String(top_4 + 'vh'), width:String(width_2 + 'vw'),border:'1px solid black', backgroundColor: 'black'}}/>
          <div style = {{position: 'absolute', left:String(left_5 + 'vw'), top:String(top_5 + 'vh'), height:String(height_3 + 'vh'),border:'1px solid black', backgroundColor:'black'}}/>
        </div>
      )

    }else if(routeOutputCoordinates[i][0] === routeInputCoordinates[i][0] && routeOutputCoordinates[i][1] < routeInputCoordinates[i][1]){
      const left: number = routeOutputCoordinates[i][0];
      const top: number = routeOutputCoordinates[i][1];
      const height: number = routeOutputCoordinates[i][1] - routeInputCoordinates[i][1] ;
      displayRouteLines.push(
        <div>
          <div style = {{position: 'absolute', left:String(left + 'vw'), top:String(top + 'vh'), height:String(height + 'vh'),border:'1px solid black', backgroundColor:'black'}}/>
        </div>
      )

    }
  }

  return (
    <div>
      {displaySymbols}
      {displayRouteLines}
    </div>
  );
};

export default DisplayGrid;