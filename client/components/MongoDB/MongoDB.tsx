import React, { useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DBInputField from './DBInput/DBInputField'
import ExistingModels from './ExistingModels/ExistingModels'
import MongoAtlasConnection from './MongoAtlasConnection/MongoAtlasConnection'


const useStyles = makeStyles((theme:Theme) => 
    createStyles({
        paper: {
            margin: theme.spacing(1),
            padding: theme.spacing(6),
            flex: 1
        },
    }),
    );

export default function MongoDB(props){

  const classes = useStyles();
  const [ childKey,setChildKey ] = useState(0);
  
  return (
       <Grid container  >
          <Paper className={classes.paper}>
           <Grid container>
              <Grid sm={4}  item>
                <MongoAtlasConnection
                  dbBeingModified = {props.dbBeingModified}
                  setDBBeingModified = {props.setDBBeingModified}
                  dbInputDisplay = {props.dbInputDisplay}
                  setDBInputDisplay = {props.setDBInputDisplay}
                  connectionString = {props.connectionString}
                  setConnectionString = {props.setConnectionString}
                  atlasUserName = {props.atlasUserName}
                  setAtlasUserName = {props.setAtlasUserName}
                  atlasPassword = {props.atlasPassword}
                  setAtlasPassword = {props.setAtlasPassword}
                  atlasHostCluster = {props.atlasHostCluster}
                  setAtlasHostCluster = {props.setAtlasHostCluster}
                  atlasDB = {props.atlasDB}
                  setAtlasDB = {props.setAtlasDB}
                />
              </Grid>
              <Grid sm={4}  item>
                <ExistingModels
                  dbBeingModified = {props.dbBeingModified}
                  setDBBeingModified = {props.setDBBeingModified}
                  dbInputDisplay = {props.dbInputDisplay}
                  setDBInputDisplay = {props.setDBInputDisplay}
                  endPoints = {props.endPoints}
                  setEndPoints = {props.setEndPoints}
                />
              </Grid>
              <Grid sm={4} item >
                <DBInputField
                  key = {childKey}
                  setChildKey = {setChildKey}
                  dbBeingModified = {props.dbBeingModified}
                  setDBBeingModified = {props.setDBBeingModified}
                  dbInputDisplay = {props.dbInputDisplay}
                  setDBInputDisplay = {props.setDBInputDisplay}
                  endPoints = {props.endPoints}
                  setEndPoints = {props.setEndPoints}
                />
              </Grid>
           </Grid>
          </Paper>
         </Grid>
  )
}