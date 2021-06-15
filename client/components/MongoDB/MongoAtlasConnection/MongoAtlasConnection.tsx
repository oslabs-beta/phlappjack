import * as React from 'react'
const { useState, useEffect } = React;

import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import MongoUserNameDisplay from './MongoUserNameDisplay'
import MongoUserNameInput from './MongoUserNameInput';
import MongoPasswordDisplay from './MongoPasswordDisplay';
import MongoPasswordInput from './MongoPasswordInput';
import MongoHostDisplay from './MongoHostDisplay';
import MongoHostInput from './MongoHostInput';
import MongoDBDisplay from './MongoDBDisplay'
import MongoDBInput from './MongoDBInput';

export default function MongoAtlasConnection(props){

  const [ childKey,setChildKey ] = useState(0);

  const handleOnClick = (e) =>{
      // const newConnectionStringEle = (document.getElementById("mongoUri-input-field")) as HTMLInputElement;
      // const newConnectionString: string = newConnectionStringEle.value;
      // newConnectionStringEle.value = '';
      // props.setConnectionString(newConnectionString)

      // //Force parent component to update.
      // const newChildKey: number = Math.floor(Math.random() * 100000);
      // props.setChildKey(newChildKey)
  }

  return (
    <div style = {{display:'flex', flexDirection:'column', marginTop:'5vh'}}>
      <Paper style = {{height:'55vh', width:'25vw'}}>
        <div style = {{ marginTop:'2.5vh', textAlign:'center', fontSize:'2.5vh'}}>
          Mongo Atlas Connection
        </div>
        <div>
          <MongoUserNameDisplay
            atlasUserName = {props.atlasUserName}
            setAtlasUserName = {props.setAtlasUserName}
          />
          <MongoUserNameInput
            atlasUserName = {props.atlasUserName}
            setAtlasUserName = {props.setAtlasUserName}
          />
        </div>
        <div>
          <MongoPasswordDisplay
            atlasPassword = {props.atlasPassword}
            setAtlasPassword = {props.setAtlasPassword}
          />
          <MongoPasswordInput
            atlasPassword = {props.atlasPassword}
            setAtlasPassword = {props.setAtlasPassword}
          />
        </div>
        <div>
          <MongoHostDisplay
            atlasHostCluster = {props.atlasHostCluster}
            setAtlasHostCluster = {props.setAtlasHostCluster}
          />
          <MongoHostInput
            atlasHostCluster = {props.atlasHostCluster}
            setAtlasHostCluster = {props.setAtlasHostCluster}
          />
        </div>
        <div>
          <MongoDBDisplay
            atlasDB = {props.atlasDB}
            setAtlasDB = {props.setAtlasDB}
          />
          <MongoDBInput
            atlasDB = {props.atlasDB}
            setAtlasDB = {props.setAtlasDB}
          />
        </div>
      </Paper>
    </div>
  );
}
