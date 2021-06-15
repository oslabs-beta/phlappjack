import * as React from 'react'
const { useState, useEffect } = React;

import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import ExistingModelsDisplay from './ExistingModelsDisplay.tsx'
import RoutingMethods from './RoutingMethods.tsx';
import ResponseStatus from './ResponseStatus.tsx';
import Middleware from './Middleware.tsx';

export default function RoutingInformation(props){

  const [ childKey0,setChildKey0 ] = useState(0);
  const [ childKey1,setChildKey1 ] = useState(0);
  const [ resMethod, setResMethod ] = useState('')

  const handleClick = (e) =>{

    const newRoutes = props.routes;
    const newRouteEle = document.getElementById('middleware-input') as HTMLInputElement;
    const newRouteEleValue = newRouteEle.value
    newRoutes.push(newRouteEleValue)
    props.setRoutes(newRoutes);
    props.setMiddleWareTemp('')

    //Force parent element to re-render.
    const newChildKey: number = Math.floor(Math.random() * 100000);
    props.setChildKey(newChildKey);
  }

  return (
    <div style = {{display:'flex', flexDirection:'column', marginTop:'5vh'}}>
      <Paper style = {{height:'55vh', width:'25vw'}}>
      <div style = {{ marginTop:'2.5vh', textAlign:'center', fontSize:'2.5vh'}}>
        {`Selected Route: ${props.selectedEndPoint}`}
      </div>
      <div style = {{ marginTop:'2.5vh', textAlign:'center', fontSize:'2.5vh'}}>
        <RoutingMethods
          resMethod = {resMethod}
          setResMethod = {setResMethod}
          childKey0 = {childKey0}
          setChildKey0 = {setChildKey0}
        />
      </div>
      <div style = {{ marginTop:'2.5vh', textAlign:'center', fontSize:'2.5vh'}}>
        <Middleware
          resMethod = {resMethod}
          setResMethod = {setResMethod}
          middleWareTemp = {props.middleWareTemp}
          setMiddleWareTemp = {props.setMiddleWareTemp}
          selectedEndPoint = {props.selectedEndPoint}
          setSelectedEndPoint = {props.setSelectedEndPoint}
          dbInputDisplay = {props.dbInputDisplay}
          setDBInputDisplay = {props.setDBInputDisplay}
        />
      </div>
        <AddCircleIcon 
          style = {{fontSize:'48px', marginLeft:'11.5vw', marginTop:'0.125em'}} 
          onClick ={handleClick}
        />
      </Paper>
    </div>
  );
}
