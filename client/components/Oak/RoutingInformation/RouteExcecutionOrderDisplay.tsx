import * as React from 'react'
const { useEffect } = React;
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemRouter:{
      fontSize:'1.5em',
      textAlign:'left',
    },
    listItemText:{
      fontSize:'1.5em',
      textAlign:'left',
      marginLeft:'1.5em',
      marginTop:'-2em',
      marginBottom:'-2em',
      whiteSpace: 'pre-wrap',
    }
  }),
);

export default function RouteExecutionOrderDisplay(props){

  const classes = useStyles();
  
  const handleSelection = (e) =>{
    e.preventDefault();
    // const selectedDBName: string = e.target.innerText;
    // props.setDBBeingModified(selectedDBName);
  }

  const handleMouseDown = (e) =>{
    e.preventDefault();
    let mouseup = false;
    document.addEventListener("mouseup",
      () => {
        mouseup = true;
      }, {once:true}
      );
    const selectedRouteEle = (e.target) as HTMLDivElement;
    const backgroundColorDiv = selectedRouteEle.parentNode.parentNode.parentNode as HTMLDivElement;
    let redPercentage: number = 0;
    const intervalID = setInterval(() => {
      redPercentage += 1;
      if(redPercentage === 100){
        clearInterval(intervalID);
        const indexToRemove: number = selectedRouteEle.parentNode.id.split('_')[1];
        const newRoutes: Array<string> = props.routes;
        newRoutes.splice(indexToRemove, 1)
        props.setRoutes(newRoutes);
        //Force parent component to update.
        const newChildKey: number = Math.floor(Math.random() * 100000);
        props.setChildKey(newChildKey);
      }else if(mouseup === false && redPercentage > 10){
        backgroundColorDiv.style.background = `linear-gradient(90deg, #ffffff ${100 - redPercentage}%, #ff0000 ${redPercentage}%)`
      } else if (mouseup === true){
        backgroundColorDiv.style.background = `transparent`
        clearInterval(intervalID);
      }
    }, 50)

  }

  function handleOnDragEnd(result){
    const items = Array.from(props.routes);
    const [reOrderdRoute] = items.splice(result.source.index,1)
    items.splice(result.destination.index, 0, reOrderdRoute);

    props.setRoutes(items)
  }

  let routerDisplay = [];
  if(props.routes){
    for (let i = 0; i < props.routes.length; i++){
      let currRoute = props.routes[i];
      routerDisplay.push(currRoute);
    }
  }

  return (
    <div>
      <Paper style = {{marginLeft:'2.5vw', marginTop:'2.5vh', height:'35vh', maxHeight:'100%', overflow:'auto'}}>
        <Divider/>
          <List>
            <ListItem 
              id = {`routing-selection_router text`}
              button key={'router'}
            >
              <ListItemText 
                classes={{primary:classes.listItemRouter}}
                primary={'router'}
              />
            </ListItem>
          </List>
            <DragDropContext onDragEnd ={handleOnDragEnd}>
              <Droppable droppableId = 'routes'>
                {(provided) => (
                  <List
                    className = 'routes'
                    {...provided.droppableProps}
                    ref = {provided.innerRef}
                  >
                    {routerDisplay.map((text,index) =>(
                      <Draggable
                        key = {index}
                        draggableId = {`routing-selection_${index}`}
                        index = {index}
                      >
                        {(provided) =>(
                          <div 
                            id = {`routing-background-color-selection_${index}`}
                            style = {{height:'auto'}}
                          >
                            <ListItem 
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref = {provided.innerRef}
                              key = {index}
                              id = {`routing-selection_${index}`}
                              classes={{primary:classes.listItem}}
                              button key={index}
                              onMouseDown = {(e) => handleMouseDown(e)}
                            >
                              <ListItemText 
                                classes={{primary:classes.listItemText}}
                                primary={text}
                              />
                            </ListItem>
                        </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </List>
                  )
                }
              </Droppable>
            </DragDropContext>
      </Paper>
    </div>
  );
}
