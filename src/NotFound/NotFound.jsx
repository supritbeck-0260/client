import React,{useEffect,useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import { Button, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
const useStyles = makeStyles({
    rootLarge: {
      width: '40%',
      margin:'0 auto',
    },
    rootSmall: {
      width: '100%',
      margin:'0 auto',
    },
    cardAction:{
        height:'60vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
    },
    navLink:{
        textDecoration:'none',
        display:'flex',
        alignItems:'center'
    }
});
const NotFound = (props)=>{
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');
    const [css,setCss] = useState(classes.rootLarge);
    useEffect(()=>{
        if(matches){
          setCss(classes.rootLarge);
        }else{
          setCss(classes.rootSmall);
        }
      },[matches]);
    return(
        <>
            <Paper className={css} elevation={3}>
            <Card className={classes.cardAction}>
                    <Typography variant='h6' color='error'>{props.message}</Typography>
                    <Typography variant='h6' color='error'>
                        <NavLink to='/' className={classes.navLink}>
                            <HomeIcon/>Go to Home
                        </NavLink>
                    </Typography>
            </Card>
            </Paper>
        </>
    )
}

export default NotFound;