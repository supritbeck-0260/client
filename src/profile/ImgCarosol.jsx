import React, { useContext } from 'react';
import {AuthContex,ServicesContex} from '../App';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowLeftIcon from '@material-ui/icons/ArrowBackIos';
import ArrowRightIcon from '@material-ui/icons/ArrowForwardIos';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import data from '../upload/Data';
import InputGroup from '../upload/InputGroup';
import CloseIcon from '@material-ui/icons/Close';
import { useState,useEffect } from 'react';
import Axios from 'axios';
import FadeIn from 'react-fade-in';
import {useParams,NavLink} from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
const useStyles = makeStyles((theme) => ({
    root: {
     position: 'fixed',
     top: '0',
     left: '0',
     width:'100%',
     height: '100vh',
     background: 'rgba(0, 0, 0, 0.6)',
     display:'flex',
     justifyContent:'center',
     zIndex:'1111',
    overflowY:'auto',
    overflowX:'hidden',
    },
    img:{
        maxHeight:'90%',
        maxWidth: '90%',
        borderRadius:'10px',
    },
    modal:{
      position:'relative',
      background:'rgb(255,255,255, 1)',
      height:'fit-content',
      margin:'3% 0',
      display:'flex',
      alignItems:'center',
      flexDirection:'column',
      borderRadius:'5px',
    },
    imgCont:{
      width:'100%',
      height:'100%',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
    },
    arrowAndImageLarge:{
      width:'70vw',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
    },
    arrowAndImageSmall:{
      width:'100%',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
    },
    button:{
      width:'100%',
      display:'flex',
      padding:'0px',
      justifyContent:'space-between'
    },
    buttons:{
      width:'98%',
      display:'flex',
      padding:'5px',
      justifyContent:'space-between'
    },
    cancelDiv:{
      width:'100%',
      position:'absolute',
    },
    cancel:{
      float:'right',
      minWidth:'10px',
      width:'28px',
      height:'28px',
      borderRadius:'50%',
      margin:'1px'
    },
    info:{
      width:'70%',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column',
    },
    BtnShapeR:{
      position:'absolute',
      right:'0px',
      width:'50px',
      height:'58px',
      borderRadius:'50%',
    },
    BtnShapeL:{
      position:'absolute',
      left:'0px',
      width:'50px',
      height:'58px',
      borderRadius:'50%',
    },
    BtnWidth:{
      width:'50%'
    }
  }));
