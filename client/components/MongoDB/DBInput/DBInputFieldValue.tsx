import * as React from 'react'

import TextField from '@material-ui/core/TextField';

export default function DBInputFieldValue(){

  return (
    <div style={{marginLeft:'0.5vw', marginRight:'2.5vw'}}>
      <form>
        <TextField
          id="value-input-field"
          label="Enter Key Definition"
          variant="outlined"
          color="secondary"
        />
      </form>
    </div>
  );
}
