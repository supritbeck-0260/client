import React, { useEffect, useState, useContext } from 'react';
import {ServicesContex} from '../App';
import Grid from './Grid';
import ImageGridList from './ImageGridList';
import Axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';

const ProfilePage = (props)=>{
    const location = useLocation();
    const services = useContext(ServicesContex);
    const {id} = useParams();
    const [notFound,setNotFound] = useState(null);
    const [images,setImages] = useState(null);
    const userPictures = ()=>{
        Axios.post(process.env.REACT_APP_SERVER_URL+'/profile/images',{id:id}).then(response=>{
            switch(response.status){
                case 200:
                    setImages(response.data);
                    break;
                case 201:
                    setNotFound(response.data.message);
                    break;
              }

        });
    }
useEffect(()=>{
    userPictures();
},[location,services.reload]);
    return(
        <>
        <Grid/>
        {!notFound?<div><hr/>
        <ImageGridList images={images}/></div>:null}
        </>
    );
}

export default ProfilePage;