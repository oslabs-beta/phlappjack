import { React, ReactDOM, ReactRouter } from '../../deps.ts';

const { useRef,useEffect, useState } = React;

type props = {
  urlEndPointSymbolID: string;
  isContextMenuOpen: boolean;
  setIsContextMenuOpen: (isContextMenuOpen: boolean) => void;
  appConfiguration: AppConfig;
  setAppConfiguration: (appConfiguration: AppConfig) => void;
}

const ContextMenu = ({ 
  urlEndPointSymbolID,
  isContextMenuOpen, 
  setIsContextMenuOpen, 
  appConfiguration, 
  setAppConfiguration
}:props) => {

  const [, forceUpdate] = useState<number>(0); 

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
        function handleClickOutside(e: any) {
          if (ref.current && !ref.current.contains(e.target)) {
            const inputElement = document.getElementById('Specify Endpoint') as HTMLInputElement;
            const inputValue = inputElement.value;
            appConfiguration['EndPoints'].push(inputValue);
            setAppConfiguration(appConfiguration);
            setIsContextMenuOpen(false)
            const ele = document.getElementById(urlEndPointSymbolID) as HTMLDivElement;
            ele.innerHTML = inputValue;
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
  }

  const handleKeyPress = (e:any) => {
    if(e.key === 'Enter'){
      const inputElement = document.getElementById('Specify Endpoint') as HTMLInputElement;
      const inputValue = inputElement.value;
      appConfiguration['EndPoints'].push(inputValue);
      setAppConfiguration(appConfiguration);
      setIsContextMenuOpen(false)
      const ele = document.getElementById(urlEndPointSymbolID) as HTMLDivElement;
      ele.innerHTML = inputValue;
    }
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  switch (isContextMenuOpen) {
    case true:
      return (
        <div style = {{border:'1px solid'}} ref = {wrapperRef}>
          <label> Please enter endpoint:</label>
          <input 
            type = 'text'
            id = 'Specify Endpoint'
            onKeyPress = {(e) => handleKeyPress(e)}
          />
        </div>
      )
      break;
    case false:
      return null;
      break;
    default:
      return null;
  }
};

export default ContextMenu;