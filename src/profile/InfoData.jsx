import React from 'react';
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
import LensOutlinedIcon from '@material-ui/icons/LensOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
  const data = [
    {
        avt:<CameraAltRoundedIcon/>,
        label:"Camera",
        key:'camera',
        values:[]
           
    },
    {
        avt:<LensOutlinedIcon/>,
        label:"Lenses",
        key:'lenses',
        values:[]
    },
    {
        avt:<EditOutlinedIcon/>,
        label:"Editing Software",
        key:'editing',
        values:[]   
    },
    {
        avt:<LibraryAddOutlinedIcon/>,
        label:"Others",
        key:'others',
        values:[]  
    },
]
export default data;