import * as React from 'react'
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

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
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
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

export default function DBNameInput(props){
  const classes = useStyles();

  const handleKeyPress = (e) => {
    if(e.keyCode === 13){
      e.preventDefault();
      const collectionInputEle = e.target as HTMLElement;
      props.setDBBeingModified(collectionInputEle.value)
      if (!props.dbInputDisplay[collectionInputEle.value]){
        const newDBInputDisplay = props.dbInputDisplay;
        newDBInputDisplay[collectionInputEle.value] = [];
        props.setDBInputDisplay(newDBInputDisplay);

        const newEndPoint: string = String('/' + collectionInputEle.value);
        const newEndPoints = props.endPoints;
        newEndPoints[newEndPoint] = [];
        props.setEndPoints(newEndPoints);
      }
      collectionInputEle.value = '';
    }
  }

  return (
    <div style={{marginLeft:'2.5vw', marginRight:'2.5vw', marginTop:'1vh'}}>
      <form>
        <TextField
          id="Specifiy DB Input field"
          label="Enter New DB Name"
          variant="outlined"
          color="secondary"
          style = {{width:'20vw'}}
          onKeyDown = {(e) => handleKeyPress(e)}
        />
      </form>
    </div>
  );
}
