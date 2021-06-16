import * as React from 'react'
const { useEffect, useState, useRef } = React;
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
      fontSize:'1em',
      textAlign:'left',
    },
    listItemText:{
      fontSize:'1em',
      textAlign:'left',
      marginLeft:'1.5em',
      // marginTop:'-1.0em',
      // marginBottom:'-1.0em',
      whiteSpace: 'pre-wrap',
    }
  }),
);

export default function RouteExecutionOrderDisplay(props){

  const classes = useStyles();

  const handKeyDown = (e) =>{
    if(e.keyCode === 9){ 
      e.preventDefault();
      document.execCommand('insertText', false, "\t");
    }
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
        const indexToRemove: number = selectedRouteEle.parentNode.parentNode.id.split('_')[1];
        console.log(indexToRemove)
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

  const useClickOutside = (ref) => {
    const handleClick = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        const newToggleState = new Array(props.routes.length).fill(true).map((item, idx) => true);
        props.setRouteToggles(newToggleState);
      }
    };
    useEffect(() => {
      document.addEventListener('click', handleClick);
      return () => {
        document.removeEventListener('click', handleClick);
      };
    });
  };

  const editField = useRef();

  useClickOutside(editField);

  const handleChange = (e) =>{
    props.setEditRouteTextFieldValue(e.target.value)
    const routeIndex: number = e.target.id;
    const newRoutes = props.routes;
    newRoutes[routeIndex] = e.target.value;
    props.setRoutes(newRoutes);
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
      <Paper style = {{marginLeft:'2.5vw', marginTop:'2.5vh', height:'42vh', maxHeight:'100%', overflow:'auto', width:'25vw'}}>
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
                            {props.routeToggles[index] ? (
                              <ListItem 
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref = {provided.innerRef}
                                key = {index}
                                id = {`routing-selection_${index}`}
                                classes={{primary:classes.listItem}}
                                button key={index}
                                onMouseDown = {(e) => handleMouseDown(e)}
                                onDoubleClick = {() =>{
                                  let newRoutesToggleState = props.routeToggles;
                                  newRoutesToggleState[index] = false;
                                  props.setRouteToggles(newRoutesToggleState);
                                  props.setEditRouteTextFieldValue(props.routes[index])
                                  //Force parent component to update.
                                  const newChildKey: number = Math.floor(Math.random() * 100000);
                                  props.setChildKey(newChildKey);
                                }}
                              >
                                <ListItemText 
                                  classes={{primary:classes.listItemText}}
                                  primary={text}
                                />
                              </ListItem>
                            ) : (
                              <div ref = {editField}>
                                <TextField
                                  id = {index}
                                  multiline = {true}
                                  style = {{
                                    width:'20vw', 
                                    marginLeft: '1.5em'
                                  }}
                                  rows = {8}
                                  value = {props.editRouteTextFieldValue}
                                  onChange = {handleChange}
                                  onKeyDown = {handKeyDown}
                                />
                              </div>
                            )}
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
