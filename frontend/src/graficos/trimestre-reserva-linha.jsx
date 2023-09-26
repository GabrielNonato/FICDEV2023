import React, { useEffect, useState } from 'react'
// eslint-disable-next-line
import Chart from 'react-apexcharts'

import { trimestreUm, trimestreDois, trimestreTres, trimestreQuatro } from '../services/reserva-services'

function GraficoLinhaTrimestre() {
    
    const [triUm,setTriUm] = useState([])
    const [triDois,setTriDois] = useState([])
    const [triTres,setTriTres] = useState([])
    const [triQuatro,setTriQuatro] = useState([])

    useEffect(()=>{
        const pegarDados = async() =>{
            const um = await trimestreUm()
            const dois = await trimestreDois()
            const tres = await trimestreTres()
            const quatro = await trimestreQuatro()

            setTriUm(um.data)
            setTriDois(dois.data)
            setTriTres(tres.data)
            setTriQuatro(quatro.data)
        }
        pegarDados()
    })


    return (
        <div className='bg-white border border-secondary'>
            <Chart
                type='line'
                width='100%' 
                height={500}
                series={[{
                    name:'Trimestre',
                    data: [triUm, triDois, triTres, triQuatro]
                }]}
                options={{
                    labels:  ['Primeiro Trimestre','Segundo Trimestre', 'Terceiro Trimestre', 'Quarto Trimestre'],
                    stroke: {
                        curve: 'stepline',
                    },
                    title: {
                        text: "Reservas por trimestre",
                    },
                }}
            />

        </div>
    )
}

export default GraficoLinhaTrimestre
