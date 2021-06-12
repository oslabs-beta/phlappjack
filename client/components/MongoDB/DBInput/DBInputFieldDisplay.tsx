import * as React from 'react'
const { useState } = React;

import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemTextParenethese:{
      fontSize:'2em',
      textAlign:'left',
    },
    listItemText:{
      fontSize:'1.5em',
      textIndent:'1em',
    }
  }),
);

export default function DBInputFieldDisplay(props){

  const classes = useStyles();

  const handleMouseDown = (e) =>{
    e.preventDefault();
    let mouseup = false;
    document.addEventListener("mouseup",
      () => {
        mouseup = true;
      }, {once:true}
      );
    const selectedKeyValueEle = (e.target) as HTMLDivElement;
    let redPercentage: number = 0;
    const intervalID = setInterval(() => {
      redPercentage += 1;
      if(redPercentage === 100){
        clearInterval(intervalID);
        const indexToRemove: number = selectedKeyValueEle.parentNode.parentNode.id.split('_')[1];
        const newDBInputDisplay = props.dbInputDisplay;
        newDBInputDisplay[props.dbBeingModified].splice(indexToRemove,1);
        props.setDBInputDisplay(newDBInputDisplay);
        //Force parent component to update.
        const newChildKey0: number = props.newChildKey + 1;
        props.setChildKey(newChildKey0)
      }else if(mouseup === false && redPercentage > 20){
        selectedKeyValueEle.style.background = `linear-gradient(90deg, #ffffff ${100 - redPercentage}%, #ff0000 ${redPercentage}%)`
      } else if (mouseup === true){
        selectedKeyValueEle.style.background = `transparent`
        clearInterval(intervalID);
      }
    },25)
  }

  let displayFields = []
  if(props.dbInputDisplay[props.dbBeingModified]){
    displayFields = props.dbInputDisplay[props.dbBeingModified];
  }

  return (
    <div>
      <Paper style = {{marginLeft:'2.5vw', marginTop:'2.5vh', marginRight:'2.5vw', height:'35vh'}}>
        <List style={{maxHeight: '100%', overflow: 'auto'}}>
          <ListItem button key={'{'}>
            <ListItemText 
              primary={'{'}
              classes={{primary:classes.listItemTextParenethese}}
            />
          </ListItem>
          {displayFields.map((text, index) => (
            <ListItem
              id = {`key-value-selection_${index}`}
              button key={text}
              onMouseDown = {(e) => handleMouseDown(e)}
            >
              <ListItemText 
                primary={text}
                classes={{primary:classes.listItemText}}
              />
            </ListItem>))}
            <ListItem button key={'}'}>
              <ListItemText 
                primary={'}'}
                classes={{primary:classes.listItemTextParenethese}}
              />
            </ListItem>
          </List>
      </Paper>
    </div>
  );
}
