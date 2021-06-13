import * as React from 'react'
const { useState, useEffect } = React;

import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import ExistingModelsDisplay from './ExistingModelsDisplay.tsx'
import DBNameInput from './DBNameInput.tsx';
import { TextFieldsOutlined } from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      width: '20vw',
    },
  }),
);

export default function ResponseBody(props){
  const classes = useStyles();

  const [ childKey,setChildKey ] = useState(0);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const resBodyEle = event.target as HTMLElement;
    const index: number = resBodyEle.value;
    props.setResBody(responseBodies[index]);
  };

  const labelDisplay = () => {
    if(props.resBody == '') return 'Please select a response body';
    else return props.resBody;
  };

  const responseBodies: Array<String> = ['JSON Object','File','Set Cookie']

  return (
          <Paper 
            style = {{marginLeft:'2.5vw', width:'20vw'}}
            elevation = {2}
          >
            <TextField
              multiline={true}
              rows={15}
              style = {{width:'20vw'}}
            />
          </Paper>

  //   <FormControl variant="outlined" className={classes.formControl}>
  //     <InputLabel id="demo-simple-select-outlined-label">{labelDisplay()}</InputLabel>
  //     <Select
  //       labelId="demo-simple-select-outlined-label"
  //       id="demo-simple-select-outlined"
  //       value={status}
  //       onChange={handleChange}
  //       label="Result"
  //     >
  //       {responseBodies.map((text,index) =>(
  //         <MenuItem value={index}>{text}</MenuItem>
  //       ))}
  //     </Select>
  // </FormControl>
  );
}