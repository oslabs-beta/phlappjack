import * as React from 'react'
const { useState, useEffect } = React;

import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import ExistingModelsDisplay from './ExistingModelsDisplay.tsx'
import DBNameInput from './DBNameInput.tsx';

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
    const resStatusEle = event.target as HTMLElement;
    const index: number = resStatusEle.value;
    props.setResStatus(statuses[index]);
  };

  const labelDisplay = () => {
    if(props.resStatus == '') return 'Please select a response status';
    else return props.resStatus;
  };

  const statuses: Array<String> = ['200 OK','201 Created','301 Moved','404 Not Found'];

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
        {statuses.map((text,index) =>(
          <MenuItem value={index}>{text}</MenuItem>
        ))}
      </Select>
  </FormControl>
  );
}