import { React, ReactDOM, ReactRouter } from '../../deps.ts';

const { useRef,useEffect } = React;

type props = {
  isContextMenuOpen: boolean;
  setIsContextMenuOpen: (isContextMenuOpen: boolean) => void;
  appConfiguration: AppConfig;
  setAppConfiguration: (appConfiguration: AppConfig) => void;
}

const ContextMenu = ({ 
  isContextMenuOpen, 
  setIsContextMenuOpen, 
  appConfiguration, 
  setAppConfiguration 
}:props) => {

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
        function handleClickOutside(e: any) {
          if (ref.current && !ref.current.contains(e.target)) {
            setIsContextMenuOpen(false)
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