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
                height={550}
                series={[turnoMatutino, turnoVespertino, turnoNoturno]}
                options={{
                    labels: ['Leito', 'Cirúrgica'],
                    title: {
                        text: "Gráfico de Tipos de Salas"
                    }
                }}
            />

        </div>
    )
}

export default GraficoBarraTurno