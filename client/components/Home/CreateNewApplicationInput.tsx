import * as React from 'react'
import TextField from '@material-ui/core/TextField';

export default function CreateNewApplicationInput(props){

  const handleKeyPress = (e) => {
    if(e.keyCode === 13){
      e.preventDefault();
      const createNewAppEle = e.target as HTMLElement;
      props.setNewApplication(createNewAppEle.value);
      createNewAppEle.value = '';
      //Force parent component to update.
      const newChildKey: number = Math.floor(Math.random() * 100000);
      props.setChildKey(newChildKey);
    }
  }

  return (
      <form>
        <TextField
          id = "cerate-new-application-input-field"
          label=""
          placeholder="Application Name"
          variant="outlined"
          color="secondary"
          onKeyDown={(e) => handleKeyPress(e)} 
        />
      </form>
  );
}
