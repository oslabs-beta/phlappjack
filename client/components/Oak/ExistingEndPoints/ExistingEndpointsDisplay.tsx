import React from 'react';
import { createStyles, Divider, Paper, List,ListItem, ListItemText, IconButton} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme:Theme) => 
    createStyles({
        listItem: {
            display:"flex",
            justifyContent:"space-between"
        },
        listItemText:{
            fontSize:'2em',
            textAlign:'Left'
          }
    }),
    );

export default function ExistingEndpointsDisplay(props){

    const classes = useStyles();

    const handleSelection = (e) =>{
      e.preventDefault();
      const selectedEndPointName: string = e.target.innerText;
      props.setSelectedEndPoint(selectedEndPointName);
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
          const newEndPointNames = props.endPoints;
          delete newEndPointNames[indexToRemove];
          props.setEndPoints(newEndPointNames);
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

    const endPointNames = Object.keys(props.endPoints).sort();
   
    return (
        <div>
            <Paper style = {{marginLeft:'2.5vw', marginTop:'2.5vh', marginRight:'2.5vw', height:'35vh'}}>
            <Divider/>
                <List style={{maxHeight: '100%', overflow: 'auto'}}>
                {endPointNames.map((text, index) => (
                  <ListItem 
                    id = {`endpoint-selection_${text}`}
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



    )
}