import * as React from 'react'
const { useState, useEffect } = React;

import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import LoadExistingApplicationsDisplay from './LoadExistingApplicationsDisplay'

export default function LoadExistingApplications(props){

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
    <div style = {{display:'flex', flexDirection:'column', marginTop:'5vh', marginLeft:'2.5vw' }}>
      <Paper style = {{height:'55vh', width:'25vw'}}>
        <div style = {{ marginTop:'2.5vh', textAlign:'center', fontSize:'2.5vh'}}>
          Load Existing Application
        </div>
          <LoadExistingApplicationsDisplay
            applicationsToLoad = {props.applicationsToLoad}
            setApplicationsToLoad = {props.setApplicationsToLoad}
            newApplication = {props.newApplication}
            setNewApplication = {props.setNewApplication}
            childKeyForLoadingApplication = {props.childKeyForLoadingApplication}
            setChildKeyForLoadingApplication = {props.setChildKeyForLoadingApplication}
          />
      </Paper>
    </div>
  );
}
