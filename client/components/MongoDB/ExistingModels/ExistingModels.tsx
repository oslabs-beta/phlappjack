import * as React from 'react'
const { useState, useEffect } = React;

import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import ExistingModelsDisplay from './ExistingModelsDisplay'
import DBNameInput from './DBNameInput';

export default function ExistingModels(props){

  const [childKey0, setChildKey0 ] = useState(0);

  const handleClick = (e) =>{
    const inputFieldEle = (document.getElementById("Specifiy DB Input field")) as HTMLInputElement;
    props.setDBBeingModified(inputFieldEle.value)
    if (!props.dbInputDisplay[inputFieldEle.value]){
      const newDBInputDisplay = props.dbInputDisplay;
      newDBInputDisplay[inputFieldEle.value] = [];
      props.setDBInputDisplay(newDBInputDisplay);
      
      const newEndPoint: string = String('/' + inputFieldEle.value);
      const newEndPoints = props.endPoints;
      newEndPoints[newEndPoint] = [];
      props.setEndPoints(newEndPoints);

      const newDBToggleState = new Array(Object.keys(props.dbInputDisplay).length).fill(true).map((item, idx) => true);
      props.setDBToggles(newDBToggleState);
    }
    inputFieldEle.value = '';
  }

  return (
    <div style = {{display:'flex', flexDirection:'column', marginTop:'5vh'}}>
      <Paper style = {{height:'55vh', width:'25vw'}}>
      <div style = {{ marginTop:'2.5vh', textAlign:'center', fontSize:'2.5vh'}}>
        Existing Models
      </div>
        <ExistingModelsDisplay
          childKey0 = {childKey0}
          setChildKey0 = {setChildKey0}
          dbBeingModified = {props.dbBeingModified}
          setDBBeingModified = {props.setDBBeingModified}
          dbInputDisplay = {props.dbInputDisplay}
          setDBInputDisplay = {props.setDBInputDisplay}
          endPoints = {props.endPoints}
          setEndPoints = {props.setEndPoints}
          dbToggles = {props.dbToggles}
          setDBToggles = {props.setDBToggles}
          editDBTextFieldValue = {props.editDBTextFieldValue}
          setEditDBTextFieldValue = {props.setEditDBTextFieldValue}
          routes = {props.routes}
          setRoutes = {props.setRoutes}
        />
        <DBNameInput
          dbBeingModified = {props.dbBeingModified}
          setDBBeingModified = {props.setDBBeingModified}
          dbInputDisplay = {props.dbInputDisplay}
          setDBInputDisplay = {props.setDBInputDisplay}
          endPoints = {props.endPoints}
          setEndPoints = {props.setEndPoints}
          dbToggles = {props.dbToggles}
          setDBToggles = {props.setDBToggles}
        />
        <AddCircleIcon 
          style = {{fontSize:'48px', marginLeft:'11.5vw'}}
          onClick ={(e) => handleClick(e)}
        />
      </Paper>
    </div>
  );
}

