import * as React from 'react'
const { useState,useEffect,useRef } = React;
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

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

  const [dbBeingEdited, setdbBeingEdited ] = useState();

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
        
        //Remove relevant endpoints from props.endPoints.
        const newEndPoints = props.endPoints;
        let newEndPointNames = Object.keys(newEndPoints);
        newEndPointNames.filter((val) =>{
          if(val.indexOf(indexToRemove) > -1) delete newEndPoints[val]
        })
        props.setEndPoints(newEndPoints);

        delete newDBInputDisplay[indexToRemove];
        props.setDBInputDisplay(newDBInputDisplay);
        props.setDBBeingModified('DB Input Field');
      }else if(mouseup === false && redPercentage > 10){
        selectedKeyValueEle.style.background = `linear-gradient(90deg, #ffffff ${100 - redPercentage}%, #ff0000 ${redPercentage}%)`
      } else if (mouseup === true){
        selectedKeyValueEle.style.background = `transparent`
        clearInterval(intervalID);
      }
    }, 50)

  }

  const useClickOutside = (ref) => {
    const handleClick = e => {

      if (ref.current && !ref.current.contains(e.target)) {
        const newDBNameState = new Array(Object.keys(props.dbInputDisplay).length).fill(true).map((item, idx) => true);
        props.setDBToggles(newDBNameState);
        const dbName: string = dbBeingEdited;
        const newDBInputDisplay = props.dbInputDisplay;
        const modifiedDBInputFields = newDBInputDisplay[dbName];
        delete newDBInputDisplay[dbName];
        newDBInputDisplay[props.editDBTextFieldValue] = modifiedDBInputFields;
        props.setDBInputDisplay(newDBInputDisplay);
    
        //Remove relevant endpoints from props.endPoints.
        const newEndPoints = props.endPoints;
        let newEndPointNames = Object.keys(newEndPoints);
        newEndPointNames.forEach((val) =>{ 
          if(val.indexOf(dbName) > -1 && ( val.length === dbName.length + 1 ) || (val.indexOf(dbName + ':') > -1)){
            let newValue: string = val.replace(dbName,props.editDBTextFieldValue);
            delete newEndPoints[val];
            newEndPoints[newValue] = [];
          }
        })
        props.setEndPoints(newEndPoints)
        //Rename relevant routes that included the previous names.
        const newRoutes = props.routes;
        newRoutes.forEach((route,index) =>{
          if(route.indexOf(dbName) > -1) newRoutes[index] = route.replace(dbName,props.editDBTextFieldValue);
        })
        //Force parent component to update.
        const newChildKey0: number = props.childKey0 + 1;
        props.setChildKey0(newChildKey0)
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
    props.setEditDBTextFieldValue(e.target.value);
    setdbBeingEdited(e.target.id);
  }

  let dbNames = [];
  if(Object.keys(props.dbInputDisplay).length){
    dbNames = Object.keys(props.dbInputDisplay);
  }
  dbNames.sort();

  return (
    <div>
      <Paper style = {{marginLeft:'2.5vw', marginTop:'2.5vh', marginRight:'2.5vw', height:'35vh'}}>
        <Divider/>
          <List style={{maxHeight: '100%', overflow: 'auto'}}>
            {dbNames.map((text, index) => (
              props.dbToggles[index] ? (
                <ListItem 
                  id = {`db-selection_${text}`}
                  button key={text}
                >
                  <ListItemText 
                    primary={text}
                    classes={{primary:classes.listItemText}}
                    onClick = {(e) => handleSelection(e)}
                    onMouseDown = {(e) => handleMouseDown(e)}
                    onDoubleClick = {() =>{
                      let newDBToggleState = props.dbToggles;
                      newDBToggleState[index] = false;
                      props.setDBToggles(newDBToggleState);
                      props.setEditDBTextFieldValue(text)
                      //Force parent component to update.
                      const newChildKey0: number = props.childKey0 + 1;
                      props.setChildKey0(newChildKey0)
                    }}
                  />
                </ListItem>
              ) : (
                <div ref = {editField}>
                  <TextField
                    className ='edit-text-field'
                    id = {text}
                    multiline = {true}
                    inputProps = {{style:{textAlign:'center', fontSize:'1.5em'}}}
                    style = {{
                      width:'20vw'
                    }}
                    rows = {2}
                    value = {props.editDBTextFieldValue}
                    onChange = {handleChange}
                  />
                </div>
              )
            ))}
            </List>
      </Paper>
    </div>
  );
}
