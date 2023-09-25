import React, { useEffect, useState } from 'react'
import Chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

import { getReservaMatutino, getReservaVespertino, getReservaNoturno } from '../services/reserva-services'

const testandoDash = ['MATUTINO','VESPERTINO','NOTURNO']

function GraficoBarraTurno(){
    const [turnoMatutino, setTurnoMatutino] = useState([]);
    const [turnoVespertino, setTurnoVespertino] = useState([]);
    const [turnoNoturno, setTurnoNoturno] = useState([]);
        
    useEffect(()=>{
        const pegarDados = async () =>{
            try {
                const matutino = await getReservaMatutino()
                const vespertino = await getReservaVespertino()
                const noturno = await getReservaNoturno()
    
                setTurnoMatutino(matutino.data)
                setTurnoVespertino(vespertino.data)
                setTurnoNoturno(noturno.data)
            } catch (error) {
                console.log(error)
            }
        }
        pegarDados()
    })

    const data = {
        labels: testandoDash,
        datasets: [
            {
                label:'Quantidade',
                backgroundColor: ['rgb(187,84,155)','rgb(235,47,60)','rgb(110,50,210)'],    
                borderColor:'black',
                data:[turnoMatutino,turnoVespertino,turnoNoturno],
            },
        ],
        
    };
    

    return(
        <div className='bg-white border border-secondary'>
            <Bar data={data}></Bar>
        </div>
    )
}

export default GraficoBarraTurno