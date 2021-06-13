import React, { useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LoadExistingApplication from './LoadExistingApplication'
import CreateNewApplication from './CreateNewApplication'

const useStyles = makeStyles((theme:Theme) => 
    createStyles({
        paper: {
            margin: theme.spacing(1),
            padding: theme.spacing(6),
            flex: 1
        },
    }),
    );

export default function Home(props){

  const classes = useStyles();
  const [ childKey,setChildKey ] = useState(0);
  
  return (
       <Grid container  >
          <Paper className={classes.paper}>
           <Grid container>
              <Grid sm={4}  item>
                <LoadExistingApplication
                  applicationsToLoad = {props.applicationsToLoad}
                  setApplicationsToLoad = {props.setApplicationsToLoad}
                  newApplication = {props.newApplication}
                  setNewApplication = {props.setNewApplication}
                  childKeyForLoadingApplication = {props.childKeyForLoadingApplication}
                  setChildKeyForLoadingApplication = {props.setChildKeyForLoadingApplication}
                />
              </Grid>
              <Grid sm={4}  item>
                <CreateNewApplication
                  key ={props.childKey}
                  setChildKey = {props.setChildKey}
                  newApplication = {props.newApplication}
                  setNewApplication = {props.setNewApplication}
                />
              </Grid>
           </Grid>
          </Paper>
        </Grid>
  )
}