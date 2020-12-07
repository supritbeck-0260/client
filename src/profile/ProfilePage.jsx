import React, { useEffect, useState } from 'react';
import Grid from './Grid';
import ImageGridList from './ImageGridList';
import Axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';

const ProfilePage = (props)=>{
    const location = useLocation();
    const {id} = useParams();
    const [notFound,setNotFound] = useState(null);
    const [images,setImages] = useState(null);
    const userPictures = ()=>{
        Axios.post('http://localhost:5000/profile/images',{id:id}).then(response=>{
            switch(response.status){
                case 200:
                    setImages(response.data);
                    props.getFun(0);
                    break;
                case 201:
                    setNotFound(response.data.message);
                    break;
              }

        });
    }
useEffect(()=>{
    userPictures();
},[location]);
    return(
        <>
        <Grid/>
        {!notFound?<div><hr/>
        <ImageGridList getFun={props.getFun} images={images}/></div>:null}
        </>
    );
}

export default ProfilePage;