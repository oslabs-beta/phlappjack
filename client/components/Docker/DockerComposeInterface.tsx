import * as React from 'react'
const { useState, useEffect } = React;

import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/core/Autocomplete';


export default function DockerComposeInterface(props){
  
  const handleChange = (e) => {
    props.setDockerCompose(e.target.value as HTMLFontElement);
  }

  return (
    <div style = {{display:'flex', flexDirection:'column', marginTop:'2.5vh' }}>
      {/* <Paper> */}
        <TextField 
          value = {props.dockerCompose}
          multiline = {true}
          rows = {30}
          fullWidth
          // style = {{width:'20vw'}}
          onChange = {handleChange}
        />
      {/* </Paper> */}
    </div>
  );
}
