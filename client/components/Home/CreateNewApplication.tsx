import * as React from 'react'
const { useState, useEffect } = React;
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CreateNewApplicationInput from './CreateNewApplicationInput'

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme:Theme) => 
    createStyles({
        button: {
            margin: theme.spacing(1),
        }
    }),
    );

export default function CreateExistingApplication(props){
  const classes = useStyles()

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
    <Grid container sm={6} justify="center">
        <CreateNewApplicationInput
          key ={props.childKey}
          setChildKey = {props.setChildKey}
          newApplication = {props.newApplication}
          setNewApplication = {props.setNewApplication}
        />
        <Button 
          className={classes.button}
          variant="contained"
          color="secondary"
          size="large"
          onClick = {(e) => handleOnClick(e)}
        >
          Create
        </Button>
      </Grid>
  );
}
