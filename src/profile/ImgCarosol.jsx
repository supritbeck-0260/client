import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowLeftIcon from '@material-ui/icons/ArrowBackIos';
import ArrowRightIcon from '@material-ui/icons/ArrowForwardIos';
import CancelIcon from '@material-ui/icons/Cancel';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import data from '../upload/Data';
import InputGroup from '../upload/InputGroup';
// import imageData from './ImageData';
import { useState,useEffect } from 'react';
import Axios from 'axios';

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
    overflowX:'hidden'
    
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
      // justifyContent:'center',
      alignItems:'center',
      flexDirection:'column',
    },
    imgCont:{
      width:'80%',
      height:'100%',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
    },
    arrowAndImageLarge:{
      width:'70vw',
      // height:'77vh',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
    },
    arrowAndImageSmall:{
      width:'100%',
      // height:'77vh',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
    },
    button:{
      width:'72%',
      display:'flex',
      padding:'5px',
      justifyContent:'space-between'
    },
    buttons:{
      width:'98%',
      display:'flex',
      padding:'5px',
      justifyContent:'space-between'
    },
    cancelDiv:{
      width:'100%'
    },
    cancel:{
      float:'right'
    },
    info:{
      width:'70%',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column',
    }
  }));
const ImgCarosol = props => {
    const imageData = props.allImages;
    const [save,setSave] = useState('Save');
    const [deleteBtn, setDelete] = useState('Delete');
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');
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
          prev[target.name]=target.value;
          return {...prev};
      });
}
    const checkArrows = () =>{
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
      data[0].value = photo.info.about;
      data[1].value = photo.info.camera;
      data[2].value = photo.info.lenses;
      data[3].value = photo.info.editing;
      data[4].value = photo.info.others;
      setPhotoInfo(prev=>{
        prev['id']=photo.info._id;
        prev['about'] = photo.info.about;
        prev['camera'] = photo.info.camera;
        prev['lenses'] = photo.info.lenses;
        prev['editing'] = photo.info.editing;
        prev['others'] = photo.info.others;
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
    const postData = (event) =>{
      setSave('Saving...');
      Axios.post('http://localhost:5000/upload/edit',photoInfo).then(response=>{
          if(response.status == '200'){
              props.getFun();
              handleClose();
              setSave('Save');
          }
      });
  }
  const deleteHandler = ()=>{
    setDelete('Deleting...');
    Axios.post('http://localhost:5000/upload/delete',{id:photoInfo.id}).then(response=>{
      console.log(response);
      props.getFun();
      handleClose();
      setDelete('Delete');
    });
  }
    return (
        <>
        
    <div className={classes.root}>
        <div className={classes.modal}>
          <div className={classes.cancelDiv}><CancelIcon className={classes.cancel} onClick={handleClose}/></div>
            <div className={arrImgClss}>
                {leftArrFlg?<ArrowLeftIcon onClick={()=>leftImgae(photo.id)}/>:null}
                      <div className={classes.imgCont}>
                        <img className={classes.img} src={photo.info.path+photo.info.filename} alt="image"/>
                      </div>
                {rightArrFlg?<ArrowRightIcon onClick={()=>rightImgae(photo.id)}/>:null}
            </div> 
            {!edit?<div className={classes.button}>
                <Button  variant="contained" color="primary" onClick={editHandler}>Edit</Button>
    <Button variant="contained"  color="secondary" onClick={deleteHandler} autoFocus>{deleteBtn}</Button>
            </div>:null}
            {edit?<div className={classes.info}>
            {data.map((val,index)=>
                        <InputGroup 
                        key={index}
                        name={val.name}
                        value={val.value?val.value:''}
                        label={val.label}
                        id={val.id}
                        label2={val.label2}
                        placeholder={val.placeholder}
                        variant={val.variant}
                        change={getValue}
                        />
                    )}
            <div className={classes.buttons}>
            <Button  variant="contained" color="primary" onClick={postData}>{save}</Button>
            <Button variant="contained"  color="secondary" autoFocus onClick={cancelHancler}>Cancel</Button>
            </div>
            </div>
            :null}
        </div>
    </div>
        </>
    );
};


export default ImgCarosol;