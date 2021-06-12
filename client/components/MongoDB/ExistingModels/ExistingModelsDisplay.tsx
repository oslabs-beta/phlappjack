import * as React from 'react'
const { useEffect } = React;
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemText:{
      fontSize:'2em',
      textAlign:'left'
    }
  }),
);

export default function ExistingModelsDisplay(props){
  
  const classes = useStyles();


  const handleSelection = (e) =>{
    e.preventDefault();
    const selectedDBName: string = e.target.innerText;
    props.setDBBeingModified(selectedDBName);
  }

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
        const indexToRemove: string = selectedKeyValueEle.parentNode.parentNode.id.split('_')[1];
        const newDBInputDisplay = props.dbInputDisplay;
        delete newDBInputDisplay[indexToRemove];
        props.setDBInputDisplay(newDBInputDisplay);
        props.setDBBeingModified('DB Input Field');
        //Force parent component to update.
        const newChildKey: number = Math.floor(Math.random() * 100000);
        props.setChildKey(newChildKey);
      }else if(mouseup === false && redPercentage > 10){
        selectedKeyValueEle.style.background = `linear-gradient(90deg, #ffffff ${100 - redPercentage}%, #ff0000 ${redPercentage}%)`
      } else if (mouseup === true){
        selectedKeyValueEle.style.background = `transparent`
        clearInterval(intervalID);
      }
    }, 50)

  }

  let dbNames = [];
  if(Object.keys(props.dbInputDisplay).length){
    dbNames = Object.keys(props.dbInputDisplay);
  }

  return (
    <div>
      <Paper style = {{marginLeft:'2.5vw', marginTop:'2.5vh', marginRight:'2.5vw', height:'35vh'}}>
        <Divider/>
          <List style={{maxHeight: '100%', overflow: 'auto'}}>
            {dbNames.map((text, index) => (
                <ListItem 
                  id = {`schema-selection_${text}`}
                  button key={text}
                  onClick = {(e) => handleSelection(e)}
                  onMouseDown = {(e) => handleMouseDown(e)}
                >
                  <ListItemText 
                    primary={text}
                    classes={{primary:classes.listItemText}}
                    onClick = {(e) => handleSelection(e)}
                  />
                </ListItem>
            ))}
            </List>
      </Paper>
    </div>
  );
}
