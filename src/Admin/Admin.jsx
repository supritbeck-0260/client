import React,{useState,useContext} from 'react';
import {AuthContex} from '../App';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Items from './Items';
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
    alert:{
        width: '74%',
        margin: '0 auto',
      },
}));
const Admin = () =>{
    const classes = useStyles();
    const auth = useContext(AuthContex);
    const [loading,setLoading] = useState(false);
    const [open,setOpen] = useState(false);
    const [severity,setSeverity] = useState('success');
    const [message,setMessage] = useState(null);
    const linkMatch = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    const [alert,setAlert] = useState({
        item:false,
        name:false,
        link:false
    });
    const [product,setProduct] = useState({
        item:'',
        name:'',
        link:''
    });
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
      const setData = (field,value)=>{
        setAlert({item:false,name:false,link:false});
        setProduct(prev=>{
            prev[field]=value;
          return {...prev}
        });
      } 
    const save = ()=>{
    setLoading(true);
    Axios.post(process.env.REACT_APP_SERVER_URL+'/product/save',product,{
            headers:{
              'authorization': auth.token
            }
          }).then(response=>{
            setLoading(false); 
            switch(response.status){
                case 200:
                    setSeverity('Success');
                    setOpen(true);
                    setMessage(response.data.message);
                    setProduct({item:'',name:'',link:''});
                    break;
                case 201:
                    setSeverity('Error');
                    setOpen(true);
                    setMessage(response.data.message);
                    break;
            }  
          });
    }
    const validate = ()=>{
        if(!product.item){
          setAlert({item:true,name:false,link:false});
          return false;
        }else if(!product.name){
         setAlert({item:false,name:true,link:false});
          return false;
        }else if(!linkMatch.test(product.link)){
         setAlert({item:false,name:false,link:true});
          return false;
        }else{
         save();
        }
      }
    return(
        <>
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs className={classes.head}>
                                <Typography variant="h4">Admin</Typography>
                            </Grid>
                            <Grid item className={classes.container}>
                             <Items value={product.item} setData={setData}/> 
                             {alert.item?<Alert className={classes.alert} severity="error">Please choose Product.</Alert>:null}  
                             <TextField className={classes.inputField} onChange={(e)=>setData('name',e.target.value)} value={product.name} id="outlined-basic" label="Name" variant="outlined" />
                             {alert.name?<Alert className={classes.alert} severity="error">Invalid Product name.</Alert>:null}  
                             <TextField className={classes.inputField} onChange={(e)=>setData('link',e.target.value)} value={product.link} id="outlined-basic" label="Link" variant="outlined" />
                             {alert.link?<Alert className={classes.alert} severity="error">Invalid Product link.</Alert>:null}  
                             <Button  className={classes.inputField} onClick={validate} variant="contained" disabled={loading} color="secondary">{!loading?'Save':'Saving...'}</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    </Grid>
                </Paper>
            </div>
        <Snackbar open={open} anchorOrigin={{vertical: 'center', horizontal: 'center',}} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} variant="filled" severity={severity}>{message}</Alert>
      </Snackbar>
        </>
    )
}

export default Admin;