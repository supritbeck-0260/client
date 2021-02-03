import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import {NavLink} from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles({
    table: {
        borderCollapse: 'collapse',
        width: '100%',
        boxShadow: 'grey 10px 10px 5px',
      },
    td:{
        border: '1px solid #dddddd',
        textAlign: 'left',
        padding: '8px',
      },
      tr: {
        backgroundColor: '#dddddd'
      },
      head:{
          display:'flex',
          flexDirection:'row',
          alignItems:'center'
      },
      navLink:{
        textDecoration:'none',
        fontSize:'20px',
        fontWeight:'bold',
        color:'black'
    },
});
const Table = (props) => {
    const classes = useStyles();
    return (
        <>
        <Accordion style={{width:'50%'}}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography className={classes.head}>
                <NavLink to={"/profile/"+props.keys} className={classes.navLink}>{props.index}. {props.owner[0].owner}({props.owner.length})</NavLink>
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
                    <table className={classes.table}>
                        <tr>
                            <th className={classes.td}></th>
                            <th className={classes.td}>Type</th>
                            <th className={classes.td}>Product</th>
                            <th className={classes.td}>Date</th>
                        </tr>
                    {props.owner.map((value,ind)=>
                        <tr className={ind%2==0?classes.tr:''}>
                            <td className={classes.td}>{ind+1}</td>
                            <td className={classes.td}>{value.type}</td>
                            <td className={classes.td}>{value.product}</td>
                            <td className={classes.td}>{new Date(value.date).toLocaleDateString()}</td>
                        </tr>
                        )}
                    </table>
            </AccordionDetails>
        </Accordion>
        </>
    );
};

export default Table;