const ImgCarosol = props => {
    const imageData = props.allImages;
    const auth = useContext(AuthContex);
    const services = useContext(ServicesContex);
    const [save,setSave] = useState('Save');
    const [deleteBtn, setDelete] = useState('Delete');
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');
    const {id} = useParams();
    const isAuth =  (id==auth.userID);
    const [photo,setPhoto] = useState({
      info:imageData[props.imgId],
      id:props.imgId
    }); 
    const [photoInfo,setPhotoInfo] = useState({
      about:photo.info.about,
      camera:photo.info.camera,
      lenses:photo.info.lenses,
      editing:photo.info.editing,
      others:photo.info.others,
      location:photo.info.location,
      uid:photo.info.uid,
      id:photo.info._id,
  });
    const [leftArrFlg,setLeftArrFlg] = useState(true);
    const [rightArrFlg,setRightArrFlg] = useState(true);
    const [edit,setEdit]= useState(false);
    const [arrImgClss,setImgClss]=useState(classes.arrowAndImageLarge);
    const handleClose = () => {
      props.toggle();
    };
    
    const getValue = (target) =>{
    setPhotoInfo((prev)=>{
      prev[target.name]={value:target.value};
      return {...prev};
  });
  }
    const checkArrows = () =>{
      if(imageData.length <=1){
        setLeftArrFlg(false);
        setRightArrFlg(false);
      }
      if(photo.id === 0){
        setLeftArrFlg(false);
        if(photo.id !== imageData.length-1){
          setRightArrFlg(true);
        }
      }else if(photo.id === imageData.length-1){
        setRightArrFlg(false);
        if(photo.id !== 0){
          setLeftArrFlg(true);
        }
      }else{
        setLeftArrFlg(true);
        setRightArrFlg(true);
      }
    } 
    useEffect(()=>{
      checkArrows();
    },[photo.id]);
 
 useEffect(()=>{
      if(!matches){
        setImgClss(classes.arrowAndImageSmall);
      }else{
        setImgClss(classes.arrowAndImageLarge);
      }
    },[matches]);
    
    const leftImgae = (id)=> {
      imageData.map((val,index)=>{
          if(index ===id && index !==0){
            setPhoto({
              info:imageData[index-1],
              id:index-1
            });
           }
          else if(index ===id && index ===0){
            setPhoto({
              info:imageData[index],
              id:index
            });
          }
        });
    };
    const rightImgae = (id)=> {
      imageData.map((val,index)=>{
          if(index ===id && index !==imageData.length-1){
            setPhoto({
              info:imageData[index+1],
              id:index+1
            });
           }
          else if(index ===id && index ===imageData.length-1){
            setPhoto({
              info:imageData[index],
              id:index
            });
          }
        });
    }
    const editHandler = () =>{
      setPhotoInfo(prev=>{
        prev['id']=photo.info._id;
        prev['uid'] = photo.info.uid;
        prev['about'] = photo.info.about;
        prev['camera'] = photo.info.camera;
        prev['lenses'] = photo.info.lenses;
        prev['editing'] = photo.info.editing;
        prev['others'] = photo.info.others;
        prev['location'] = photo.info.others;
        return{...prev}
      });
      setEdit(true);
      setLeftArrFlg(false);
      setRightArrFlg(false);
    }
    const cancelHancler = ()=>{
      setEdit(false);
      checkArrows();
    }
    const postData = () =>{
      setSave('Saving...');
      Axios.post(process.env.REACT_APP_SERVER_URL+'/upload/edit',photoInfo,{
        headers:{
          'authorization': auth.token
        }
      }).then(response=>{
          switch(response.status){
            case 200:
                services.updateContex(false,false,true);
                handleClose();
                setSave('Save');
                break;
            case 201:
                handleClose();
                setSave('Save');
                break;
          }
      });
  }
  const handleBlur = (name,data) => {
    setPhotoInfo((prev)=>{
      prev[name]={value:data.name,link:data.link};
      return {...prev};
  });
  };
  const deleteHandler = ()=>{
    setDelete('Deleting...');
    Axios.post(process.env.REACT_APP_SERVER_URL+'/upload/delete',{id:photoInfo.id,uid:photoInfo.uid},{
      headers:{
        'authorization': auth.token
      }
    }).then(response=>{
      services.updateContex(false,false,true);
      handleClose();
      setDelete('Delete');
    });
  }
    return (
        <>
        
    <div className={classes.root}>
        <FadeIn>
        <div className={classes.modal}>
          <div className={classes.cancelDiv}>
            <Button variant="contained" color="secondary" className={classes.cancel} onClick={handleClose}><CloseIcon/></Button>
          </div>
            <div className={arrImgClss}>
                {leftArrFlg?<Button variant="contained" className={classes.BtnShapeL} onClick={()=>leftImgae(photo.id)}><ArrowLeftIcon/></Button>:null}
                        <NavLink to={'/detailed/'+photo.info._id} className={classes.imgCont}>
                          <CardMedia
                              component="img"
                              alt={photo.info.about?photo.info.about.value:''}
                              height="500"
                              image={process.env.REACT_APP_SERVER_URL+'/uploads/'+photo.info.filename}
                              title={photo.info.about?photo.info.about.value:''}
                          />
                        </NavLink>
                {rightArrFlg?<Button variant="contained" className={classes.BtnShapeR} onClick={()=>rightImgae(photo.id)}><ArrowRightIcon /></Button>:null}
            </div> 
            {(isAuth && !edit)?<div className={classes.button}>
                <Button  variant="contained" className={classes.BtnWidth} color="primary" onClick={editHandler}>Edit</Button>
                <Button variant="contained" className={classes.BtnWidth}  color="secondary" onClick={deleteHandler} autoFocus>{deleteBtn}</Button>
            </div>:null}
            {edit?<div className={classes.info}>
            {data.map((val,index)=>
                        <InputGroup 
                        key={index}
                        name={val.name}
                        value={photoInfo[val.name]?photoInfo[val.name]:''}
                        label={val.label}
                        id={val.id}
                        label2={val.label2}
                        placeholder={val.placeholder}
                        variant={val.variant}
                        change={getValue}
                        handleBlur={handleBlur}
                        />
                    )}
            <div className={classes.buttons}>
            <Button className={classes.BtnWidth}  variant="contained" color="primary" onClick={postData}>{save}</Button>
            <Button className={classes.BtnWidth} variant="contained"  color="secondary" autoFocus onClick={cancelHancler}>Cancel</Button>
            </div>
            </div>
            :null}
        </div>
        </FadeIn>
    </div>
        </>
    );
};


export default ImgCarosol;