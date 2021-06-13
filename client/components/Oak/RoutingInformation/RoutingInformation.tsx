import * as React from 'react'
const { useState, useEffect } = React;

import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import ExistingModelsDisplay from './ExistingModelsDisplay.tsx'
import RoutingMethods from './RoutingMethods.tsx';
import ResponseStatus from './ResponseStatus.tsx';
import ResponseBody from './ResponseBody.tsx';

export default function ExistingModels(props){

  const [ childKey,setChildKey ] = useState(0);
  const [ resMethod, setResMethod ] = useState('')
  const [ resStatus, setResStatus ] = useState('')
  const [ resBody, setResBody ] = useState('')

  const handleClick = (e) =>{

    let newRoutes: Array<string> = props.routes;

    newRoutes.push(`
    .${resMethod}('${props.selectedEndPoint}',(ctx) => {
      ctx.response.body = ${resBody};
    )}
    `)
    props.setRoutes(newRoutes);
    setResMethod('');
    setResStatus('');
    setResBody('');
    //Force parent element to re-render.
    const newChildKey: number = Math.floor(Math.random() * 100000);
    props.setChildKey(newChildKey);
  }

  return (
    <div style = {{display:'flex', flexDirection:'column', marginTop:'5vh', marginLeft:'2.5vw' }}>
      <Paper style = {{height:'55vh', width:'25vw'}}>
      <div style = {{ marginTop:'2.5vh', textAlign:'center', fontSize:'2.5vh'}}>
        {`Routes for ${props.selectedEndPoint}`}
      </div>
      <div style = {{ marginTop:'2.5vh', textAlign:'center', fontSize:'2.5vh'}}>
        <RoutingMethods
          resMethod = {resMethod}
          setResMethod = {setResMethod}
        />
      </div>
      <div style = {{ marginTop:'2.5vh', textAlign:'center', fontSize:'2.5vh'}}>
        <ResponseBody
          resBody = {resBody}
          setResBody = {setResBody}
        />
      </div>
        <AddCircleIcon style = {{fontSize:'48px', marginLeft:'11.5vw'}} onClick ={(e) => handleClick(e)}/>
      </Paper>
    </div>
  );
}
