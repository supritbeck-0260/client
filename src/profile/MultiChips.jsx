import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    position:'relative',
    width:'fit-content',
    display:'flex',
    border:'1px solid silver',
    padding:'5px',
    borderRadius:'10px',
    margin:'2px',
  },
  link:{
    textDecoration:'none',
    color:'black'
  }
}));
const MultiChips = (props)=>{
  const classes = useStyles();
  const data = props.data;
    return(
        <>
        {data && data.length?data.map((val,ind)=>
        <div className={classes.root} style={{fontSize:props.view}} key={ind}>
          <a href={val.link?val.link:'https://www.google.com/search?q='+val.value} className={classes.link} target='_blank'>{val.value}</a>
          </div>
        ):null}
        </>
    )
}
export default MultiChips;
