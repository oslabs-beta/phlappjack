import React from 'react';
import { createStyles, Divider, Paper, List,ListItem, ListItemText, IconButton} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

export default function MongoUserNameDisplay(props){

  const onRender = () =>{
    if(props.atlasUserName.length) {
      return ('Username: ' + props.atlasUserName);
    }
    else return;
  }
  return (
    <div>
        <Paper style = {{ marginLeft:'2.5vw', marginTop:'1.5vh', marginRight:'2.5vw', height:'5vh', fontSize:'1.5em', textAlign:'left'}}>
          {onRender()}
        </Paper>
    </div>
  )
}