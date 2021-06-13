import * as React from 'react'
const { useState, useEffect } = React;

import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import DBInputFieldDisplay from './DBInputFieldDisplay';
import DBInputFieldKey from './DBInputFieldKey';
import DBInputFieldValue from './DBInputFieldValue';

export default function DBInputField(props){

  const [ childKey0,setChildKey0] = useState(0);
  const [ childKey1,setChildKey1] = useState(0);
  const [ childKey2,setChildKey2] = useState(0);

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
      
      const newEndPoint: string = '/' + props.dbBeingModified + ':' + newKeyValue;
      const newEndPoints = props.endPoints;
      newEndPoints[newEndPoint] = [];
      props.setEndPoints(newEndPoints);
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
          childKey0 = {childKey0}
          setChildKey0 = {setChildKey0}
          dbBeingModified = {props.dbBeingModified}
          setDBBeingModified = {props.setDBBeingModified}
          dbInputDisplay = {props.dbInputDisplay}
          setDBInputDisplay = {props.setDBInputDisplay}
        />
        <div style={{display:'flex', flexDirection:'row', marginTop:'1vh', marginLeft:'2.5vw'}}>
          <DBInputFieldKey
            childKey1 = {childKey1}
            setChildKey1 = {setChildKey1}
            dbBeingModified = {props.dbBeingModified}
            setDBBeingModified = {props.setDBBeingModified}
            dbInputDisplay = {props.dbInputDisplay}
            setDBInputDisplay = {props.setDBInputDisplay}
          />
          <DBInputFieldValue
            childKey2 = {childKey2}
            setChildKey2 = {setChildKey2}
            dbBeingModified = {props.dbBeingModified}
            setDBBeingModified = {props.setDBBeingModified}
            dbInputDisplay = {props.dbInputDisplay}
            setDBInputDisplay = {props.setDBInputDisplay}
          />
        </div>
        <AddCircleIcon style = {{fontSize:'48px', marginLeft:'11.5vw'}} onClick ={e => handleOnClick(e)}/>
      </Paper>
    </div>
  );
}
