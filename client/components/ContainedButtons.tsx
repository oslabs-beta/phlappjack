import { React } from "../deps.ts";

import { Button, makeStyles, createStyles, Theme } from 'https://cdn.skypack.dev/@material-ui/core/?dts';
// import {MenuIcon} from "https://cdn.skypack.dev/@material-ui/icons@next";
// import {makeStyles} from 'https://cdn.skypack.dev/@material-ui/styles';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

export default function ContainedButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained">Default</Button>
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Button variant="contained" color="secondary">
        Secondary
      </Button>
      <Button variant="contained" disabled>
        Disabled
      </Button>
      <Button variant="contained" color="primary" href="#contained-buttons">
        Link
      </Button>
    </div>
  );
}