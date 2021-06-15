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
      //Middleware template for findAll
      if(props.resMethod == 'get' && !props.selectedEndPoint.includes(':')){
        const currModel: string = props.selectedEndPoint.split('/')[1];
        const currModelInput: string = props.dbInputDisplay[currModel][0].toString().split(':')[0];
        newMiddleWareTemp =`.${props.resMethod}('${props.selectedEndPoint}', async (ctx) => {
      \tconst ${currModel}_findAll = await ${currModel}.find({ 
      \t\t_id: { $ne: null } 
      \t}).toArray();
      \tctx.response.body = ${currModel}_findAll;
    })
        `
      //Middleware template for find based on specified input field.
      } else if (props.resMethod == 'get' && props.selectedEndPoint.includes(':')){
        const currModel: string = props.selectedEndPoint.split('/')[1].split(':')[0];
        newMiddleWareTemp =`.${props.resMethod}('${props.selectedEndPoint}', async (ctx) => {
    \tif(ctx.params && ctx.params.id){
    \t\tconst ${currModel}_findOne = await ${currModel}.findOne({ 
    \t\t\t _id:ctx.params.id
    \t\t});
    \t\tctx.response.body = ${currModel}_findOne;
    \t}
  })
      `
      //Middleware template for insert one.
      } else if (props.resMethod == 'post' && !props.selectedEndPoint.includes(':')){
        const currModel: string = props.selectedEndPoint.split('/')[1];
        const currModelInput: string = props.dbInputDisplay[currModel][0].toString().split(':')[0];
        newMiddleWareTemp =`.${props.resMethod}('${props.selectedEndPoint}', async (ctx) => {
    \tconst body = await ctx.request.body()
    \tconst value = body.value;
    \tconst ${currModel}_insertOne = await ${currModel}.insert(value);
    \tctx.response.body = ${currModel}_insertOne;
    })
        `
      //Middleware template for update one.
      } else if (props.resMethod == 'patch' && props.selectedEndPoint.includes(':')){
        const currModel: string = props.selectedEndPoint.split('/')[1].split(':')[0];
        const currModelInput: string = props.selectedEndPoint.split(':')[1];
        newMiddleWareTemp =`.${props.resMethod}('${props.selectedEndPoint}', async (ctx) => {
      \tif(ctx.params && ctx.params.id && ctx.params.${currModelInput}){
      \t\tconst ${currModel}_updateOne = await ${currModel}.updateOne(
      \t\t\t{_id:ctx.params.id},
      \t\t\t{${currModelInput}:ctx.params.${currModelInput}}
      \t\t);
      \t}
      \tctx.response.body = ${currModel}_updateOne;
      \t}
    })
        `
      //Middleware template for update many.
      } else if(props.resMethod == 'put' && props.selectedEndPoint.includes(':')){
        const currModel: string = props.selectedEndPoint.split('/')[1].split(':')[0];
        const currModelInput: string = props.selectedEndPoint.split(':')[1];
        newMiddleWareTemp =`.${props.resMethod}('${props.selectedEndPoint}', async (ctx) => {
      \tif(ctx.params && ctx.params.id && ctx.params.${currModelInput}){
      \t\tconst ${currModel}_updateMany = await ${currModel}.updateMany(
      \t\t\t{${currModelInput}:{ $ne:ctx.params.${currModelInput}}},
      \t\t\t{${currModelInput}:ctx.params.${currModelInput}}
      \t\t);
      \t\tctx.response.body = ${currModel}_updateMany;
      \t}
    })
        `
      //Middleware template for delete many.
      } else if(props.resMethod == 'delete' && props.selectedEndPoint.includes(':')){
        const currModel: string = props.selectedEndPoint.split('/')[1].split(':')[0];
        const currModelInput: string = props.selectedEndPoint.split(':')[1];
        newMiddleWareTemp =`.${props.resMethod}('${props.selectedEndPoint}', async (ctx) => {
      \tif(ctx.params && ctx.params.id){
      \t\tconst ${currModel}_deleteMany = await ${currModel}.deleteMany({
      \t\t\t_id: ctx.params.id 
      \t\t});
      \t\tctx.response.body = ${currModel}_deleteOne;
      \t}
    })
        `
      //Middleware template for delete one.
      } else if(props.resMethod == 'delete' && !props.selectedEndPoint.includes(':')){
        const currModel: string = props.selectedEndPoint.split('/')[1].split(':')[0];
        const currModelInput: string = props.selectedEndPoint.split(':')[1];
        newMiddleWareTemp =`.${props.resMethod}('${props.selectedEndPoint}', async (ctx) => {
      \tif(ctx.params && ctx.params.id){
      \t\tconst ${currModel}_deleteMany = await ${currModel}.deleteMany({
      \t\t\t${currModelInput}:{ $ne:ctx.params.${currModelInput}}
      \t\t},
      \t\t{
      \t\t\t${currModelInput}:ctx.params.${currModelInput}}
      \t\t);
      \t\tctx.response.body = ${currModel}_deleteMany;
    })
        `
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