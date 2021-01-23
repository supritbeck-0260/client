import React, { useEffect, useState , useContext} from 'react';
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
import CameraIcon from '@material-ui/icons/CameraAltRounded';
import LensIcon from '@material-ui/icons/LensOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import LibraryIcon from '@material-ui/icons/LibraryAddOutlined';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Tooltip from '@material-ui/core/Tooltip';
import {ServicesContex} from '../App';
const useStyles = makeStyles({
  root: {
    margin:'0 3px',
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
  },
  cameraSettings:{
    display:'flex',
    justifyContent:'space-between'
  },
  icons:{
    margin:'0px 4px'
  },
  items:{
    display:'flex'
  }

});

const ImageCards = (props)=> {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');
  const [view,setView] = useState({});
  const services = useContext(ServicesContex);
  var dates;
  if(props.info.date){
    const formattedDate = Intl.DateTimeFormat('en-US',{
    year: 'numeric',
    month: 'short',
    day: '2-digit' }).format(new Date(props.info.date));
    dates=formattedDate;
}
useEffect(()=>{
  if(matches) setView({root:427,about:'1.2rem'});
  else setView({root:'100vw',about:'0.9rem'})
},[matches]);
  return (
    <Card className={classes.root} style={{width:view.root}}>
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
          <Typography gutterBottom variant="h5" component="h2" style={{fontSize:view.about}}>
            {props.info.about && props.info.about.value?props.info.about.value:<br/>}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.info.camera && props.info.camera.value?
              <div className={classes.cameraSettings}>
                <span className={classes.items}><Tooltip title='Camera'><CameraIcon className={classes.icons}/></Tooltip>
                <a className={classes.navLinkDec} onClick={()=>services.analysis(props.info.uid,props.info.owner,props.info.camera.value,'camera')} href={props.info.camera.link?props.info.camera.link:'https://www.google.com/search?q='+props.info.camera.value} target='_blank'>{props.info.camera.value}</a> </span>
                {props.info.mode == 'Manual' && props.info.settings?<span className={classes.icons}>
                {props.info.settings.shutter && <Tooltip title="Shutter"><span>{props.info.settings.shutter}</span></Tooltip>}
                {props.info.settings.apprature && <Tooltip title="Apprature"><span>,{props.info.settings.apprature}</span></Tooltip>}
                {props.info.settings.iso && <Tooltip title="ISO"><span>,{props.info.settings.iso}</span></Tooltip>}
                {props.info.settings.focus && <Tooltip title="Focus"><span>,{props.info.settings.focus}</span></Tooltip>}
                </span>:props.info.mode}
              </div>
            :<br/>}
            {props.info.lenses && props.info.lenses.value?
              <div className={classes.items}>
               <Tooltip title='Lense'><LensIcon className={classes.icons}/></Tooltip>
               <a className={classes.navLinkDec} onClick={()=>services.analysis(props.info.uid,props.info.owner,props.info.lenses.value,'lenses')} href={props.info.lenses.link?props.info.lenses.link:'https://www.google.com/search?q='+props.info.lenses.value} target='_blank'>{props.info.lenses.value}</a> 
              </div>
            :<br/>}
            {props.info.editing && props.info.editing.value?
                <div className={classes.items}>
                  <Tooltip title='Editing Tool'><EditIcon className={classes.icons}/></Tooltip>
                  <a className={classes.navLinkDec} onClick={()=>services.analysis(props.info.uid,props.info.owner,props.info.editing.value,'editing')} href={props.info.editing.link?props.info.editing.link:'https://www.google.com/search?q='+props.info.editing.value} target='_blank'>{props.info.editing.value}</a> 
                </div>
            :<br/>}
            {props.info.others && props.info.others.value?
              <div className={classes.items}>
                 <Tooltip title='Others'><LibraryIcon className={classes.icons}/></Tooltip>
                 <a className={classes.navLinkDec} onClick={()=>services.analysis(props.info.uid,props.info.owner,props.info.others.value,'others')} href={props.info.others.link?props.info.others.link:'https://www.google.com/search?q='+props.info.others.value} target='_blank'>{props.info.others.value}</a> 
              </div>
           :<br/>}
            {props.info.location && props.info.location.value?
              <div className={classes.items}>
                <Tooltip title='Location'><LocationOnIcon className={classes.icons}/></Tooltip>
                <a className={classes.navLinkDec} onClick={()=>services.analysis(props.info.uid,props.info.owner,props.info.location.value,'location')} href={'https://www.google.com/search?q='+props.info.location.value} target='_blank'>{props.info.location.value}</a> 
              </div>            
            :<br/>}
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
