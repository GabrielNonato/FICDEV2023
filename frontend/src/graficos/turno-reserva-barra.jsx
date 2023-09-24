import React from 'react'
import Chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

const testandoDash = ['N1']

const data = {
    labels: testandoDash,
    datasets: [
        {
            label:'meu primeiro dash',
            backgroundColor: 'aqua',
            borderColor:'black',
            data:[1,2,4],
        },
    ],
};

function GraficoBarraTurno(){
    return(
        <div className='bg-white border border-secondary'>
            <Bar data={data}></Bar>
        </div>
    )
}

export default GraficoBarraTurno