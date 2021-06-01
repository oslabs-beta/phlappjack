import { React, ReactDOM, ReactRouter } from "./deps.ts";

const { useState } = React;

import SideToolBar from './components/SideToolBar/SideToolBar.tsx';
import MainContainer from './components/MainContainer/MainContainer.tsx';
import DefinedDBToolbar from './components/DefinedDBToolbar/DefinedDBToolbar.tsx';

declare global {
  namespace JSX {
      interface IntrinsicElements {
        SideToolBar: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        MainContainer: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        DefinedDBToolbar: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      }
  }
}


const App = () => {

  const [sideToolBarVW, setSideToolBarVW] = useState<number>(25)
  const [mainContainerVW, setMainContainerVW] = useState<number>(60)
  const [definedDBToolbar, setDefinedDBToolbar] = useState<number>(15)

  const [isElementBeingDragged, setIsElementBeingDragged] = useState<boolean>(false)
  const [draggedElementName, setDraggedElementName] = useState<Array<string>>([])
  const [draggedElementPosition, setDraggedElementPosition] = useState<Array<Array<number>>>([])

  return (
    <div style = {{ display:'flex', flexDirection:'row'}}>
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
      />
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
      />
      <DefinedDBToolbar 
        definedDBToolbar = {definedDBToolbar} 
        setDefinedDBToolbar = {setDefinedDBToolbar}
      />
    </div>
  );
};

export default App;
