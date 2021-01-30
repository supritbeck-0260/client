import React , {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Chart from 'chart.js';
const useStyles = makeStyles({
    container:{
        width:'600px',
        height:'500px',
        margin:'auto'
    }
});
const Graph = () => {
    
    useEffect(()=>{
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: 'Click Frequency',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    // borderColor: [
                    //     'rgba(255, 99, 132, 1)',
                    //     'rgba(54, 162, 235, 1)',
                    //     'rgba(255, 206, 86, 1)',
                    //     'rgba(75, 192, 192, 1)',
                    //     'rgba(153, 102, 255, 1)',
                    //     'rgba(255, 159, 64, 1)'
                    // ],
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