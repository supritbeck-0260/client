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
import { red } from '@material-ui/core/colors';
import {NavLink} from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TimeAgo from '../Detailed/TimeStamp';
const useStyles = makeStyles({
  rootLarge: {
    width: 427,
    margin:'0 auto',
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
    backgroundColor: red[500],
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
          <NavLink to='/profile'><Avatar aria-label="recipe" className={classes.avatar} src="http://localhost:5000/profile/profile_1604060279140.jpg"/></NavLink>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<NavLink className={classes.navLinkDec} to='/profile'>Suprit Beck</NavLink>}
        subheader={dates}
      />
        <NavLink to={'/detailed/'+props.info._id}>
        <CardMedia
          className={classes.media}
          image={'http://localhost:5000/uploads/'+props.info.filename}
          title={props.info.about}
        />
        </NavLink>
        <CardContent className={classes.CardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.info.about?props.info.about:<br/>}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.info.camera?('Camera:'+props.info.camera):null}<br/>
            {props.info.lenses?('Lenses:'+props.info.lenses):null}<br/>
            {props.info.editing?('Editing Tool:'+props.info.editing):null}<br/>
            {props.info.others?('Others:'+props.info.others):null}<br/>
            {props.info.location?('Location:'+props.info.location):null}<br/>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button> */}
        <div className={classes.rateTimeContainer}>
          <div className={classes.rating}> Avg Rating:<Rating name="read-only" value={4} readOnly />(14k)</div>
          <div><TimeAgo time={props.info.date}/></div>
        </div>
        
      </CardActions>
    </Card>
  );
}

export default ImageCards;
