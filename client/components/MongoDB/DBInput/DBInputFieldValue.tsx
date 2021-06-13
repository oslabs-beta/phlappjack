import * as React from 'react'

import TextField from '@material-ui/core/TextField';

export default function DBInputFieldValue(props){

  const handleClick = (e) =>{
    if(e.keyCode === 13){
      e.preventDefault();
      if(props.dbInputDisplay[props.dbBeingModified]){
        const keyEle = (document.getElementById("key-input-field")) as HTMLInputElement;
        const newKeyValue = keyEle.value;
        keyEle.value = '';
        const valueEle = (document.getElementById("value-input-field")) as HTMLInputElement;
        const newValueEle = valueEle.value;
        valueEle.value = '';
  
        const newDBInputDisplay = props.dbInputDisplay;
        newDBInputDisplay[props.dbBeingModified].push([`${newKeyValue}:  ${newValueEle};`]);
        props.setDBInputDisplay(newDBInputDisplay)

        //Force parent component to update.
        const newChildKey2: number = props.childKey2 + 1;
        props.setChildKey2(newChildKey2)
      }else {
        alert('Please select an existing model.')
        const keyEle = (document.getElementById("key-input-field")) as HTMLInputElement;
        keyEle.value = '';
        const valueEle = (document.getElementById("value-input-field")) as HTMLInputElement;
        valueEle.value = '';
      }
    }
  }

  return (
    <div style={{marginLeft:'0.5vw', marginRight:'2.5vw'}}>
      <form>
        <TextField
          id="value-input-field"
          label="Enter Key Definition"
          variant="outlined"
          color="secondary"
          onKeyDown={handleClick}
        />
      </form>
    </div>
  );
}
