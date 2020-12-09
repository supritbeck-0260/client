import React, { useContext, useEffect, useState } from 'react';
import {AuthContex} from '../App';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Password from './Password';
import {NavLink} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Axios from 'axios';
import {useParams , useHistory} from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
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
  },
  alert:{
    width: '74%',
    margin: '0 auto',
  }
}));

const Login=(props)=> {
  const history = useHistory();
  const classes = useStyles();
  const {id} = useParams();
  const [user,setUser] = useState({email:'',password:''});
  const [message,setMessage] = useState(null);
  const [severity,setSeverity] = useState(null);
  const [loading,setLoading] = useState(false);
  const [emailAlert,setEmailAlert] = useState(false);
  const [passAlert,setPassAlert] = useState(false);
  const [open,setOpen] = useState(false);
  const [emailVerification,setEmailVerification] = useState(null);
  const auth = useContext(AuthContex);
  const setData = (field,value)=>{
    setEmailAlert(false);
    setPassAlert(false);
    setMessage(null);
    setUser(prev=>{
      prev[field]=value.trim();
      return {...prev}
    });
  } 

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const postToken = (id)=>{
    Axios.post(process.env.REACT_APP_SERVER_URL+'/auth/token',{token:id}).then(response=>{
      if(response.data.message){
        switch(response.status){
          case 200:
              setSeverity('success');
              setOpen(true);
              setEmailVerification(response.data.message);
              break;
          case 201:
              setSeverity('error');
              setOpen(true);
              setEmailVerification(response.data.message);
              break;
          case 500:
              setSeverity('error');
              setOpen(true);
              setEmailVerification(response.data.message);
              break;
        }
      }
    });
  }
  useEffect(()=>{
    if(id)
    postToken(id);
  },[]);
  const validate = ()=>{
    if(!user.email){
      setEmailAlert(true);
      return false;
    }else if(!user.password){
      setPassAlert(true);
      return false;
    }else{
      login();
    }
  }
  const login = ()=>{
    setLoading(true);
    Axios.post(process.env.REACT_APP_SERVER_URL+'/auth/login',user).then(response=>{
      console.log('Login:',response);
      if(response.data){
        switch(response.status){
          case 200:
              setSeverity('success');
              setMessage(response.data.message);
              auth.login(response.data.token,response.data.userID,response.data.avatar);
              history.push('/profile/'+response.data.userID);
              break;
          case 201:
              setSeverity('error');
              setMessage(response.data.message);
              break;
          case 500:
              setSeverity('error');
              setMessage(response.data.message);
              break;
        }
      }
      setLoading(false);
    });
  }
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
                    <TextField className={classes.inputField} onChange={(e)=>setData('email',e.target.value)} id="outlined-basic" label="Email" variant="outlined" />
                    {emailAlert?<Alert className={classes.alert} severity="error">Please enter your Email</Alert>:null}
                    <Password label='Password' setData={setData} type='p' values={user.password}/>
                    {passAlert?<Alert className={classes.alert} severity="error">Please enter your password.</Alert>:null}
                    <Button  className={classes.inputField} variant="contained" onClick={validate} disabled={loading} color="secondary">{!loading?'Login':'...'}</Button>
                    {message?<Alert className={classes.alert} severity={severity}>{message}</Alert>:null}
                    <Typography variant="subtitle1" className={classes.haveAnAccountContainer}>
                        <Typography variant="body1" className={classes.haveAnAccount}>Don't have an Account? </Typography>
                        <NavLink to='/signup' className={classes.loginLink}><Typography variant="body1" className={classes.login}> Sign Up</Typography></NavLink>
                    </Typography>
                
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar open={open} anchorOrigin={{vertical: 'center', horizontal: 'center',}} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} variant="filled" severity={severity}>{emailVerification}</Alert>
      </Snackbar>
    </div>
  );
}
export default Login;
