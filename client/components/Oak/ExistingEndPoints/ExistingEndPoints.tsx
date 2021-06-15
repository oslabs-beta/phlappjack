import * as React from 'react'
const { useState } = React;

import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import ExistingEndPointsDisplay from './ExistingEndpointsDisplay'
import EndPointNameInput from './EndPointNameInput'


export default function ExisitngEndPoints(props){

  const handleClick = (e) =>{
    const inputFieldEle = (document.getElementById("Specifiy Endpoint Name")) as HTMLInputElement;
    let inputVal: string = inputFieldEle.value;
    if(inputVal[0] !== '/') inputVal = '/' + inputVal;
    if (!props.endPoints[inputVal]){
      const newEndPoint = props.endPoints;
      newEndPoint[inputVal] = [];
      props.setEndPoints(newEndPoint);
      props.setSelectedEndPoint(inputVal)
      //Force parent component to update.
      const newChildKey: number = Math.floor(Math.random() * 100000);
      props.setChildKey(newChildKey);
    }
    inputFieldEle.value = '';
  }


  return (
    <div style = {{display:'flex', flexDirection:'column', marginTop:'5vh'}}>
      <Paper style = {{height:'55vh', width:'25vw'}}>
      <div style = {{ marginTop:'2.5vh', textAlign:'center', fontSize:'2.5vh'}}>
        Existing End Points
      </div>
        <ExistingEndPointsDisplay
          key ={props.childKey}
          endPoints = {props.endPoints}
          setEndPoints = {props.setEndPoints}
          setChildKey = {props.setChildKey}
          selectedEndPoint = {props.selectedEndPoint}
          setSelectedEndPoint = {props.setSelectedEndPoint}
        />
        <EndPointNameInput/>
        <AddCircleIcon 
          style = {{fontSize:'48px', marginLeft:'11.5vw'}} 
          onClick ={(e) => handleClick(e)}
        />
      </Paper>
    </div>
  );
}
