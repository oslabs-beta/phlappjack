import * as React from 'react'

import TextField from '@material-ui/core/TextField';

export default function EndPointNameInput(){

  return (
    <div style={{marginLeft:'2.5vw', marginTop:'1vh', width:'20vw'}}>
      <form>
        <TextField
          id="Specifiy Endpoint Name"
          label="Enter new endpoint"
          variant="outlined"
          color="secondary"
          style = {{width:'20vw'}}
        />
      </form>
    </div>
  );
}
