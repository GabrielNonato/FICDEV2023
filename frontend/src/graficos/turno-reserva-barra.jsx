import React, { useEffect, useState } from 'react'
// eslint-disable-next-line
import Chart from 'react-apexcharts'

import { getReservaMatutino, getReservaVespertino, getReservaNoturno } from '../services/reserva-services'

function GraficoBarraTurno() {
    const [turnoMatutino, setTurnoMatutino] = useState([]);
    const [turnoVespertino, setTurnoVespertino] = useState([]);
    const [turnoNoturno, setTurnoNoturno] = useState([]);

    useEffect(() => {
        const pegarDados = async () => {
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


    return (
        <div className='bg-white border border-secondary'>
            <Chart
                type='bar'
                width='100%'
                height={500}
                series={[
                    {
                        name: 'Turnos',
                        data: [turnoMatutino, turnoVespertino, turnoNoturno]
                    },
                ]}
                options={{
                    labels: ['Matutino', 'Vespertino','Noturno'],
                    title: {
                        text: "Quantidade de reservas por turno",
                    },
                    plotOptions: {
                        bar: {
                            distributed: true, 
                            horizontal: false,
                            barHeight: '85%',
                        },
                    },
                    colors: [ 
                        "#33b2df",
                        "#546E7A",
                        "#d4526e",
                    ],
                    
                }}
                
            />

        </div>
    )
}

export default GraficoBarraTurno