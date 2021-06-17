import React from 'react';
import { createStyles, Grid, Paper} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import GetAppIcon from '@material-ui/icons/GetApp';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles((theme:Theme) => 
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
          },
        form: {
          flex: 1,
        },
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative',
            display: 'flex',
            justifyContent: 'center'
          },
        paper: {
            margin: theme.spacing(1),
            padding: theme.spacing(6),
            flex: 1
        },
        buttonSuccess: {
            backgroundColor: green[500],
            '&:hover': {
              backgroundColor: green[700],
            },
          },
          buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
          },
    }),
    );


export default function Deno(props){
    const classes = useStyles();
    const [gitLoading, setGitLoading] = React.useState(false);
    const [gitSuccess, setGitSuccess] = React.useState(false);
    const [deployLoading, setDeployLoading] = React.useState(false);
    const [deploySuccess, setDeploySuccess] = React.useState(false);
    const timer = React.useRef<number>();

    const [name, setName] = React.useState('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    };
  
    const gitButtonClassname = clsx({
      [classes.buttonSuccess]: gitSuccess,
    });
    const deployButtonClassname = clsx({
      [classes.buttonSuccess]: deploySuccess,
    });

    React.useEffect(() => {
        return () => {
          clearTimeout(timer.current);
        };
      }, []);

    const handleButtonClickGit = () => {
      console.log(props.newApplication)
      console.log(name)
      fetch(`/gitclone/${props.newApplication}`, {
        method: "POST",
        body: name
      })
        if (!gitLoading) {
          setGitSuccess(false);
          setGitLoading(true);
          timer.current = window.setTimeout(() => {
            setGitSuccess(true);
            setGitLoading(false);
          }, 20000);
        }
      };
    const handleButtonClickDeploy = () => {
      console.log(props.newApplication)
      fetch(`/gitpush/${props.newApplication}`, {
        method: "POST",
        body: name
      })
        if (!deployLoading) {
          setDeploySuccess(false);
          setDeployLoading(true);
          timer.current = window.setTimeout(() => {
            setDeploySuccess(true);
            setDeployLoading(false);
          }, 5000);
        }
      };

    return (
         <Grid container  >
            <Paper className={classes.paper}>
             <Grid container>
                <Grid sm={4}  item>
                   
                </Grid>
                <Grid sm={4} container item direction="column" justify="center">
                  <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                      id="github-repo-url"
                      label=""
                      value={name}
                      onChange={handleChange}
                      // variant="outlined"
                      disabled={gitSuccess}
                      required
                      fullWidth
                      placeholder="Enter Github Url"
                    />
                  </form>
                  <div className={classes.wrapper}>
                    <Button
                        id="git-button"
                        variant="contained"
                        color="secondary"
                        size="large"
                        className={gitButtonClassname}
                        disabled={gitLoading}
                        startIcon={gitSuccess ? <CheckIcon /> : <GetAppIcon />}
                        onClick={handleButtonClickGit}
                    >
                        {gitSuccess ? "Cloned" : "Clone  "}
                    </Button>
                    {gitLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </div>
                    <div className={classes.wrapper}>
                    <Button
                        id="deploy-button"
                        variant="contained"
                        color="secondary"
                        size="large"
                        className={deployButtonClassname}
                        disabled={deployLoading}
                        startIcon={deploySuccess ? <CheckIcon /> : <PublishRoundedIcon />}
                        onClick={handleButtonClickDeploy}
                    >
                        {deploySuccess ? "Deployed" : "Deploy"}
                    </Button>
                    {deployLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                </Grid>
                 <Grid sm={4}  item>
                </Grid>
             </Grid>
            </Paper>
           </Grid>
    )
}