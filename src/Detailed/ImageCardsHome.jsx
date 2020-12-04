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
import ToolComponent from './ToolComponent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TimeAgo from './TimeStamp';
const useStyles = makeStyles({
  rootLarge: {
    width: '60%',
    margin:'0 auto',
  },
  rootSmall: {
    width: '100%',
    margin:'0 auto',
  },
  mediaLarge: {
    height: '70vh',
  },
  mediaSmall: {
    minHeight: '30vh',
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
  container:{
    display:'flex',
    flexWrap: 'wrap',
  },
  rateTimeContainer:{
    display:'flex',
    justifyContent:'space-between',
    width:'100%',
    margin: '10px 0px',
  },
  rating:{
    display:'flex',
    alignItems:'center',
  }
});

const ImageCardsHome = (props)=> {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');
  const [css,setCss] = useState(classes.rootLarge);
  const [mediaCss,setMediaCss] = useState(classes.mediaLarge);
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
    setCss(classes.rootLarge);
    setMediaCss(classes.mediaLarge);
  }else{
    setCss(classes.rootSmall);
    setMediaCss(classes.mediaSmall);
  }
},[matches]);
  return (
    <Card className={css}>
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
        <CardMedia
          className={mediaCss}
          image={'http://localhost:5000/uploadOrg/'+props.info.filename}
          title={props.info.about}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.info.about}
          </Typography>
          <CardActions>
            Avg Rating:<Rating name="read-only" value={4} readOnly />(14k)
          </CardActions>
          <div className={classes.container}>
            {props.info.camera?<ToolComponent label="Camera" value={props.info.camera}/>:null}<br/>
            {props.info.lenses?<ToolComponent label="Editing Tool" value={props.info.editing}/>:null}<br/>
            {props.info.editing?<ToolComponent label="Lenses" value={props.info.lenses}/>:null}<br/>
            {props.info.others?<ToolComponent label="Others" value={props.info.others}/>:null}<br/>
            {props.info.location?<ToolComponent label="Location" value={props.info.location}/>:null}
  
          </div>
          <div className={classes.rateTimeContainer}>
            {props.token?<div className={classes.rating}> You have Rated:<Rating name="read-only" value={4} readOnly /></div>:<div className={classes.rating}></div>}
            <div><TimeAgo time={props.info.date}/></div>
          </div>
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ImageCardsHome;
