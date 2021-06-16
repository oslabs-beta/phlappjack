import React, {useState} from 'react';
import { IconButton, createStyles, Typography} from '@material-ui/core';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles'
import {FaHome} from 'react-icons/fa';
import {DiMongodb} from 'react-icons/di';
import {GiSquirrel} from 'react-icons/gi';
import {SiDeno} from 'react-icons/si';
import {FaDocker} from 'react-icons/fa';
import { Route } from 'react-router';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { Omit } from '@material-ui/types';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
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
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      // justifyContent: 'space-evenly',
    },
    drawerHeaderText: {
      paddingLeft: theme.spacing(8),
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}


function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}



export default function MyDrawer(props){
    const classes = useStyles();
    const theme = useTheme();

    const configureApp = () =>{

      fetch('/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(props)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch((error) => {
        console.error('error');
      });

    }

    const saveApplication = () => {
      const currApplicationName: string = props.newApplication;
      let propsToSave = {};
      const propKeys = Object.keys(props);
      for (let i = 0; i < propKeys.length; i++){
        let propValue = props[propKeys[i]];
        let propKey = String('_' + propKeys[i])
        propsToSave[propKey] = propValue;
      }

      window.localStorage.setItem(currApplicationName, JSON.stringify(propsToSave))
      const newKey: number = props.childKey + 1
      props.setChildKey(newKey)
    }

    const [sectionSelected, setSectionSelected] = useState({
      home: false,
      mongo: false,
      oak: false,
      deno: false,
      docker: false
    })
  
    const handleSelect = (selection) => {
  
    const resetState = {
      home: false,
      mongo: false,
      oak: false,
      deno: false,
      docker: false
    }
  
    const update = { resetState, [selection]: true }
    setSectionSelected(update)
  }

    return (
      <div className={classes.root}>
 
        <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <div >
            <Typography className={classes.drawerHeaderText} variant="h5">Options</Typography>
          </div>
          <IconButton onClick={props.handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List component="nav" >
          <ListItem id="Home" key={'Home'} selected={sectionSelected.home} onClick={() => handleSelect('home')}>
            <ListItemLink to="/" primary="Home" icon={<FaHome size={'42'}/>} />
          </ListItem>
          <ListItem id="mongo" key={'MongoDB'} selected={sectionSelected.mongo} onClick={() => handleSelect('mongo')}>
            <ListItemLink to="/mongo" primary="MongoDb" icon={<DiMongodb size={'42'}/>} />
          </ListItem>
          <ListItem button key={'Oak'} selected={sectionSelected.oak} onClick={() => handleSelect('oak')}>
            <ListItemLink to="/oak" primary="Oak" icon={<GiSquirrel size={'42'}/>}/>
          </ListItem>
          <ListItem button key={'Deno'} selected={sectionSelected.deno} onClick={() => handleSelect('deno')}>
          <ListItemLink to="/deno" primary="Deno" icon={<SiDeno size={'42'}/>} />
          </ListItem>
          <ListItem button key={'Docker'} selected={sectionSelected.docker} onClick={() => handleSelect('docker')}>
          <ListItemLink to="/docker" primary="Docker" icon={<FaDocker size={'42'}/>} />
          </ListItem>
        </List>
        <Divider />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          size="large"
          startIcon={<SaveIcon />}
          onClick = {saveApplication}
        >
          Save
       </Button>
       <Button
           variant="contained"
           color="secondary"
           className={classes.button}
           size="large"
           onClick = {configureApp}
        >
          Export
       </Button>
       <Divider />
      </Drawer>
    </div>
    )
}
