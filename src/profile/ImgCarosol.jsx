import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowLeftIcon from '@material-ui/icons/ArrowBackIos';
import ArrowRightIcon from '@material-ui/icons/ArrowForwardIos';
import CancelIcon from '@material-ui/icons/Cancel';
import imageData from './ImageData';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
     position: 'fixed',
     top: '0',
     left: '0',
     width:'100%',
     height: '100%',
     background: 'rgba(0, 0, 0, 0.6)',
     display:'flex',
     justifyContent:'center',
  
    },
    img:{
        maxHeight:'90%',
        maxWidth: '90%',
        borderRadius:'10px',
    },
    modal:{
      marginTop:'70px',
      background:'rgb(255,255,255, 1)',
      height:'88vh',
      justifyContent:'center',
      alignItems:'center',
    },
    imgCont:{
      width:'80%',
      height:'100%',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
    },
    arrowAndImage:{
      width:'70vw',
      height:'77vh',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
    },
    buttons:{
      width:'98%',
      display:'flex',
      padding:'5px',
      justifyContent:'space-between'
    },
    cancel:{
      position:'relative',
      left:'97%',
    }
  }));
const ImgCarosol = props => {
    const classes = useStyles();
    const handleClose = () => {
      props.toggle();
    };
    const [photo,setPhoto] = useState(props.imgInfo); 
    console.log(imageData);
    console.log(photo);
    
    const leftImgae = (id)=> {
      imageData.map((val,index)=>{
          if(id === val.title && index !==0){
            setPhoto(imageData[index-1]);
           }
          else if(id === val.title && index ===0){
            setPhoto(imageData[index]);
          }
        });
    };
    const rightImgae = (id)=> {
      imageData.map((val,index)=>{
          if(id === val.title && index !==imageData.length-1){
            setPhoto(imageData[index+1]);
           }
          else if(id === val.title && index ===imageData.length-1){
            setPhoto(imageData[index]);
          }
        });
    }
    return (
        <>
        
    <div className={classes.root}>
        <div className={classes.modal}>
          <CancelIcon className={classes.cancel} onClick={handleClose}/>
            <div className={classes.arrowAndImage}>
                <ArrowLeftIcon onClick={()=>leftImgae(photo.title)}/>
                      <div className={classes.imgCont}>
                        <img className={classes.img} src={photo.img} alt="image"/>
                      </div>
                <ArrowRightIcon onClick={()=>rightImgae(photo.title)}/>
            </div> 
            <div className={classes.buttons}>
                <Button  variant="contained" color="primary">Edit</Button>
                <Button variant="contained"  color="secondary" autoFocus>Delete</Button>
            </div>
        </div>
    </div>
        </>
    );
};


export default ImgCarosol;