import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CircularProgress from '@material-ui/core/CircularProgress';
import Axios from 'axios';
import SelectBox from './SelectBox';
import ProductSearch from './ProductSearch';
import PhotographerSearch from './PhotographerSearch';
const useStyles = makeStyles((theme) => ({
    headerM:{
        width:'100%',
        height:'fit-content',
        margin:'auto',
        border:'1px solid rgb(211,211,211)',
        borderRadius:'5px',
        display:'flex',
        justifyContent:'center',
    },
    headerW:{
        width:'60%',
        height:'fit-content',
        margin:'auto',
        border:'1px solid rgb(211,211,211)',
        borderRadius:'5px',
        display:'flex',
        justifyContent:'center'
    },
    inputBox:{
        width:'60%',
        margin:'auto',
        border:'1px solid rgb(211,211,211)', 
        borderRadius:'5px',
        display:'flex',
        justifyContent:'row',
        margin:'5px',
    },
    input:{
        border:'none',
        outline:'none',
        margin:'5px',
        width:'86%',
        fontSize: '25px',
    },
    searchBtn:{
        minWidth:'20px',
        width:'43px',
    },
    container:{
        marginTop:'10px',
        border:'1px solid rgb(211,211,211)',
        borderRadius:'5px',
    },
    results:{
        padding:'5px',
        background:'rgb(211,211,211)',
        borderRadius:'5px',
    },
    loader:{
        height:'300px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    }
    }));
const Search = () => {
    const classes = useStyles();
    const [view,setView] = useState({header:classes.headerW});
    const matches = useMediaQuery('(min-width:600px)');
    const [results,setResults] = useState([]);
    const [resultF,setResultF] = useState(false);
    const [searchType,setSearchType] = useState({category:'',search:''});
    const [data,setData] = useState({category:'camera',search:''});
    const [message,setMessage] = useState(null);
    const [loading,setLoading] = useState(false);
    const getValues = (type,value)=>{
        setData(prev=>{
            prev[type]=value;
            return {...prev};
        });
    }
    const search = (param)=>{
        setLoading(true);
        setResults([]);
        setResultF(false);
        setSearchType({category:'',search:''});
        Axios.post(process.env.REACT_APP_SERVER_URL+'/search',{...data,param}).then(response=>{
            console.log(response);
            setSearchType({search:response.data.search,category:response.data.category});
            switch(response.status){
                case 200:
                    setResults(response.data.filtered);
                    setResultF(true);
                    setLoading(false);
                    break;
                case 201:
                    setLoading(false);
                    setMessage(response.data.message);
                    break
            }

        });
    }
    useEffect(()=>{
        if(matches){ 
            setView({header:classes.headerW});
        }else{ 
            setView({header:classes.headerM});
        }
    },[matches]);
    useEffect(()=>search('all'),[]);
    return (
        <>
        <div className={view.header}>
        <SelectBox value={data.category} getValues={getValues}/>
            <div className={classes.inputBox}>
                <input className={classes.input} value={data.search} 
                onChange={(e)=>getValues('search',e.target.value)} 
                onKeyDown={(e)=>(e.key === 'Enter'?search():'')}
                placeholder='Search Box' type="text"/>
                <Button className={classes.searchBtn} disabled={data.search.length==0} onClick={search}><SearchIcon/></Button>
            </div>
        </div>
       {resultF?<div style={{width:'100%',marginTop:'8px'}}>
           <span className={classes.results}>{results.length} results found for <b>'{searchType.search}'</b> in {searchType.category} category.</span>
           </div>:null}
        <div className={classes.container}>
            {!loading?
                results.length?
                 searchType.category=='photographer'?<PhotographerSearch value={results} />:<ProductSearch value={results} type={searchType}/>
                :<h2 className={classes.loader}>{message}</h2>
            :<div className={classes.loader}><CircularProgress color="secondary" /></div>}
        </div>
        </>
    );
};

export default Search;