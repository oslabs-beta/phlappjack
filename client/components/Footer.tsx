import React from 'react';
import {createStyles, Grid, Button, Typography} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme:Theme) => 
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
    }),
    );

export default function Footer(){
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item sm={12} direction="column" >
            <br />
            <br />
            <Typography variant="h6" color="textSecondary" align="center" >
                &#169; 2021 OSLabs, Phlappjack Inc
            </Typography>
            </Grid>
        </Grid>
    )
}