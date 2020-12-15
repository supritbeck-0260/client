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
  alert:{
    width: '74%',
    margin: '0 auto',
  },
  forgot:{
    color: '#ff0844',  
    textAlign:'center',
    margin:'12px',
    fontSize:'14px'
  }
}));

const Forgot=()=> {
//   const history = useHistory();
  const classes = useStyles();
//   const {id} = useParams();
  const [email,setEmail] = useState('');
  const [message,setMessage] = useState(null);
  const [severity,setSeverity] = useState(null);
  const [loading,setLoading] = useState(false);
  const [emailAlert,setEmailAlert] = useState(false);
  const validate = ()=>{
    if(!email){
      setEmailAlert(true);
      return false;
    }else{
        forgot();
    }
  }
  const forgot = ()=>{
    setLoading(true);
    Axios.post(process.env.REACT_APP_SERVER_URL+'/auth/forgot',{email:email}).then(response=>{
      if(response.data){
        switch(response.status){
          case 200:
              setSeverity('success');
              setMessage(response.data.message);
              setEmail('');
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
                <Typography variant="h5">Rest Password</Typography>
              </Grid>
              <Grid item className={classes.container}>
                    <TextField className={classes.inputField} onChange={(e)=>setEmail(e.target.value)} value={email} id="outlined-basic" label="Email" variant="outlined" />
                    {emailAlert?<Alert className={classes.alert} severity="error">Please enter your Email</Alert>:null}
                    <Button  className={classes.inputField} variant="contained" onClick={validate} disabled={loading} color="secondary">{!loading?'Send':'...'}</Button>
                    {message?<Alert className={classes.alert} severity={severity}>{message}</Alert>:null}                
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
export default Forgot;
