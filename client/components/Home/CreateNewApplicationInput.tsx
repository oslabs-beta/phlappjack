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
    <div style={{marginLeft:'2.5vw', marginTop:'0.5vw'}}>
      <form>
        <TextField
          id = "cerate-new-application-input-field"
          label="Enter the name of the new application"
          variant="outlined"
          color="secondary"
          style = {{width:'20vw'}}
          onKeyDown={(e) => handleKeyPress(e)} 
        />
      </form>
    </div>
  );
}
