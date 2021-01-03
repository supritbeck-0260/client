import React,{useState,useContext} from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {ServicesContex} from '../App';
const useStyles = makeStyles((theme) => ({
    mainTile:{
        display:'flex',
        width:'100%',
        justifyContent:'left',
        alignItems: 'center',
    },
    tile1:{
        width:'20%',
        height:'36px',
        background:'rgba(0,0,0,.03)',
        border: '1px solid rgba(0,0,0,.125)',
        display:'flex',
        justifyContent:'center',
        alignItems: 'center',
        margin:'10px',
        borderRadius:'5%'
    },
    tile2:{
        width:'77%;',
        height:'25px',
        display:'flex',
        alignItems: 'center',
        position:'relative',
        padding:'0 5px 0 0'
    },
    textArea:{
        width:'100%',
    },
    dropdownMenu:{
        background:'white',
        zIndex:'2222',
        width:'fit-content',
        position:'absolute',
        border:'2px solid silver',
        padding:'0',
        margin:'0',
        listStyleType: "none",
        top: '45px',
        left: '15px',
        padding: '5px',
        borderRadius:'5px'
    },
    li:{
        padding:'5px',
    }
}));
const InputGroup = (props) =>{
    const classes = useStyles();
    const services = useContext(ServicesContex);
    const [product,setProduct] = useState([]);
    const changHandler = (e)=>{
        props.change(e.target);
        if(e.target.name !='about' && e.target.name !='location'){
            services.fetchProduct(e.target.name,e.target.value).then(response=>{
                switch(response.status){
                    case 200:
                    setProduct(response.data);
                        break;
                  }
                });
            }
    }
    return(
        <>
        <div className={classes.mainTile}>
                <div className={classes.tile1} style={{fontSize:props.styles.fonts}}>{props.label}</div>
                <div className={classes.tile2} style={{margin:props.styles.tile2}}>
                <TextField
                            name={props.name}
                            className={classes.textArea}
                            id={props.id}
                            label={props.label2}
                            placeholder={props.placeholder}
                            multiline
                            size={props.styles.size}
                            variant={props.variant}
                            value={props.value?props.value.value:''}
                            onChange={changHandler}
                            onFocus={changHandler}
                            onBlur={()=>setProduct([])}
                        /> 
                           
                           {product.length?<ul className={classes.dropdownMenu}>
                            {product.map((value,index)=>
                            <li key={index} onMouseDown={()=>{props.handleBlur(props.name,value);setProduct([])}} className={classes.li}>{value.name}</li>)   }
                            </ul>:null}
                </div>
        </div>
        </>
    );
}

export default InputGroup;