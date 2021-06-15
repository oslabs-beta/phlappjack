import React, { useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import _DockerFile from './_DockerFile'
import DockerCompose from './DockerCompose'

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

export default function Docker(props){

  const classes = useStyles();
  const [ childKey,setChildKey ] = useState(0);
  
  return (
    <Grid>
      <Grid item xs = {3}>
        <Paper className={classes.paper}>
          <Grid container>
              <Grid sm={6}  item>
                  <_DockerFile
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
                </Grid>
                <Grid sm={4}  item>
                  <DockerCompose
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
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
  )
}