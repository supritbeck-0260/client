import React, { useState,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import {ServicesContex} from '../App';
const useStyles = makeStyles((theme) => ({
    root:{
        position:'relative',
        width:'fit-content',
        display:'flex',
        border:'1px solid silver',
        padding:'5px',
        borderRadius:'12px',
        flexWrap:'wrap'
    },
    textBox:{
        position:'relative',
        outline:'none',
        border:'none' ,
        width:'165px',
        height:'30px'
    },
    chip:{
        position:'relative',
        width:'fit-content',
        background:'#D3D3D3',
        padding: '2px',
        margin: '1px',
        borderRadius:'10px',
        border:'1px solid silver',
        display: 'flex',
        alignItems: 'center',
    },
    dropdownMenu:{
        background:'white',
        zIndex:'2222',
        width:'170px',
        position:'absolute',
        border:'2px solid silver',
        padding:'0',
        margin:'0',
        listStyleType: "none",
        right: '-17px',
        padding: '5px',
        borderRadius:'5px',
        maxHeight:'200px',
        overflowY:'auto',
    },
    li:{
        padding:'5px',
    }

}));
const InputChips = (props) =>{
const [data,setData] = useState(props.data?props.data.values:[]);
const [value,setValue] = useState('');
const classes = useStyles();
const services = useContext(ServicesContex);
const [product,setProduct] = useState([]);
const keyHandler = (e)=>{
    const targetValue = e.target.value;
    if((e.key === 'Enter' || e.type === 'blur')){
        setData(prev=>{
            const index = prev.findIndex(check=>check.value==targetValue);
            if(index === -1 && targetValue.trim()){
                props.getFun(props.variable,[...prev,{value:targetValue}]);
                return [...prev,{value:targetValue}];
            }else{ 
                props.getFun(props.variable,prev);
                return prev
            }; 
        });
        setValue('');
        setProduct([]);
    }
}
const changeHandler = (e)=>{
    setValue(e.target.value);
    services.fetchProduct(e.target.name,e.target.value).then(response=>{
        switch(response.status){
            case 200:
            setProduct(response.data);
                break;
          }
        });
}
const deleteHandler = (value)=>{
    setData(prev=>{
        const filtered = prev.filter(val=>val.value !== value.value);
        props.getFun(props.variable,filtered);
        return filtered;
    });
}
const selectOne =(data)=>{
    setValue(data.name);
    setData(prev=>{
        const index = prev.findIndex(check=>check.value==data.name);
        if(index === -1)return [...prev,{value:data.name,link:data.link}];
        else return prev;  
    });

}
    return(
        <>
        <div className={classes.root}>
        {data.length?data.map((value,index)=>
        <div key={index} style={{fontSize:props.view.fonts}} className={classes.chip}>
            {value.value}
        <CancelIcon onClick={()=>deleteHandler(value)}/>
        </div>):null}
            <div style={{position:'relative'}}>
            <input type='text' name={props.variable} className={classes.textBox} value={value} onChange={changeHandler} onFocus={changeHandler} onKeyDown={keyHandler} onBlur={keyHandler} autocomplete="off" placeholder={props.data?props.data.placeholder:''}/>
            {product.length?<ul className={classes.dropdownMenu} style={{top:props.view.list}}>
                            {product.map((value,index)=>
                            <li key={index} onMouseDown={()=>{selectOne(value)}} className={classes.li}>{value.name}</li>)   }
                            </ul>:null}
            </div>
        </div>
        </>
    )
}

export default InputChips;