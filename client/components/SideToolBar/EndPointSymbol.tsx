import { React, ReactDOM, ReactRouter } from "../../deps.ts";

const { useState } = React;

import ContextMenu from '../MainContainer/ContextMenu.tsx';

//Globaly declare App sub-components as React functional components.
declare global{
  namespace JSX {
      interface IntrinsicElements {
        ContextMenu: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      }
  }
}

type props = {
  sideToolBarVW: number;
  setSideToolBarVW: (sideToolBarVW: number) => void;
  isElementBeingDragged: boolean;
  setIsElementBeingDragged: (isElementBeingDragged: boolean) => void;
  draggedElementName: Array<any>;
  setDraggedElementName: (draggedElementName: Array<React.FC>) => void;
  draggedElementPosition: Array<Array<number>>;
  setDraggedElementPosition: (draggedElementPosition: Array<Array<number>>) => void;
  definedDBToolbar: number;
  draggedElementTranslation:Array<Array<number>>;
  setdraggedElementTranslation: (draggedElementPosition: Array<Array<number>>) => void;
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

const EndPointSymbol = ({ 
  sideToolBarVW, 
  setSideToolBarVW, 
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
}:props ) => {

  const handleInputClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const mouseXAsVW: number = (e.clientX / document.documentElement.clientWidth) * 100;
    const mouseYAsVH: number = (e.clientY / document.documentElement.clientHeight) * 100;
    const inputPosition: Array<number> = [mouseXAsVW, mouseYAsVH];
    routeInputCoordinates.push(inputPosition);
    setRouteInputCoordinates(routeInputCoordinates);
  }

  const handleOutPutClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const mouseXAsVW: number = (e.clientX / document.documentElement.clientWidth) * 100;
    const mouseYAsVH: number = (e.clientY / document.documentElement.clientHeight) * 100;
    const outputPosition: Array<number> = [mouseXAsVW, mouseYAsVH]
    routeOutputCoordinates.push(outputPosition);
    setRouteOutputCoordinates(routeOutputCoordinates);
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const { top, left } = (e.target as Element).getBoundingClientRect();
    const mouseXAsVW: number = (e.clientX / document.documentElement.clientWidth) * 100;
    const mouseYAsVH: number = (e.clientY / document.documentElement.clientHeight) * 100;
    const topAsVH: number = (top / document.documentElement.clientHeight) * 100;
    const leftAsVW: number = (left / document.documentElement.clientWidth) * 100;
    const topTranslation: number = topAsVH - mouseYAsVH;
    const leftTranslation: number = leftAsVW - mouseXAsVW;
    const elementTranslation: Array<number> = [leftTranslation,topTranslation];
    draggedElementTranslation.push(elementTranslation);
    setdraggedElementTranslation(draggedElementTranslation);
    setIsElementBeingDragged(false);
  }

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const mouseXAsVW: number = (e.clientX / document.documentElement.clientWidth) * 100
    const mouseYAsVH: number = (e.clientY / document.documentElement.clientHeight) * 100
    if(mouseXAsVW > sideToolBarVW && mouseXAsVW < (100 - definedDBToolbar)){
      setIsElementBeingDragged(true);
      const dropPosition: Array<number> = [mouseXAsVW,mouseYAsVH];
      draggedElementPosition.push(dropPosition);
      setDraggedElementPosition(draggedElementPosition);
      const draggedElement = (e.target as Element).id;
      setIsContextMenuOpen(true)
      const newURLEndPointCount = urlEndPointCount + 1;
      setURLEndPointCount(newURLEndPointCount);
      draggedElementName.push(
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
          draggedElementTranslation = {draggedElementTranslation}
          setdraggedElementTranslation = {setdraggedElementTranslation}
          urlEndPointCount = {urlEndPointCount}
          setURLEndPointCount = {setURLEndPointCount}
          isContextMenuOpen = {isContextMenuOpen}
          setIsContextMenuOpen = {setIsContextMenuOpen}
          appConfiguration = {appConfiguration}
          setAppConfiguration = {setAppConfiguration}
          routeInputCoordinates = {routeInputCoordinates}
          setRouteInputCoordinates = {setRouteInputCoordinates}
          routeOutputCoordinates = {routeOutputCoordinates}
          setRouteOutputCoordinates = {setRouteOutputCoordinates}
        />
      );
      setDraggedElementName(draggedElementName);
    }
  }

  const onRender = () => {
    if(appConfiguration['EndPoints'][urlEndPointCount]) return String(appConfiguration['EndPoints'][urlEndPointCount]) 
    else return '';
  }

  return (
    <div draggable = 'true' onDragStart = {(e) => handleDragStart(e)} onDragEnd = {(e) => handleDragEnd(e)}>
      <div style = {{display:'flex', height:'0.5vw', width:'0.5vw', borderRadius:'50%', border:'1px solid', marginLeft: String(((sideToolBarVW/16) - 0.25) + 'vw')}} onClick={(e) => handleInputClick(e)}/>
      <div id = {String('urlEndPointSymbol ' + urlEndPointCount)} style = {{height:String(sideToolBarVW/8 +'vw'), width: String(sideToolBarVW/8 +'vw'), border:'1px solid', textDecoration:'underline'}}>
        {onRender()}
      </div>
      <div style = {{display:'flex', height:'0.5vw', width:'0.5vw', borderRadius:'50%', border:'1px solid', marginLeft: String(((sideToolBarVW/16) - 0.25) + 'vw')}} onClick={(e) => handleOutPutClick(e)}/> 
    </div>
  );
};

export default EndPointSymbol;