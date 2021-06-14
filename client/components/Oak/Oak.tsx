import React from 'react';
import { createStyles, Grid, Paper} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import ExistingEndpoints from './ExistingEndPoints/ExistingEndpointsDisplay';
import EndPointNameInput from './ExistingEndPoints/EndPointNameInput';
import ExistingEndPoints from './ExistingEndPoints/ExistingEndPoints'
import RoutingInformation from './RoutingInformation/RoutingInformation'
import RouteExecutionOrder from './RoutingInformation/RouteExecutionOrder';

const useStyles = makeStyles((theme:Theme) => 
    createStyles({
        paper: {
            margin: theme.spacing(1),
            padding: theme.spacing(6),
            flex: 1
        },
    }),
    );

export default function Oak(props){

    const classes = useStyles();

    return (
         <Grid container  >
            <Paper className={classes.paper}>
             <Grid container>
                <Grid sm={4}  item>
                    <ExistingEndPoints
                        key ={props.childKey}
                        endPoints = {props.endPoints}
                        setEndPoints = {props.setEndPoints}
                        setChildKey = {props.setChildKey}
                        selectedEndPoint = {props.selectedEndPoint}
                        setSelectedEndPoint = {props.setSelectedEndPoint}
                    />
                </Grid>
                <Grid sm={4} item >
                    <RoutingInformation
                        key ={props.childKey}
                        setChildKey = {props.setChildKey}
                        selectedEndPoint = {props.selectedEndPoint}
                        setSelectedEndPoint = {props.setSelectedEndPoint}
                        endPoints = {props.endPoints}
                        setEndPoints = {props.setEndPoints}
                        routes = {props.routes}
                        setRoutes = {props.setRoutes}
                        middleWareTemp = {props.middleWareTemp}
                        setMiddleWareTemp = {props.setMiddleWareTemp}
                        dbInputDisplay = {props.dbInputDisplay}
                        setDBInputDisplay = {props.setDBInputDisplay}
                    />
                </Grid>
                 <Grid sm={4}  item>
                     <RouteExecutionOrder
                        key ={props.childKey}
                        endPoints = {props.endPoints}
                        setEndPoints = {props.setEndPoints}
                        setChildKey = {props.setChildKey}
                        selectedEndPoint = {props.selectedEndPoint}
                        setSelectedEndPoint = {props.setSelectedEndPoint}
                        routes = {props.routes}
                        setRoutes = {props.setRoutes}
                        toggles = {props.toggles}
                        setToggles = {props.setToggles}
                        editTextFieldValue = {props.editTextFieldValue}
                        setEditTextFieldValue = {props.setEditTextFieldValue}
                     />
                </Grid>
             </Grid>
            </Paper>
           </Grid>
    )
}