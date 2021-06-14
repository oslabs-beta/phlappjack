import * as React from 'react'
const { useState, useEffect } = React;

import Paper from '@material-ui/core/Paper';

import RouteExcecutionOrderDisplay from './RouteExcecutionOrderDisplay';

export default function RouteExecutionOrder(props){

  const [ childKey,setChildKey ] = useState(0);

  // const handleClick = (e) =>{
  //   const inputFieldEle = (document.getElementById("Specifiy DB Input field")) as HTMLInputElement;
  //   props.setDBBeingModified(inputFieldEle.value)
  //   if (!props.dbInputDisplay[inputFieldEle.value]){
  //     const newDBInputDisplay = props.dbInputDisplay;
  //     newDBInputDisplay[inputFieldEle.value] = [];
  //     props.setDBInputDisplay(newDBInputDisplay);
  //   }
  //   inputFieldEle.value = '';
  // }

  return (
    <div style = {{display:'flex', flexDirection:'column', marginTop:'5vh'}}>
      <Paper style = {{height:'55vh', width:'25vw'}}>
        <div style = {{ marginTop:'2.5vh', textAlign:'center', fontSize:'2.5vh'}}>
          Route Execution Order
        </div>
        <RouteExcecutionOrderDisplay
          key ={childKey}
          setChildKey = {setChildKey}
          endPoints = {props.endPoints}
          setEndPoints = {props.setEndPoints}
          selectedEndPoint = {props.selectedEndPoint}
          setSelectedEndPoint = {props.setSelectedEndPoint}
          routes = {props.routes}
          setRoutes = {props.setRoutes}
          toggles = {props.toggles}
          setToggles = {props.setToggles}
          editTextFieldValue = {props.editTextFieldValue}
          setEditTextFieldValue = {props.setEditTextFieldValue}
        />
      </Paper>
    </div>
  );
}
