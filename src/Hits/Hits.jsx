import React,{useEffect,useState} from 'react';
import {Carousel} from '3d-react-carousal';
import Axios from 'axios';

// let slides = [
//     <img  src="https://picsum.photos/800/300/?random" alt="1" />,
//     <img  src="https://picsum.photos/800/301/?random" alt="2" />  ,
//     <img  src="https://picsum.photos/800/302/?random" alt="3" />  ,
//     <img  src="https://picsum.photos/800/303/?random" alt="4" />  ,
//     <img src="https://picsum.photos/800/304/?random" alt="5" />   ];
const Hits = () =>{
    const [images,setImages] = useState([]);
useEffect(()=>{
        Axios.get(process.env.REACT_APP_SERVER_URL+'/hits').then(response=>{
            console.log(response);
            switch(response.status){
                case 200:
                    if(response.data.length){
                        const data = response.data;
                        console.log('data',data);
                       setImages(data.map((value)=><img  height='500px' src={process.env.REACT_APP_SERVER_URL+'/uploads/'+value.filename} alt={value.about}/>));
                    }
                    break;
                case 201:
                    break;
            }
        });
        },[]);
    return(
        <>
            {images.length?<Carousel slides={images} autoplay={true} interval={3000}/>:null}
        </>
    )
}

export default Hits;