import React , {useEffect,useState,useContext} from 'react';
import {AuthContex} from '../../App';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chart from 'chart.js';
import NotFound from '../../NotFound/NotFound';
const useStyles = makeStyles({
    container:{
        width:'800px',
        height:'500px',
        margin:'auto'
    },
    loader:{
        width:'100%',
        height:'100vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
});
const Graph = () => {
    const [flag,setFlag] = useState(false);
    const [loading,setLoading] = useState(false);
    const [message,setMessage] = useState(null);
    const [owners,setOwner] = useState(null);
    const auth = useContext(AuthContex);
    const dateWiseGroup = (data)=>{
        let formated = {};
        data.forEach(value=>{
            const date = new Date(value.date).toLocaleDateString()
            if(formated[date]) formated[date].push(value);
            else {
              formated[date] = [];
              formated[date].push(value);
            }
          });
          return formated;
    }
    const ownerWiseGroup = (data)=>{
        let formated = {};
        data.forEach(value=>{
            if(formated[value.uid]) formated[value.uid].push(value);
            else {
              formated[value.uid] = [];
              formated[value.uid].push(value);
            }
          });
          return formated;
    }
    const generateGraph = graphInfo => {
        let labels = [];
        let data = [];
        for (let value in graphInfo){
            labels.push(value);
            data.push(graphInfo[value].length);
        }
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Click Frequency',
                data: data,
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor:'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    }
    useEffect(()=>{
        setLoading(true)
        Axios.get(process.env.REACT_APP_SERVER_URL+'/analysis/show',{
            headers:{
              'authorization': auth.token
            }
          }).then(response=>{
              console.log(response);
            setLoading(false);
            switch (response.status){
                case 200:
                generateGraph(dateWiseGroup(response.data));
                setOwner(ownerWiseGroup(response.data));
                console.log(ownerWiseGroup(response.data));
                break;
                case 201:
                setFlag(true);
                setMessage(response.data.message);
                break;
            }     
     });
    },[]);
    const classes = useStyles();
    return (
        <>
        {!loading && !flag?
        <div>
        <h1 style={{textAlign:'center'}}>User Activity Chart</h1>
            <div className={classes.container}>
            <canvas id="myChart"></canvas>
            </div>
            <div>
                {owners?Object.keys(owners).map(keys=> 
                    <table>
                        {/* <tr>
                            <th>Company</th>
                            <th>Contact</th>
                            <th>Country</th>
                        </tr> */}
                    {owners[keys].map(value=>
                        <tr>
                            <td>{value.owner}</td>
                            <td>{value.type}</td>
                            <td>{value.product}</td>
                            <td>{new Date(value.date).toLocaleDateString()}</td>
                        </tr>
                        )}
                    </table>
                    ):null}
            </div>
        </div>
        
        :flag?<NotFound message={message}/>:<div className={classes.loader}><CircularProgress color="secondary"/></div>}
   

        </>
    );
};

export default Graph;