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
