import React from 'react';
import { AppBar, Grid, Toolbar, Typography, IconButton, createStyles} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }));



export default function Header(props){
    const classes = useStyles();

    const onRender = () =>{
      if(props.newApplication) return String('Working on ' + props.newApplication)
      else return 'Please load or create an application';
    }
    

    return (
        <AppBar className={clsx(classes.appBar, {
          [classes.appBarShift]: props.open,
        })} position="static">
            <Toolbar >
            <IconButton
              edge="start"
              color="inherit" 
              aria-label="menu"  
              onClick={props.handleDrawerOpen}
              className={clsx(classes.menuButton, props.open && classes.hide)}
            >
                <MenuIcon />
            </IconButton>
            <Grid container justify="space-between">
                <Typography variant="h5" >Phlappjack</Typography>
                <Typography align="right" variant="h5" >{onRender()}</Typography>
            </Grid>
            </Toolbar>
        </AppBar>
    )
}