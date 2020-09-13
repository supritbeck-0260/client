import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Img from './img1.jpg';
import Info from './Info';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import infoUpdateReducer from './Redux/Index';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin:'76px 0px 0px 0px',
    
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    boxShadow:'0 0 5px 1px lightgrey',

  },
  paperImage: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
    boxShadow:'0 0 5px 1px lightgrey',

  },
  image:{
    maxWidth: '100%',
   maxHeight: '333px'
   
}
}));

const MyGrid = () => {
  const store = createStore(infoUpdateReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paperImage}>
            <img className={classes.image} src={Img} alt='image'></img>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <Provider store={store}>
            <Info/>
            </Provider>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default MyGrid; 