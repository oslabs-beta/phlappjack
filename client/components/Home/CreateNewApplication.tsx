import * as React from 'react'
const { useState, useEffect } = React;

import CreateNewApplicationInput from './CreateNewApplicationInput'

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

export default function CreateExistingApplication(props){

  const [ childKey,setChildKey ] = useState(0);

  const handleOnClick = (e) =>{
      const createNewAppEle = (document.getElementById("cerate-new-application-input-field")) as HTMLInputElement;
      const createNewAppString: string = createNewAppEle.value;
      createNewAppEle.value = '';
      props.setNewApplication(createNewAppString)

      //Force parent component to update.
      const newChildKey: number = Math.floor(Math.random() * 100000);
      props.setChildKey(newChildKey)
  }

  return (
    <div style = {{display:'flex', flexDirection:'column', marginTop:'5vh', marginLeft:'2.5vw'}}>
      <Paper style = {{height:'55vh', width:'25vw'}}>
        <div style = {{ marginTop:'2.5vh', textAlign:'center', fontSize:'2.5vh'}}>
          Create New Application
        </div>
        <CreateNewApplicationInput
          key ={props.childKey}
          setChildKey = {props.setChildKey}
          newApplication = {props.newApplication}
          setNewApplication = {props.setNewApplication}
        />
        <Button 
          variant = 'contained'
          style = {{ marginLeft:'7.5vw', marginTop:'1vw', textAlign:'center', fontSize:'2.5vh', width:'10vw' }}
          onClick = {(e) => handleOnClick(e)}
        >
          Create
        </Button>
      </Paper>
    </div>
  );
}
