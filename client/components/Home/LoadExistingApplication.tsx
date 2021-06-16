import * as React from 'react'
const { useState, useEffect } = React;

import LoadExistingApplicationsDisplay from './LoadExistingApplicationsDisplay'
import { Typography } from '@material-ui/core';

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
    <div >
         <Typography variant="h5">
            Load Existing Application
          </Typography> 
          <LoadExistingApplicationsDisplay
            applicationsToLoad = {props.applicationsToLoad}
            setApplicationsToLoad = {props.setApplicationsToLoad}
            newApplication = {props.newApplication}
            setNewApplication = {props.setNewApplication}
            childKeyForLoadingApplication = {props.childKeyForLoadingApplication}
            setChildKeyForLoadingApplication = {props.setChildKeyForLoadingApplication}
            loadToggles = {props.loadToggles}
            setLoadToggles = {props.setLoadToggles}
            editLoadTextFieldValue = {props.editLoadTextFieldValue}
            setEditLoadTextFieldValue = {props.setEditLoadTextFieldValue}
          />
    </div>
  );
}
