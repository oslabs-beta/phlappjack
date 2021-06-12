import * as React from 'react'

import TextField from '@material-ui/core/TextField';

export default function DBInputFieldKey(props){

  const handleClick = (e) =>{
    if(e.keyCode === 13){
      e.preventDefault();
    }
  }

  return (
    <div>
      <form>
        <TextField
          id="key-input-field"
          label="Enter Key"
          variant="outlined"
          color="secondary"
          onKeyDown={handleClick}
        />
      </form>
    </div>
  );
}
