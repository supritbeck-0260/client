import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Password from './Password';
import Gender from './Gender';
import {NavLink} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Axios from 'axios';

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
const Signup=()=> {
  const classes = useStyles();
  const [user,setUser] = useState({name:'',email:'',gender:'',password:'',cpassword:''});
  const [nameAlert,setNameAlert] = useState(false);
  const [emailAlert,setEmailAlert] = useState(false);
  const [genderAlert,setGenderAlert] = useState(false);
  const [passAlert,setPassAlert] = useState(false);
  const [cPassAlert,setcPassAlert] = useState(false);
  const [matchPass,setMatchPass] = useState(false);
  const [lengthFlag,setLengthFlag] = useState(false);
  const [loading,setLoading] = useState(false);
  const [message,setMessage] = useState(null);
  const [severity,setSeverity] = useState(null);
  const nameMatch = new RegExp(/^[a-zA-Z .]{3,35}$/);
  const emailMatch = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
  const setData = (field,value)=>{
    setNameAlert(false);
    setEmailAlert(false);
    setGenderAlert(false);
    setPassAlert(false);
    setcPassAlert(false);
    setMatchPass(false);
    setLengthFlag(false);
    setMessage(null);
    setUser(prev=>{
      if(value){
        prev[field]=value.trim();
      }
      return {...prev}
    });
  } 
  const passwordCheck = (e) =>{
    const value = e.target.value.trim();
    if(value.length<5){
      setLengthFlag(true);
    }
  }
  const resetError = ()=>{
    setPassAlert(false);
    setLengthFlag(false);
    setMatchPass(false);
    setcPassAlert(false);
  }
  const validate = ()=>{
    if(!nameMatch.test(user.name)){
      setNameAlert(true);
      return false;
    }else if(!emailMatch.test(user.email)){
      setEmailAlert(true);
      return false;
    }else if(!user.gender){
      setGenderAlert(true);
      return false;
    }else if(!user.password){
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
      postUser();
    }
  }

  const postUser = () =>{
    setLoading(true);
    Axios.post(process.env.REACT_APP_SERVER_URL+'/auth/signup',user).then(response=>{
      setLoading(false);
      if(response.data){
        switch(response.status){
          case 200:
              setSeverity('success');
              setMessage(response.data.message); 
              setUser({name:'',email:'',gender:'',password:'',cpassword:''});
              break;
          case 201:
              setSeverity('warning');
              setMessage(response.data.message);
              setUser({email:''});
              break;
          case 500:
              setSeverity('error');
              setMessage(response.data.message);
              break;
        }
      }
    });
  }
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs className={classes.head}>
                <Typography variant="h4">Sign Up</Typography>
              </Grid>
              <Grid item className={classes.container}>
                    <TextField className={classes.inputField} onChange={(e)=>setData('name',e.target.value)} value={user.name} id="outlined-basic" label="Name" variant="outlined" />
                    {nameAlert?<Alert className={classes.alert} severity="error">Name is not valid- Try again.</Alert>:null}
                    <TextField className={classes.inputField} onChange={(e)=>setData('email',e.target.value)} value={user.email} id="outlined-basic"  label="Email" variant="outlined" />
                    {emailAlert?<Alert className={classes.alert} severity="error">Email is not valid- Try again.</Alert>:null}
                    <Gender setData={setData} values={user.gender}/>
                    {genderAlert?<Alert className={classes.alert} severity="error">Please select your gender.</Alert>:null}
                    <Password setData={setData} type='p' validateFun={passwordCheck} values={user.password} resetError={resetError}/>
                    {passAlert?<Alert className={classes.alert} severity="error">Please enter your password.</Alert>:null}
                    {lengthFlag?<Alert className={classes.alert} severity="error">Password should be at least 5 character long.</Alert>:null}
                    <Password setData={setData} type='cp' values={user.cpassword}resetError={resetError}/>
                    {cPassAlert?<Alert className={classes.alert} severity="error">Please confirm your password.</Alert>:null}
                    {matchPass?<Alert className={classes.alert} severity="error">Your password does not match - Try again!</Alert>:null}
                    <Button  className={classes.inputField} onClick={validate} variant="contained" color="secondary" disabled={loading}>{!loading?'Register':'Loading...'}</Button>
                    {message?<Alert className={classes.alert} severity={severity}>{message}</Alert>:null}
                    <Typography variant="subtitle1" className={classes.haveAnAccountContainer}>
                        <Typography variant="body1" className={classes.haveAnAccount}>Already have an Account? </Typography>
                        <NavLink to='/login' className={classes.loginLink}><Typography variant="body1" className={classes.login}> Login</Typography></NavLink>
                    </Typography>
                
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
export default Signup;
