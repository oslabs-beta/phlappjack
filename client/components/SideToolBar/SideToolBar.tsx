import { React, ReactDOM, ReactRouter } from "../../deps.ts";

import EndPointSymbol from './EndPointSymbol.tsx';
import ReactComponentSymbol from './ReactComponentSymbol.tsx';
import DatabaseSymbol from './DatabaseSymbol.tsx';
import SaveApplicationButton from './SaveApplicationButton.tsx';
import GenerateApplicationButton from './GenerateApplicationButton.tsx';

//Globaly declare SideToolBar sub-components as React functional components.
declare global {
  namespace JSX {
      interface IntrinsicElements {
        EndPointSymbol: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        ReactComponentSymbol: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        DatabaseSymbol: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        SaveApplicationButton: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        GenerateApplicationButton: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      }
  }
}

//Define prop types.
type props = {
  sideToolBarVW: number;
  setSideToolBarVW: (sideToolBarVW: number) => void;
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

const SideToolBar = ({ 
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
  isContextMenuOpen,
  setIsContextMenuOpen,
  appConfiguration,
  setAppConfiguration
}:props) => {

  return (
    <div style = {{ display:'flex', flexDirection:'column', width: String(sideToolBarVW +'vw'), alignItems:'center', border:'1px solid' }}>
        SideToolBar
        {/*Create EndPoint Drag and Drop selection*/}
        <div>
          <div style = {{ height:'2vw', width: String(sideToolBarVW/4 +'vw'), border:'1px solid', fontSize:'0.75vw', textAlign:'center' }}>
            Create New Endpoint
          </div>
          <div style = {{ display:'flex', flexDirection:'column', height: String(sideToolBarVW/4 +'vw'), width: String(sideToolBarVW/4 +'vw'), border:'1px solid', alignItems:'center'}}>
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
              isContextMenuOpen = {isContextMenuOpen}
              setIsContextMenuOpen = {setIsContextMenuOpen}
              appConfiguration = {appConfiguration}
              setAppConfiguration = {setAppConfiguration}
            />
          </div>
        </div>
        {/*Create React Componenet Drag and Drop selection*/}
        <div>
          <div style = {{ height:'2vw', width: String(sideToolBarVW/4 +'vw'), border:'1px solid', fontSize:'0.75vw', textAlign:'center' }}>
            Create New React Component
          </div>
          <div style = {{ display:'flex', flexDirection:'column', height: String(sideToolBarVW/4 +'vw'), width: String(sideToolBarVW/4 +'vw'), border:'1px solid', alignItems:'center'}}>
            <ReactComponentSymbol sideToolBarVW = {sideToolBarVW} setSideToolBarVW = {setSideToolBarVW}/>
          </div>
        </div>
        {/*Connect a new Database Drag and Drop selection*/}
        <div>
          <div style = {{ height:'2vw', width: String(sideToolBarVW/4 +'vw'), border:'1px solid', fontSize:'0.75vw', textAlign:'center' }}>
            Connect New Database 
          </div>
          <div style = {{ display:'flex', flexDirection:'column', height: String(sideToolBarVW/4 +'vw'), width: String(sideToolBarVW/4 +'vw'), border:'1px solid', alignItems:'center'}}>
            <DatabaseSymbol sideToolBarVW = {sideToolBarVW} setSideToolBarVW = {setSideToolBarVW}/>
          </div>
        </div>
        {/*Save Application Button*/}
        <SaveApplicationButton sideToolBarVW = {sideToolBarVW} setSideToolBarVW = {setSideToolBarVW}/>
        {/*Generate Application Button*/}
        <GenerateApplicationButton sideToolBarVW = {sideToolBarVW} setSideToolBarVW = {setSideToolBarVW}/>
    </div>
  );
};

export default SideToolBar;
