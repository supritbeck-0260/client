import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CameraIcon from '@material-ui/icons/CameraAlt';
import Rating from '@material-ui/lab/Rating';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { red } from '@material-ui/core/colors';
const useStyles = makeStyles({
  root: {
    width: 427,
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
  }
});

const ImageCards = (props)=> {
  const classes = useStyles();
  var dates;
  if(props.info.date){
    const formattedDate = Intl.DateTimeFormat('en-US',{
    year: 'numeric',
    month: 'short',
    day: '2-digit' }).format(new Date(props.info.date));
    dates=formattedDate;
}
  return (
    <Card className={classes.root}>
      <CardActionArea>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src="http://localhost:5000/profile/profile_1604060279140.jpg"/>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Suprit Beck"
        subheader={dates}
      />
        <CardMedia
          className={classes.media}
          image={props.info.path+props.info.filename}
          title={props.info.about}
        />
        <CardContent>
        {/* <CardActions className={classes.avgRating}>
        Avg Rating:<Rating name="read-only" value={4} readOnly />(14k)
        </CardActions> */}
          <Typography gutterBottom variant="h5" component="h2">
            {props.info.about}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.info.camera?('Camera:'+props.info.camera):null}<br/>
            {props.info.lenses?('Lenses:'+props.info.lenses):null}<br/>
            {props.info.editing?('Editing Tool:'+props.info.editing):null}<br/>
            {props.info.others?('Others:'+props.info.others):<br/>}
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
        Avg Rating:<Rating name="read-only" value={4} readOnly />(14k)
      </CardActions>
    </Card>
  );
}

export default ImageCards;
