import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useEffect,useState } from 'react';
import ImgCarosol from './ImgCarosol';
import Axios from 'axios';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: 'auto',
  },
}));

const ImageGridList =()=> {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');
  const [cellHeight, setCellHeight] = useState(250);
  const [cells, setCells] = useState(5);
  const [imgInfo,setImgInfo] = useState({});
  const [modal,setModal] = useState(false);
  const [images,setImages] = useState(null);
  const openImage = (id)=>{
    setImgInfo(id);
  };
  const toggleModal = ()=>{
    setModal(val=>{
      return val=!val;
    });
  }
  useEffect(()=>{
    if(matches){
        setCellHeight(250);
        setCells(6);
      }else{
        setCellHeight(130);
        setCells(3);
      }
  },[matches]);
  const getImges = ()=>{
    Axios.get('http://localhost:5000/getpics').then(response=>{
      setImages(response.data);
  });
}
  useEffect(()=>{
    getImges();
  },[]);
  
  return (
    <>
    <div className={classes.root}>
      <GridList cellHeight={cellHeight} className={classes.gridList} cols={cells}>
        {Array.isArray(images)?images.map((tile,index) => (
          <GridListTile key={tile._id} cols={(index%8 === 0 ? 2:1)}>
            <img src={tile.path+tile.filename}  onClick={()=>{openImage(index);toggleModal();}}  alt={tile.date} />
          </GridListTile>
        )):null}
      </GridList>
       
    </div>
        {/* <div>{uploadflag?<Upload getFun={getImges}/>:null}</div> */}
        {modal?<ImgCarosol imgId={imgInfo} getFun={getImges} allImages={images} toggle={toggleModal} open={modal}/>:null}
    </>
  );

}

export default ImageGridList;
