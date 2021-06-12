import * as React from 'react'
const { useState, useEffect } = React;

import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import ExistingModelsDisplay from './ExistingModelsDisplay'
import DBNameInput from './DBNameInput';

export default function ExistingModels(props){

  const handleClick = (e) =>{
    const inputFieldEle = (document.getElementById("Specifiy DB Input field")) as HTMLInputElement;
    console.log(inputFieldEle.value)
    props.setDBBeingModified(inputFieldEle.value)
    if (!props.dbInputDisplay[inputFieldEle.value]){
      const newDBInputDisplay = props.dbInputDisplay;
      newDBInputDisplay[inputFieldEle.value] = [];
      props.setDBInputDisplay(newDBInputDisplay);
    }
    inputFieldEle.value = '';
  }

  return (
    <div style = {{display:'flex', flexDirection:'column', marginTop:'5vh', marginLeft:'2.5vw' }}>
      <Paper style = {{height:'55vh', width:'25vw'}}>
      <div style = {{ marginTop:'2.5vh', textAlign:'center', fontSize:'2.5vh'}}>
        Existing Models
      </div>
        <ExistingModelsDisplay
          dbBeingModified = {props.dbBeingModified}
          setDBBeingModified = {props.setDBBeingModified}
          dbInputDisplay = {props.dbInputDisplay}
          setDBInputDisplay = {props.setDBInputDisplay}
        />
        <DBNameInput
          dbBeingModified = {props.dbBeingModified}
          setDBBeingModified = {props.setDBBeingModified}
          dbInputDisplay = {props.dbInputDisplay}
          setDBInputDisplay = {props.setDBInputDisplay}
        />
        <AddCircleIcon style = {{fontSize:'48px', marginLeft:'11.5vw'}} onClick ={(e) => handleClick(e)}/>
      </Paper>
    </div>
  );
}
