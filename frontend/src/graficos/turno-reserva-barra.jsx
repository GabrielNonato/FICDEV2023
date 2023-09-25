import React from 'react'
import Chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

import { getReservaMatutino, getReservaVespertino, getReservaNoturno } from '../services/reserva-services'

const matutino = await getReservaMatutino()
const vespertino = await getReservaVespertino()
const noturno = await getReservaNoturno()


const testandoDash = ['MATUTINO','VESPERTINO','NOTURNO']


const data = {
    labels: testandoDash,
    datasets: [
        {
            label:'Quantidade',
            backgroundColor: ['rgb(187,84,155)','rgb(235,47,60)','rgb(110,50,210)'],    
            borderColor:'black',
            data:[matutino.data,vespertino.data,noturno.data],
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