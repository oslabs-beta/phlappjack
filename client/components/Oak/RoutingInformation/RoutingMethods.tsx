import * as React from 'react'
const { useState, useEffect } = React;

import { createStyles, makeStyles, Paper} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import ExistingModelsDisplay from './ExistingModelsDisplay'
import DBNameInput from './DBNameInput';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      width: '20vw',
    },
  }),
);

export default function RoutingMethods(props){
  const classes = useStyles();

  const [ childKey,setChildKey ] = useState(0);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const resEle = event.target as HTMLElement;
    const index: number = resEle.value;
    props.setResMethod(responses[index].toLowerCase());
    //Force parent element to re-render.
    const newChildKey0: number = Math.floor(Math.random() * 100000);
    props.setChildKey(newChildKey0);
  };

  const labelDisplay = () => {
    if(props.resMethod == '') return 'Please select a response method';
    else return props.resMethod;
  };

  const responses = ['DELETE','GET','PATCH','POST','PUT'];

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">{labelDisplay()}</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={status}
        onChange={handleChange}
        label="Result"
      >
        {responses.map((text,index) =>(
          <MenuItem value={index}>{text}</MenuItem>
        ))}
      </Select>
  </FormControl>
  );
}
