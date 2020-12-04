import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';
import UserMenu from './UserMenu';
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
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="fixed">
        <Toolbar>
            <Typography variant="h6" className={classes.title}>
            <NavLink to='/' className={classes.logo}>ProClick</NavLink>
            </Typography>
          {props.token?<Button color="inherit" onClick={props.toggleFun}>Upload</Button>:null}
          {props.token?null:<NavLink to='/login' className={classes.logo}><Button color="inherit">Login</Button></NavLink>}
          {/* <NavLink to={'/profile/'+userID} className={classes.profile} >
          {props.token?<Button className={classes.BtnShape}>
          <Avatar aria-label="recipe" className={classes.avatar} src="http://localhost:5000/profile/profile_1604060279140.jpg"/>
          </Button>:null}
          </NavLink> */}
          {props.token?<UserMenu tokenSet={props.tokenSet}/>:null}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
