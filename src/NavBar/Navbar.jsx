import React, { useState, useContext } from 'react';
import {AuthContex} from '../App';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';
import UserMenu from './UserMenu';
import Notification from './Notification';
import Tooltip from '@material-ui/core/Tooltip';
import Upload from '../upload/Upload';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom:'76px'
  },
  appbar: {
    backgroundColor:'#e2d1c3'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo:{
    color:'white',
    textDecoration:'none',
  },
  profile:{
    color:'white',
    textDecoration:'none',
  },
  BtnShape:{
    borderRadius:'50%',
    height: '60px',
  }
}));

const Navbar = (props)=> {
  const classes = useStyles();
  const auth = useContext(AuthContex);
  const [uploadModal,setUploadModal] = useState(false);
  const toggleModal = () =>{
    setUploadModal(prev=>!prev);
}
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="fixed">
        <Toolbar>
            <Typography variant="h6" className={classes.title}>
            <Tooltip title='Home'> 
            <NavLink to='/' className={classes.logo}>ProClick</NavLink>
            </Tooltip>
            </Typography>
          <NavLink to='/hits' className={classes.logo}><Button color="inherit">Hits</Button></NavLink>
          {auth.isLoggedin?<Button color="inherit" onClick={toggleModal}>Upload</Button>:null}
          {auth.isLoggedin?<Notification/>:null}
          {auth.isLoggedin?null:<NavLink to='/login' className={classes.logo}><Button color="inherit">Login</Button></NavLink>}
          {auth.isLoggedin?<UserMenu/>:null}
        </Toolbar>
      </AppBar>
      {uploadModal?<Upload toggleFun={toggleModal}/>:null}
    </div>
  );
}

export default Navbar;
