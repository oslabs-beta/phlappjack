import React, { useState, useEffect } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LoadExistingApplication from './LoadExistingApplication'
import CreateNewApplication from './CreateNewApplication'
import clsx from 'clsx'

const useStyles = makeStyles((theme:Theme) => 
    createStyles({
        paper: {
            margin: theme.spacing(0),
            padding: theme.spacing(4),
            // display:'flex',
            height:'80vh',
            flexGrow:1,
        },
        image: {
          margin: theme.spacing(8)
        },
        menupair: {
          maxWidth: '700px',
        },
        load: {
          alignSelf:"flex-start"
        },
        hide: {
          display: 'none',
        },
        show: {
          display: 'reset',
        },
    }),
    );

export default function Home(props){

  const classes = useStyles();
  const [ childKey,setChildKey ] = useState(0);

  return (
        <Grid>
          <Grid container sm={12}>
            <Paper className={classes.paper}>
              <Grid container justify="center" sm={12}>
                <Grid container justify="center" className={classes.image} >
                  <img src="images/logo.svg" />
                </Grid>
                  <Grid container className={classes.menupair} alignItems="center">
                    <Grid sm={6} className={props.applicationsToLoad.length ? classes.show : classes.hide} item>
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
                  <Grid sm={6} container justify="center" item>
                    <CreateNewApplication
                      key ={props.childKey}
                      setChildKey = {props.setChildKey}
                      newApplication = {props.newApplication}
                      setNewApplication = {props.setNewApplication}
                    />
                  </Grid>
                  </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
  )
}