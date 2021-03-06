import React, { useContext, useEffect, useState } from 'react';
import {AuthContex,ServicesContex} from '../App';
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
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/CameraAltRounded';
import LensIcon from '@material-ui/icons/LensOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import LibraryIcon from '@material-ui/icons/LibraryAddOutlined';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Comments from './Comments';
import Settings from './Settings';
const useStyles = makeStyles({
  root: {
    margin:'0 auto',
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
  },
  commentBox:{
    display:'flex',
    justifyContent:'center',
    flexDirection:'column'
  },
});

const ImageCardsHome = (props)=> {
  const auth = useContext(AuthContex);
  const services = useContext(ServicesContex);
  const classes = useStyles();
  const [avg,setAvg] = useState(props.data.info?props.data.info.avgRate:null);
  const matches = useMediaQuery('(min-width:600px)');
  const [star,setStar] = useState(props.data.rate?props.data.rate:null);
  const [btn,setBtn] = useState(false);
  const [comment,setComment] = useState(null);
  const [commentArray,setCommentArray] = useState(null);
  const [postFlag,setPostFlag] = useState(true);
  const [view,setView] = useState({});
  var dates;
  if(props.data.info.date){
    const formattedDate = Intl.DateTimeFormat('en-US',{
    year: 'numeric',
    month: 'short',
    day: '2-digit' }).format(new Date(props.data.info.date));
    dates=formattedDate;
}
useEffect(()=>{
  if(matches) setView({root:'60%',media:{height: '70vh'},about:'1.5rem'});
  else setView({root:'100%',media:{minHeight: '30vh'},about:'0.9rem'});
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
      switch(response.status){
        case 200:
          setAvg(response.data.rating);
          services.socket.emit('SendData',props.data.info.uid);
        break;
      }

    });
}
const commentChange = (e)=>{
    setComment(e.target.value);
}
const postComment = () =>{
  setPostFlag(false);
  const post={
    comment:comment,
    id:props.data.info._id
  }
  Axios.post(process.env.REACT_APP_SERVER_URL+'/image/comment/post',post,{
    headers:{
      'authorization': auth.token
    }
  }).then(response=>{
    switch(response.status){
      case 200:
        setComment('');
        setBtn(false);
        setCommentArray(response.data);
        setPostFlag(true);
        services.socket.emit('SendData',props.data.info.uid);
      break;
      case 201:
        setComment('');
        setBtn(false);
        setPostFlag(true); 
        break;
    }

  });
}
const getComments = ()=>{
  const post={
    id:props.data.info._id
  }
  Axios.post(process.env.REACT_APP_SERVER_URL+'/image/comment/get',post).then(response=>{
    switch(response.status){
      case 200:
        setCommentArray(response.data);
      break;
    }

  });
}
useEffect(getComments,[]);
  return (
    <Card className={classes.root} style={{width:view.root}}>
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
          style={view.media}
          image={process.env.REACT_APP_SERVER_URL+'/uploadOrg/'+props.data.info.filename}
          title={props.data.info.about?props.data.info.about.value:''}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" style={{fontSize:view.about}}>
          {props.data.info.about?props.data.info.about.value:''}
          </Typography>
          {avg?<CardActions>
            Avg Rating:<Rating name="read-only" precision={0.5} value={avg.rate} readOnly />({avg.total})
          </CardActions>:null}
          <div className={classes.container}>
            {props.data.info.camera?
            <ToolComponent avatar={CameraIcon} label="Camera" type='camera' user={{uid:props.data.info.uid,name:props.data.info.owner}} data={props.data.info.camera}/>:null}<br/>
            {props.data.info.lenses?
            <ToolComponent avatar={EditIcon}  label="Editing Tool" type='editing' user={{uid:props.data.info.uid,name:props.data.info.owner}} data={props.data.info.editing}/>:null}<br/>
            {props.data.info.editing?
            <ToolComponent avatar={LensIcon} label="Lense" type='lenses' user={{uid:props.data.info.uid,name:props.data.info.owner}} data={props.data.info.lenses}/>:null}<br/>
            {props.data.info.others?
            <ToolComponent avatar={LibraryIcon} label="Others" type='others' user={{uid:props.data.info.uid,name:props.data.info.owner}} data={props.data.info.others}/>:null}<br/>
            {props.data.info.location?
            <ToolComponent avatar={LocationOnIcon} label="Location" type='location' user={{uid:props.data.info.uid,name:props.data.info.owner}} data={props.data.info.location}/>:null}
            {props.data.info.mode?
            <Settings settings={props.data.info.settings} mode={props.data.info.mode}/>:null}
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
      {auth.isLoggedin?<Paper elevation={3} className={classes.commentBox}>
      <TextField
          id="outlined-full-width"
          label="comment"
          multiline
          value={comment}
          style={{ width:'99%',margin:'8px auto'}}
          placeholder="write something..."
          fullWidth
          margin="normal"
          rowsMax={4}
          variant="outlined"
          onFocus={()=>setBtn(true)}
          onChange={commentChange}
        />
        {btn?<div>
        <Button variant="contained" style={{ margin:'5px'}} onClick={postComment} disabled={!postFlag} color="primary">{postFlag?'Post':'Loading...'}</Button>
        <Button variant="contained" style={{ margin:'5px'}} onClick={()=>{setComment('');setBtn(false)}} >Clear</Button>
        </div>:null}
      </Paper>:null}
      {commentArray?commentArray.map((value)=>
        <Comments data={value}/>
      ):null}
    </Card>
  );
}

export default ImageCardsHome;
