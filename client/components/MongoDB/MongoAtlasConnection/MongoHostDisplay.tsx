import React from 'react';
import { createStyles, Divider, Paper, List,ListItem, ListItemText, IconButton} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

export default function MongoHostDisplay(props){

  const onRender = () =>{
    if(props.atlasHostCluster.length) {
      return ('Host: ' + props.atlasHostCluster);
    }
    else return;
  }
  return (
    <div>
        <Paper style = {{ 
          marginLeft:'2.5vw', 
          marginTop:'1vh', 
          marginRight:'2.5vw', 
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          height:'5vh', 
          fontSize:'1.5em'}}>
            {onRender()}
        </Paper>
    </div>
  )
}