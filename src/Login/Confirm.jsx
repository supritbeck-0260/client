import React, { useContext, useEffect, useState } from 'react';
import {AuthContex} from '../App';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Password from './Password';
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
  alert:{
    width: '74%',
    margin: '0 auto',
  },
}));

const Confirm=(props)=> {
  const auth = useContext(AuthContex);
  auth.logout();
  const history = useHistory();
  const classes = useStyles();
  const {id} = useParams();
  const [user,setUser] = useState({password:'',cpassword:''});
  const [message,setMessage] = useState(null);
  const [severity,setSeverity] = useState(null);
  const [loading,setLoading] = useState(false);
const [passAlert,setPassAlert] = useState(false);
const [cPassAlert,setcPassAlert] = useState(false);
const [matchPass,setMatchPass] = useState(false);
const [lengthFlag,setLengthFlag] = useState(false);
  const [open,setOpen] = useState(false);
  const [emailVerification,setEmailVerification] = useState(null);
  const setData = (field,value)=>{
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
    Axios.post(process.env.REACT_APP_SERVER_URL+'/auth/forgot/token',{token:id}).then(response=>{
        console.log(response);
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
  const passwordCheck = (e) =>{
    const value = e.target.value.trim();
    if(value.length<5){
      setLengthFlag(true);
    }else{
        setLengthFlag(false); 
    }
  }
  const resetError = ()=>{
    setPassAlert(false);
    setLengthFlag(false);
    setMatchPass(false);
    setcPassAlert(false);
  }
  const validate = ()=>{
    if(!user.password){
        setPassAlert(true);
        return false;
      }else if(user.password && user.password.length<5){
        setLengthFlag(true);
        return false;
      }else if(!user.cpassword){
        setcPassAlert(true);
        return false;
      }else if(user.password !== user.cpassword){
        setMatchPass(true);
        return false;
      }else{
      reset();
    }
  }
  const reset = ()=>{
    setLoading(true);
    Axios.post(process.env.REACT_APP_SERVER_URL+'/auth/forgot/change',{password:user.password},{
        headers:{
          'authorization': id
        }
      }).then(response=>{
      console.log('Login:',response);
      if(response.data){
        switch(response.status){
          case 200:
              setSeverity('success');
              setMessage(response.data.message);
              setUser({password:'',cpassword:''});
              setTimeout(()=>{
                history.push('/login')
              },4000);
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
  useEffect(()=>{
    if(id)
    postToken(id);
  },[]);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs className={classes.head}>
                <Typography variant="h5">Change your password</Typography>
              </Grid>
              <Grid item className={classes.container}>
                    <Password setData={setData} type='p' validateFun={passwordCheck} values={user.password} resetError={resetError}/>
                    {passAlert?<Alert className={classes.alert} severity="error">Please enter your password.</Alert>:null}
                    {lengthFlag?<Alert className={classes.alert} severity="error">Password should be at least 5 character long.</Alert>:null}
                    <Password setData={setData} type='cp' values={user.cpassword} resetError={resetError}/>
                    {cPassAlert?<Alert className={classes.alert} severity="error">Please confirm your password.</Alert>:null}
                    {matchPass?<Alert className={classes.alert} severity="error">Your password does not match - Try again!</Alert>:null}
                    <Button  className={classes.inputField} variant="contained" onClick={validate} disabled={loading} color="secondary">{!loading?'Reset':'...'}</Button>
                    {message?<Alert className={classes.alert} severity={severity}>{message}</Alert>:null}                
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
export default Confirm;
