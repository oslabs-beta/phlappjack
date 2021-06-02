import { React, ReactDOM, ReactRouter } from "./deps.ts";

const { useState } = React;

import SideToolBar from './components/SideToolBar/SideToolBar.tsx';
import MainContainer from './components/MainContainer/MainContainer.tsx';
import DefinedDBToolbar from './components/DefinedDBToolbar/DefinedDBToolbar.tsx';

//Globaly declare App sub-components as React functional components.
declare global{
  namespace JSX {
      interface IntrinsicElements {
        App: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        SideToolBar: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        MainContainer: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        DefinedDBToolbar: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      }
  }
  //Interface to define AppConfiguration object type.
  interface AppConfig{
    EndPoints: Array<string>;
    DataBases: Array<string>;
  }

}

const App = () => {
  //Create state of viewport widths. Allows viewport widths to be modified in one place
  //as opposed to having to modify div dimension in each respective component.
  const [sideToolBarVW, setSideToolBarVW] = useState<number>(25)
  const [mainContainerVW, setMainContainerVW] = useState<number>(60)
  const [definedDBToolbar, setDefinedDBToolbar] = useState<number>(15)
  //Create state that determines if an element is being dragged.
  const [isElementBeingDragged, setIsElementBeingDragged] = useState<boolean>(false)
  //Create state that retains a list of all component names that have been dragged.
  const [draggedElementName, setDraggedElementName] = useState<Array<any>>([])
  //Create state that retains an array of all droppped locations for components. 
  const [draggedElementPosition, setDraggedElementPosition] = useState<Array<Array<number>>>([])
  //Create state that retains an array of how much an item must be tanslated for their respective
  //drop position. (User will not always grab the element at the top left corner) 
  const [draggedElementTranslation, setdraggedElementTranslation] = useState<Array<Array<number>>>([])
  //Create state to refer to specific 'URL EndPoint' elements.
  const [urlEndPointCount, setURLEndPointCount] = useState<number>(0)
  //Create state to display create new endpoint context menu.
  const [ isContextMenuOpen, setIsContextMenuOpen ] = useState<boolean>(true);
  //Create state to allow app configuration to persist.
  const [ appConfiguration, setAppConfiguration ] = useState<AppConfig>({
    "EndPoints":[],
    "DataBases":[]
  });
  //Create state to track 'Route Line' output pixel coordinates.
  const [ routeInputCoordinates, setRouteInputCoordinates ] = useState<Array<Array<number>>>([]);
  //Create state to track 'Route Line' output pixel coordinates.
  const [ routeOutputCoordinates, setRouteOutputCoordinates ] = useState<Array<Array<number>>>([]);

  return (
    <div style = {{ display:'flex', flexDirection:'row'}}>
      {/*Side tool bar component*/}
      <SideToolBar 
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
      {/*Main container component*/}
      <MainContainer
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
      {/*Defined db tool bar component*/}
      <DefinedDBToolbar 
        definedDBToolbar = {definedDBToolbar} 
        setDefinedDBToolbar = {setDefinedDBToolbar}
      />
    </div>
  );
};

export default App;
