import * as React from 'react'
import TextField from '@material-ui/core/TextField';


export default function MongoPasswordInput(props){

  const handleKeyPress = (e) => {
    if(e.keyCode === 13){
      e.preventDefault();
      const mongoPasswordInputEle = e.target as HTMLElement;
      props.setAtlasPassword(mongoPasswordInputEle.value)
      mongoPasswordInputEle.value = '';
    }
  }

  return (
    <div style={{marginLeft:'2.5vw', marginTop:'0.5vw'}}>
      <form>
        <TextField
          id = "mongoUri-input-field"
          label="Enter Mongo Atlas Password"
          variant="outlined"
          color="secondary"
          style = {{width:'20vw'}}
          onKeyDown={(e) => handleKeyPress(e)} 
        />
      </form>
    </div>
  );
}
