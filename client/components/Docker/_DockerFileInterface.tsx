import * as React from 'react'
const { useState, useEffect } = React;

import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';


export default function _DockerFileInterface(props){

  const handleChange = (e) => {
    props.setDockerFile(e.target.value as HTMLFontElement);
  }

  return (
    <div style = {{display:'flex', flexDirection:'column', marginTop:'2.5vh', marginLeft:'2.5vw', marginRight:'2.5vw' }}>
      <Paper>
        <TextField
          value = {props.dockerFile}
          multiline = {true}
          rows = {25}
          style = {{width:'20vw'}}
          onChange = {handleChange}
        />
      </Paper>
    </div>
  );
}
