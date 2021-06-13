import * as React from 'react'
import TextField from '@material-ui/core/TextField';


export default function MongoUserNameInput(props){

  const handleKeyPress = (e) => {
    if(e.keyCode === 13){
      e.preventDefault();
      const mongoUserNameInputEle = e.target as HTMLElement;
      props.setAtlasUserName(mongoUserNameInputEle.value)
      mongoUserNameInputEle.value = '';
    }
  }

  return (
    <div style={{marginLeft:'2.5vw', marginTop:'0.5vw'}}>
      <form>
        <TextField
          id = "mongoUri-input-field"
          label="Enter Mongo Atlas Username"
          variant="outlined"
          color="secondary"
          style = {{width:'20vw'}}
          onKeyDown={(e) => handleKeyPress(e)} 
          onSubmit = {(e) => handleSubmit(e)}
        />
      </form>
    </div>
  );
}
