import * as React from 'react'
const { useState, useEffect } = React;

import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import ExistingModelsDisplay from './ExistingModelsDisplay'
import DBNameInput from './DBNameInput';
import { TextFieldsOutlined } from '@material-ui/icons';

const styles = {
  container: {
      display: 'flex',
      flexWrap: 'wrap',
  },
  textField: {
      width: 300,
      margin: 100,
  },
  //style for font size
  resize:{
    fontSize:50
  },
  }

export default function Middleware(props){

  const handleChange = (e) =>{
    props.setMiddleWareTemp(e.target.value)
  }

  const handKeyDown = (e) =>{
    if(e.keyCode === 9){ 
      e.preventDefault();
      document.execCommand('insertText', false, "\t");
    }
  }

  useEffect(() =>{

    const dbNames = Object.keys(props.dbInputDisplay);
    const endPointName: string = props.selectedEndPoint;
    let dbName: string;
    if(props.selectedEndPoint.includes(':')){
      dbName = endPointName.split(':')[0];
      dbName = dbName.split('/')[1];
    } else {
      dbName = endPointName.split('/')[1];
    }

    if(!props.selectedEndPoint || dbName && !props.dbInputDisplay[dbName].length) return;

    let newMiddleWareTemp: string;

    if( props.selectedEndPoint !== 'Routing Information' && props.resMethod && dbNames.indexOf(dbName) > -1){
      //Middleware template for findAll (works)
      if(props.resMethod == 'get' && !props.selectedEndPoint.includes(':')){
        const currModel: string = props.selectedEndPoint.split('/')[1];
        const currModelInput: string = props.dbInputDisplay[currModel][0].toString().split(':')[0];
        newMiddleWareTemp =`.${props.resMethod}('${props.selectedEndPoint}', async (ctx) => {
  \tconst ${currModel}_findAll = await ${currModel}.find( 
  \t\t{_id: { $ne: null }},
  \t\t{noCursorTimeout: false}
  \t).toArray();
  \tctx.response.body = ${currModel}_findAll;
  })`
      //Middleware template for find based on specified input field. (works)
      } else if (props.resMethod == 'get' && props.selectedEndPoint.includes(':id')){
        const currModel: string = props.selectedEndPoint.split('/')[1].split(':')[0];
        newMiddleWareTemp =`.${props.resMethod}('${props.selectedEndPoint}', async (ctx) => {
  \tconst { id } = helpers.getQuery(ctx, {mergeParams: true });
  \tif( id ){
  \t\tconst ${currModel}_findOne = await ${currModel}.findOne(
  \t\t\t{_id: new Bson.ObjectId(String(id))},
  \t\t\t{ noCursorTimeout:false }
  \t\t);
  \t\tctx.response.body = ${currModel}_findOne;
  \t}
  })`
      //Middleware template for insert one. (works)
      } else if (props.resMethod == 'post' && !props.selectedEndPoint.includes(':')){
        const currModel: string = props.selectedEndPoint.split('/')[1];
        const currModelInput: string = props.dbInputDisplay[currModel][0].toString().split(':')[0];
        newMiddleWareTemp =`.${props.resMethod}('${props.selectedEndPoint}', async (ctx) => {
  \tconst body = await ctx.request.body()
  \tconst value = await body.value;
  \tconst ${currModel}_insertOne = await ${currModel}.insert(value);
  \tctx.response.body = ${currModel}_insertOne;
  })`
      //Middleware template for update one. (works)
      } else if (props.resMethod == 'patch' && props.selectedEndPoint.includes(':')){
        const currModel: string = props.selectedEndPoint.split('/')[1].split(':')[0];
        const currModelInput: string = props.selectedEndPoint.split(':')[1];
        newMiddleWareTemp =`.${props.resMethod}('${props.selectedEndPoint}', async (ctx) => {
    \tconst { id, ${currModelInput} } = helpers.getQuery(ctx, {mergeParams: true });
    \tif(id && ${currModelInput}){
    \t\tconst ${currModel}_updateOne = await ${currModel}.updateOne(
    \t\t\t{_id:new Bson.ObjectId(id)},
    \t\t\t{$set:{${currModelInput}:${currModelInput}}}
    \t\t);
    \tctx.response.body = ${currModel}_updateOne;
    }
  })`
      //Middleware template for update many. (works)
      } else if(props.resMethod == 'put' && props.selectedEndPoint.includes(':')){
        const currModel: string = props.selectedEndPoint.split('/')[1].split(':')[0];
        const currModelInput: string = props.selectedEndPoint.split(':')[1];
        newMiddleWareTemp =`.${props.resMethod}('${props.selectedEndPoint}', async (ctx) => {
  const { ${currModelInput} } = helpers.getQuery(ctx, {mergeParams: true });
  if(${currModelInput}){
  \tconst ${currModel}_updateMany = await ${currModel}.updateMany(
  \t\t{${currModelInput}:{ $ne: null}},
  \t\t{$set:{${currModelInput}: ${currModelInput}}}
  \t);
  \tctx.response.body = ${currModel}_updateMany;
  }
})`
      //Middleware template for delete one.
      } else if(props.resMethod == 'delete' && props.selectedEndPoint.includes(':id')){
        const currModel: string = props.selectedEndPoint.split('/')[1].split(':')[0];
        const currModelInput: string = props.selectedEndPoint.split(':')[1];
        newMiddleWareTemp =`.${props.resMethod}('${props.selectedEndPoint}', async (ctx) => {
  const { id } = helpers.getQuery(ctx, {mergeParams: true });
  if( id ){
  \tconst ${currModel}_deleteOne = await ${currModel}.deleteOne({
  \t\t_id: new Bson.ObjectId(id)
  \t});
  \tctx.response.body = ${currModel}_deleteOne;
  }
})`
      //Middleware template for delete many.
      } else if(props.resMethod == 'delete' && props.selectedEndPoint.includes(':')){
        const currModel: string = props.selectedEndPoint.split('/')[1].split(':')[0];
        const currModelInput: string = props.selectedEndPoint.split(':')[1];
        newMiddleWareTemp =`.${props.resMethod}('${props.selectedEndPoint}', async (ctx) => {
  const { ${currModelInput} } = helpers.getQuery(ctx, {mergeParams: true });
  if( ${currModelInput} ){
  \tconst ${currModel}_deleteMany = await ${currModel}.deleteMany({
  \t\t${currModelInput}:ctx.params.${currModelInput}
  \t});
  \tctx.response.body = ${currModel}_deleteMany;
  }
})`
      }else { 

        newMiddleWareTemp = '';

      }

    } else if( props.selectedEndPoint !== 'Routing Information' && props.resMethod ) {

      newMiddleWareTemp =`.${props.resMethod}('${props.selectedEndPoint}', async (ctx) => {
      
    })
          `
    }
    props.setMiddleWareTemp(newMiddleWareTemp)
  },[props.resMethod, props.selectedEndPoint])

  // const generateLineNumbers = () => {
  //   let lineNumberStr = '';
  //   for (let i = 1; i <= 100; i ++){
  //     lineNumberStr += i + '\n'
  //   }
  //   return lineNumberStr;
  // }

  return (
    <Paper 
      style = {{marginLeft:'2.5vw', width:'20vw'}}
      elevation = {2}
    >
      <TextField
        id = 'middleware-input'
        value = {props.middleWareTemp}
        multiline={true}
        placeholder = {'Enter routing and middleware for the selected endpoint'}
        rows={21}
        style = {{width:'100%',overflow: 'auto'}}
        inputProps={{
          style: {fontSize: '0.85em'},
          //todo
          // startAdornment: <InputAdornment position="start">Kg</InputAdornment>
        }}
        onKeyDown = {handKeyDown}
        onChange = {handleChange}
      />
    </Paper>
  );
}