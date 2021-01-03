import React from 'react';
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
import LensOutlinedIcon from '@material-ui/icons/LensOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
  const data = [
    {
        avt:(value)=><CameraAltRoundedIcon className={value}/>,
        label:"Camera",
        key:'camera',
        values:[]
           
    },
    {
        avt:(value)=><LensOutlinedIcon className={value}/>,
        label:"Lenses",
        key:'lenses',
        values:[]
    },
    {
        avt:(value)=><EditOutlinedIcon className={value}/>,
        label:"Editing Software",
        key:'editing',
        values:[]   
    },
    {
        avt:(value)=><LibraryAddOutlinedIcon className={value}/>,
        label:"Others",
        key:'others',
        values:[]  
    },
]
export default data;