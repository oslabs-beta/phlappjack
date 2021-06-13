import * as React from 'react'
import TextField from '@material-ui/core/TextField';


export default function MongoDBInput(props){

  const handleKeyPress = (e) => {
    if(e.keyCode === 13){
      e.preventDefault();
      const mongoDBInputEle = e.target as HTMLElement;
      props.setAtlasDB(mongoDBInputEle.value)
      mongoDBInputEle.value = '';
    }
  }

  return (
    <div style={{marginLeft:'2.5vw', marginTop:'0.5vw'}}>
      <form>
        <TextField
          id = "mongoUri-input-field"
          label="Enter Mongo Atlas Database to connect"
          variant="outlined"
          color="secondary"
          style = {{width:'20vw'}}
          onKeyDown={(e) => handleKeyPress(e)} 
        />
      </form>
    </div>
  );
}
