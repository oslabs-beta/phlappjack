import React, { useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LoadExistingApplication from './LoadExistingApplication'
import CreateNewApplication from './CreateNewApplication'

const useStyles = makeStyles((theme:Theme) => 
    createStyles({
        paper: {
            margin: theme.spacing(0),
            padding: theme.spacing(4),
            display:'flex',
            width:'65vw'
        },
    }),
    );

export default function Home(props){

  const classes = useStyles();
  const [ childKey,setChildKey ] = useState(0);
  
  return (
        <Grid>
          <Grid item xs = {3}>
            <Paper className={classes.paper}>
              <Grid container>
                  <Grid sm={6}  item>
                    <LoadExistingApplication
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
                  </Grid>
                  <Grid sm={6}  item>
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
        </Grid>
  )
}