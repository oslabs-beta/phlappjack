import * as React from 'react'
import TextField from '@material-ui/core/TextField';


export default function MongoHostInput(props){

  const handleKeyPress = (e) => {
    if(e.keyCode === 13){
      e.preventDefault();
      const mongoHostInputEle = e.target as HTMLElement;
      props.setAtlasHostCluster(mongoHostInputEle.value)
      mongoHostInputEle.value = '';
    }
  }

  return (
    <div style={{marginLeft:'2.5vw', marginTop:'0.5vw'}}>
      <form>
        <TextField
          id = "mongo-host-cluster-input-field"
          label="Enter Mongo Atlas Host Cluster"
          variant="outlined"
          color="secondary"
          style = {{width:'20vw'}}
          onKeyDown={(e) => handleKeyPress(e)} 
        />
      </form>
    </div>
  );
}
