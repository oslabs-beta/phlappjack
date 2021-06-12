import * as React from 'react'
const { useState, useEffect } = React;

import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import DBInputFieldDisplay from './DBInputFieldDisplay';
import DBInputFieldKey from './DBInputFieldKey';
import Value from './DBInputFieldValue';

export default function DBInputField(props){

  const [ childKey,setChildKey ] = useState(0);
  const handleOnClick = (e) =>{
    if(props.dbInputDisplay[props.dbBeingModified]){
      const keyEle = (document.getElementById("key-input-field")) as HTMLInputElement;
      const newKeyValue = keyEle.value;
      keyEle.value = '';
      const valueEle = (document.getElementById("value-input-field")) as HTMLInputElement;
      const newValueEle = valueEle.value;
      valueEle.value = '';

      const newDBInputDisplay = props.dbInputDisplay;
      newDBInputDisplay[props.dbBeingModified].push([`${newKeyValue}:  ${newValueEle};`]);
      props.setDBInputDisplay(newDBInputDisplay)
      //Force parent component to update.
      const newChildKey: number = Math.floor(Math.random() * 100000);
      props.setChildKey(newChildKey)
    }else {
      alert('Please select an existing model.')
      const keyEle = (document.getElementById("key-input-field")) as HTMLInputElement;
      keyEle.value = '';
      const valueEle = (document.getElementById("value-input-field")) as HTMLInputElement;
      valueEle.value = '';
    }
  }

  return (
    <div style = {{display:'flex', flexDirection:'column', marginTop:'5vh', marginLeft:'2.5vw' }}>
      <Paper style = {{height:'55vh', width:'25vw'}}>
        <div style = {{ marginTop:'2.5vh', textAlign:'center', fontSize:'2.5vh'}}>
          {props.dbBeingModified}
        </div>
        <DBInputFieldDisplay
          key = {childKey}
          dbBeingModified = {props.dbBeingModified}
          setDBBeingModified = {props.setDBBeingModified}
          dbInputDisplay = {props.dbInputDisplay}
          setDBInputDisplay = {props.setDBInputDisplay}
          setChildKey = {setChildKey}
        />
        <div style={{display:'flex', flexDirection:'row', marginTop:'1vh', marginLeft:'2.5vw'}}>
          <DBInputFieldKey/>
          <Value/>
        </div>
        <AddCircleIcon style = {{fontSize:'48px', marginLeft:'11.5vw'}} onClick ={e => handleOnClick(e)}/>
      </Paper>
    </div>
  );
}
