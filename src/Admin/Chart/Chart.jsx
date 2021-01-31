import React , {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';

import Chart from 'chart.js';
const useStyles = makeStyles({
    container:{
        width:'800px',
        height:'500px',
        margin:'auto'
    }
});
const Graph = () => {
    
    useEffect(()=>{
        Axios.get(process.env.REACT_APP_SERVER_URL+'/analysis/show').then(response=>{
            const graphInfo = response.data;
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
     });
    },[]);
    const classes = useStyles();
    return (
        <>
        <h1 style={{textAlign:'center'}}>User Activity Chart</h1>
        <div className={classes.container}>
        <canvas id="myChart"></canvas>
        </div>
        

        </>
    );
};

export default Graph;