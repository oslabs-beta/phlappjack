import React from 'react';
import { createStyles, Grid, Paper} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
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
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef<number>();

    const [name, setName] = React.useState('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    };
  
    const buttonClassname = clsx({
      [classes.buttonSuccess]: success,
    });

    React.useEffect(() => {
        return () => {
          clearTimeout(timer.current);
        };
      }, []);

    const handleButtonClick = () => {
        if (!loading) {
          setSuccess(false);
          setLoading(true);
          timer.current = window.setTimeout(() => {
            setSuccess(true);
            setLoading(false);
          }, 2000);
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
                      disabled={success}
                      required
                      fullWidth
                      placeholder="Enter Github Url"
                    />
                  </form>
                  <div className={classes.wrapper}>
                    <Button
                        id="deploy-button"
                        variant="contained"
                        color="secondary"
                        size="large"
                        className={buttonClassname}
                        disabled={loading}
                        startIcon={success ? <CheckIcon /> : <PublishRoundedIcon />}
                        onClick={handleButtonClick}
                    >
                        {success ? "Deployed" : "Deploy"}
                    </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                </Grid>
                 <Grid sm={4}  item>
                </Grid>
             </Grid>
            </Paper>
           </Grid>
    )
}