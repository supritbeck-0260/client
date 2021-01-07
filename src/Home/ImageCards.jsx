import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {NavLink} from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TimeAgo from '../Detailed/TimeStamp';
const useStyles = makeStyles({
  rootLarge: {
    width: 427,
    margin:'0 3px',
  },
  rootSmall: {
    width: '100vw',
    margin:'0 auto',
  },
  media: {
    height: 260,
  },
  avgRating:{
    padding:'0',
  },
  avatar:{
    border:'2px solid #e2d1c3',
  },
  navLinkDec:{
    textDecoration:'none',
    color:'inherit',
  },
  rateTimeContainer:{
    display:'flex',
    justifyContent:'space-between',
    width:'97%'
  },
  rating:{
    display:'flex',
    alignItems:'center',
  },
  CardContent:{
    padding:'4px',
  }
});

const ImageCards = (props)=> {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');
  const [root,setRoot] = useState(classes.rootLarge);
  var dates;
  if(props.info.date){
    const formattedDate = Intl.DateTimeFormat('en-US',{
    year: 'numeric',
    month: 'short',
    day: '2-digit' }).format(new Date(props.info.date));
    dates=formattedDate;
}
useEffect(()=>{
  if(matches){
    setRoot(classes.rootLarge);
  }else{
    setRoot(classes.rootSmall);
  }
},[matches]);
  return (
    <Card className={root}>
      <CardActionArea>
      <CardHeader
        avatar={
          <NavLink to={'/profile/'+props.info.uid} className={classes.navLinkDec}>
            {props.info.avatar?<Avatar aria-label="recipe" className={classes.avatar} src={process.env.REACT_APP_SERVER_URL+"/profile/"+props.info.avatar}/>:
              <Avatar>{props.info.owner.charAt(0)}</Avatar>
            }
          </NavLink>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      title={<NavLink className={classes.navLinkDec} to={'/profile/'+props.info.uid}>{props.info.owner}</NavLink>}
        subheader={dates}
      />
        <NavLink to={'/detailed/'+props.info._id}>
        <CardMedia
          className={classes.media}
          image={process.env.REACT_APP_SERVER_URL+'/uploads/'+props.info.filename}
          title={props.info.about?props.info.about.value:''}
        />
        </NavLink>
        <CardContent className={classes.CardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.info.about?props.info.about.value:<br/>}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.info.camera && props.info.camera.value?
              <span>
                 Camera:<a className={classes.navLinkDec} href={props.info.camera.link?props.info.camera.link:'https://www.google.com/search?q='+props.info.camera.value} target='_blank'>{props.info.camera.value}</a> 
              </span>
            :null}<br/>
            {props.info.lenses && props.info.lenses.value?
              <span>
                Lenses:<a className={classes.navLinkDec} href={props.info.lenses.link?props.info.lenses.link:'https://www.google.com/search?q='+props.info.lenses.value} target='_blank'>{props.info.lenses.value}</a> 
              </span>
            :null}<br/>
            {props.info.editing && props.info.editing.value?
                <span>
                  Editing Tool:<a className={classes.navLinkDec} href={props.info.editing.link?props.info.editing.link:'https://www.google.com/search?q='+props.info.editing.value} target='_blank'>{props.info.editing.value}</a> 
                </span>
            :null}<br/>
            {props.info.others && props.info.others.value?
              <span>
                Others:<a className={classes.navLinkDec} href={props.info.others.link?props.info.others.link:'https://www.google.com/search?q='+props.info.others.value} target='_blank'>{props.info.others.value}</a> 
              </span>
           :null}<br/>
            {props.info.location && props.info.location.value?
              <span>
                Location:<a className={classes.navLinkDec} href={'https://www.google.com/search?q='+props.info.location.value} target='_blank'>{props.info.location.value}</a> 
              </span>            
            :null}<br/>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div className={classes.rateTimeContainer}>
          {props.info.avgRate?<div className={classes.rating}> Avg Rating:<Rating name="read-only" precision={0.5} value={props.info.avgRate.rate} readOnly />({props.info.avgRate.total})</div>:<div className={classes.rating}>No rating yet.</div>}
          <div><TimeAgo time={props.info.date}/></div>
        </div>
        
      </CardActions>
    </Card>
  );
}

export default ImageCards;
