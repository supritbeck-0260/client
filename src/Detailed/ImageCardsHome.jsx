import React, { useContext, useEffect, useState } from 'react';
import {AuthContex} from '../App';
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
import Axios from 'axios';
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
  const auth = useContext(AuthContex);
  const classes = useStyles();
  console.log(props);
  const matches = useMediaQuery('(min-width:600px)');
  const [css,setCss] = useState(classes.rootLarge);
  const [mediaCss,setMediaCss] = useState(classes.mediaLarge);
  const [star,setStar] = useState(props.data.rate?props.data.rate:null);
  var dates;
  if(props.data.info.date){
    const formattedDate = Intl.DateTimeFormat('en-US',{
    year: 'numeric',
    month: 'short',
    day: '2-digit' }).format(new Date(props.data.info.date));
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
const changeHandler = (value)=>{
    setStar(value);
    const post={
      rate:value,
      id:props.data.info._id
    }
    Axios.post(process.env.REACT_APP_SERVER_URL+'/image/rate',post,{
      headers:{
        'authorization': auth.token
      }
    }).then(response=>{
      console.log(response);
    });;
}

  return (
    <Card className={css}>
      <CardActionArea>
      <CardHeader
        avatar={
          props.data.info.avatar?<NavLink to={'/profile/'+props.data.info.uid}><Avatar aria-label="recipe" className={classes.avatar} src={process.env.REACT_APP_SERVER_URL+"/profile/"+props.data.info.avatar}/></NavLink>:
          props.data.info.owner?<Avatar>{props.data.info.owner.charAt(0)}</Avatar>:null
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      title={<NavLink className={classes.navLinkDec} to={'/profile/'+props.data.info.uid}>{props.data.info.owner}</NavLink>}
        subheader={dates}
      />
        <CardMedia
          className={mediaCss}
          image={process.env.REACT_APP_SERVER_URL+'/uploadOrg/'+props.data.info.filename}
          title={props.data.info.about}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.data.info.about}
          </Typography>
          <CardActions>
            Avg Rating:<Rating name="read-only" value={4} readOnly />(14k)
          </CardActions>
          <div className={classes.container}>
            {props.data.info.camera?<ToolComponent label="Camera" value={props.data.info.camera}/>:null}<br/>
            {props.data.info.lenses?<ToolComponent label="Editing Tool" value={props.data.info.editing}/>:null}<br/>
            {props.data.info.editing?<ToolComponent label="Lenses" value={props.data.info.lenses}/>:null}<br/>
            {props.data.info.others?<ToolComponent label="Others" value={props.data.info.others}/>:null}<br/>
            {props.data.info.location?<ToolComponent label="Location" value={props.data.info.location}/>:null}
  
          </div>
          <div className={classes.rateTimeContainer}>
            {auth.isLoggedin?
            <div className={classes.rating}> {props.data.rate?"You have Rated":"Rate this Picture"}:<Rating name="read-only"
            value={star}
            onChange={(event, newValue) => changeHandler(newValue)} /></div>:
            <div className={classes.rating}></div>}
            <div><TimeAgo time={props.data.info.date}/></div>
          </div>
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ImageCardsHome;
