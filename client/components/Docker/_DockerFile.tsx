import * as React from 'react'
const { useState, useEffect } = React;

import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import _DockerFileInterface from './_DockerFileInterface'

export default function _DockerFile(props){

  const [ childKey,setChildKey ] = useState(0);

  const handleClick = (e) =>{
    const inputFieldEle = (document.getElementById("Specifiy DB Input field")) as HTMLInputElement;
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
          Docker File
        </div>
          <_DockerFileInterface
            key ={props.childKey}
            setChildKey = {props.setChildKey}
            dbBeingModified = {props.dbBeingModified}
            setDBBeingModified = {props.setDBBeingModified}
            dbInputDisplay = {props.dbInputDisplay}
            setDBInputDisplay = {props.setDBInputDisplay}
            atlasUserName = {props.atlasUserName}
            setAtlasUserName = {props.setAtlasUserName}
            atlasPassword = {props.atlasPassword}
            setAtlasPassword = {props.setAtlasPassword}
            atlasHostCluster = {props.atlasHostCluster}
            setAtlasHostCluster = {props.setAtlasHostCluster}
            atlasDB = {props.atlasDB}
            setAtlasDB = {props.setAtlasDB}
            dockerFile = {props.dockerFile}
            setDockerFile = {props.setDockerFile}
            dockerCompose = {props.dockerCompose}
            setDockerCompose = {props.setDockerCompose}
          />
      </Paper>
    </div>
  );
}
