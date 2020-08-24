import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import imageData from './ImageData';
import { useEffect,useState } from 'react';
import ImgCarosol from './ImgCarosol';

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
  const openImage = (data)=>{
    setImgInfo(data);
  };
  const toggleModal = ()=>{
    setModal(val=>{
      return val=!val;
    });
    console.log("toggle modal");
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
  return (
    <>
    <div className={classes.root}>
      <GridList cellHeight={cellHeight} className={classes.gridList} cols={cells}>
        {imageData.map((tile,index) => (
          <GridListTile key={tile.title} cols={(index%8 === 0 ? 2:1)}>
            <img src={tile.img}  onClick={()=>{openImage(tile);toggleModal();}}  alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
       
    </div>
        <div>{modal?<ImgCarosol imgInfo={imgInfo} toggle={toggleModal} open={modal}/>:null}</div>
    </>
  );

}

export default ImageGridList;
