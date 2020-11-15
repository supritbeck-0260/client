import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import defaultImg from './profile.JPG';
import Info from './Info';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useState,useEffect } from 'react';
import Axios from 'axios';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
      
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
    flexDirection:'column'

  },
  image:{
    maxWidth: '100%',
   maxHeight: '333px'
   
},
imageInput:{
  display:'none'
},
buttons:{
  display:'flex',
  justifyContent:'space-between'
},
profileLoader:{
  width:'100%',
  minHeight:'300px',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
}
}));

const MyGrid = () => {
  const classes = useStyles();
  const [url,setUrl] = useState(null);
  const [file,setFile] = useState(null);
  const [filename,setFilename] = useState(null);
  const fileUploadHandler = (event) =>{
    const tempUrl = URL.createObjectURL(event.target.files[0]);
    setFile(event.target.files[0]);
    setUrl(tempUrl);
}
useEffect(()=>{
  getProfile();
},[]);
const getProfile = () =>{
  Axios.get('http://localhost:5000/get').then(response=>{
  if(response.data.profile){  
  setFilename(response.data.profile);
    setUrl(`http://localhost:5000/profile/`+response.data.profile);
  }else{
    setUrl(defaultImg);
  }
  });
}
const cancel = () =>{
  setUrl(`http://localhost:5000/profile/`+filename);
  setFile(null);
}
const saveImage = () =>{
  const formData = new FormData();
    formData.append('profile',file);
    Axios.post('http://localhost:5000/profilepic',formData).then(response=>{
        if(response.status === '200'){
          setFile(null);
        }
    });
}

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paperImage}>
          {url?<Button variant="contained" component="label">
              <img className={classes.image} src={url} alt='image'></img>
              <input type="file" accept="image/*" name="profile" className={classes.imageInput} onChange={fileUploadHandler} />
          </Button>:<div className={classes.profileLoader}><CircularProgress /></div>}
          {file?<div className={classes.buttons}>
          <Button variant="contained" color="primary" onClick={saveImage}>Save</Button>
          <Button variant="contained" onClick={cancel}>Cancel</Button>
          </div>:null}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <Info/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default MyGrid; 