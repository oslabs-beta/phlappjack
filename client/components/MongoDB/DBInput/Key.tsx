import * as React from 'react'

import TextField from '@material-ui/core/TextField';

export default function DBInputFieldKey(){

  return (
    <div>
      <form>
        <TextField
          id="key-input-field"
          label="Enter Key"
          variant="outlined"
          color="secondary"
        />
      </form>
    </div>
  );
}
