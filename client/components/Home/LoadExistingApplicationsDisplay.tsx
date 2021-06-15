import * as React from 'react'
const { useState, useEffect, useRef } = React;

import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemText:{
      fontSize:'1.5em',
      textIndent:'1em',
      textAlign:'center'
    }
  }),
);

export default function DBInputFieldDisplay(props){

  const classes = useStyles();

  const handleClick = (e) =>{
    const selectedApplicationEle = (e.target) as HTMLDivElement;
    const applicationIndex: number = selectedApplicationEle.parentNode.parentNode.id.split('_')[1];
    props.setNewApplication(props.applicationsToLoad[applicationIndex])
    const newChildKey: number = props.childKeyForLoadingApplication + 1;
    props.setChildKeyForLoadingApplication(newChildKey)
    console.log(props.childKeyForLoadingApplication)
  }

  const handleMouseDown = (e) =>{
    e.preventDefault();
    let mouseup = false;
    document.addEventListener("mouseup",
      () => {
        mouseup = true;
      }, {once:true}
      );
    const selectedApplicationEle = (e.target) as HTMLDivElement;
    let redPercentage: number = 0;
    const intervalID = setInterval(() => {
      redPercentage += 1;
      if(redPercentage === 100){
        clearInterval(intervalID);
        const indexToRemove: number = selectedApplicationEle.parentNode.parentNode.id.split('_')[1];
        const newApplicationsToLoad = props.applicationsToLoad;
        window.localStorage.removeItem(newApplicationsToLoad[indexToRemove]);
        newApplicationsToLoad.splice(indexToRemove,1);
        props.setApplicationsToLoad(newApplicationsToLoad);
        //Force parent component to update.
        const newChildKey: number = props.childKeyForLoadingApplication + 1;
        props.setChildKeyForLoadingApplication(newChildKey)
      }else if(mouseup === false && redPercentage > 20){
        selectedApplicationEle.style.background = `linear-gradient(90deg, #ffffff ${100 - redPercentage}%, #ff0000 ${redPercentage}%)`
      } else if (mouseup === true){
        selectedApplicationEle.style.background = `transparent`
        clearInterval(intervalID);
      }
    },25)
  }
  

  const useClickOutside = (ref) => {
    const handleClick = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        const newLoadState = new Array(props.applicationsToLoad.length).fill(true).map((item, idx) => true);
        props.setLoadToggles(newLoadState);
      }
    };
    useEffect(() => {
      document.addEventListener('click', handleClick);
      return () => {
        document.removeEventListener('click', handleClick);
      };
    });
  };

  const editField = useRef();

  useClickOutside(editField);

  const handleChange = (e) =>{
    props.setEditLoadTextFieldValue(e.target.value)
    const loadIndex: number = e.target.id.split('_')[1];
    const newApplicationsToLoad = props.applicationsToLoad;
    //Store Props of the old application name.
    const oldApplicationProps = window.localStorage.getItem(newApplicationsToLoad[loadIndex]);
    //Remove previous application.
    window.localStorage.removeItem(newApplicationsToLoad[loadIndex]);
    //Store new application name with props into local storage.
    window.localStorage.setItem(e.target.value,oldApplicationProps)
    newApplicationsToLoad[loadIndex] = e.target.value;
    props.setApplicationsToLoad(newApplicationsToLoad);
  }

  let applicationsToLoadNames = []
  if(props.applicationsToLoad){
    applicationsToLoadNames = props.applicationsToLoad;
  }
  applicationsToLoadNames.sort();

  return (
    <div>
      <Paper style = {{marginLeft:'2.5vw', marginTop:'2.5vh', marginRight:'2.5vw', height:'35vh'}}>
        <List style={{maxHeight: '100%', overflow: 'auto'}}>
          {applicationsToLoadNames.map((text, index) => (
            props.loadToggles[index] ? (
              <ListItem
                id = {`key-value-selection_${index}`}
                button key={text}
                onMouseDown = {(e) => handleMouseDown(e)}
                onClick = {(e) => handleClick(e)}
                onDoubleClick = {() =>{
                  let newLoadToggleState = props.loadToggles;
                  newLoadToggleState[index] = false;
                  props.setLoadToggles(newLoadToggleState);
                  props.setEditLoadTextFieldValue(props.applicationsToLoad[index])
                  //Force parent component to update.
                  const newChildKey: number = props.childKeyForLoadingApplication + 1;
                  props.setChildKeyForLoadingApplication(newChildKey)
                }}
              >
                <ListItemText 
                  primary={text}
                  classes={{primary:classes.listItemText}}
                />
              </ListItem>
            ):(
            <div ref = {editField}>
              <TextField
                id = {`load-application-rename_${index}`}
                multiline = {true}
                inputProps = {{style:{textAlign:'center', fontSize:'1.5em'}}}
                style = {{
                  width:'20vw'
                }}
                rows = {2}
                value = {props.editLoadTextFieldValue}
                onChange = {handleChange}
              />
            </div>
              )
            ))}
          </List>
      </Paper>
    </div>
  );
}
