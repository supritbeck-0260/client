import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Password from './Password';
import {NavLink} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  head:{
      display:'flex',
      justifyContent:'center',
      color: '#ff0844',
      background:'White'
  },
  container:{
    display:'flex',
    justifyContent:'center',
    flexDirection:'column'
  },
  inputField:{
      width:'80%',
      margin:'6px auto'
  },
  haveAnAccountContainer:{
      display:'flex',
      justifyContent:'center',
      flexDirection:'row',
      margin:'24px 10px 10px 10px'
  },
  login:{
    color: '#ff0844',  
  },
  loginLink:{
      textDecoration:'none'
  }
}));

const Login=()=> {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs className={classes.head}>
                <Typography variant="h4">Login</Typography>
              </Grid>
              <Grid item className={classes.container}>
                    <TextField className={classes.inputField} id="outlined-basic" label="Email" variant="outlined" />
                    <Password/>
                    <Button  className={classes.inputField} variant="contained" color="secondary">Login</Button>
                    <Typography variant="span" className={classes.haveAnAccountContainer}>
                        <Typography variant="p" className={classes.haveAnAccount}>Don't have an Account? </Typography>
                        <NavLink to='/signup' className={classes.loginLink}><Typography variant="p" className={classes.login}> Signup</Typography></NavLink>
                    </Typography>
                
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
export default Login;
