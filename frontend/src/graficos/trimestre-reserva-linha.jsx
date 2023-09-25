import React, { useEffect, useState } from 'react'
// eslint-disable-next-line
import Chart from 'react-apexcharts'

import { getReservaMatutino, getReservaVespertino, getReservaNoturno } from '../services/reserva-services'

function GraficoLinhaTrimestre() {
    // const [turnoMatutino, setTurnoMatutino] = useState([]);
    // const [turnoVespertino, setTurnoVespertino] = useState([]);
    // const [turnoNoturno, setTurnoNoturno] = useState([]);

    // useEffect(() => {
    //     const pegarDados = async () => {
    //         try {
    //             const matutino = await getReservaMatutino()
    //             const vespertino = await getReservaVespertino()
    //             const noturno = await getReservaNoturno()

    //             setTurnoMatutino(matutino.data)
    //             setTurnoVespertino(vespertino.data)
    //             setTurnoNoturno(noturno.data)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     pegarDados()
    // })


    return (
        <div className='bg-white border border-secondary'>
            <Chart
                type='line'
                width='100%' /* Use 100% de largura para tornar o gráfico responsivo */
                height={550}
                series={[{
                    name:"produtos",
                    data: [1, 9, 3, 4]
                }]}
                options={{
                    stroke: {
                        curve: 'stepline',
                      }
                }}
            />

        </div>
    )
}

export default GraficoLinhaTrimestre

// const [trimestreUm, setTrimestreUm] = useState([]);
// const [trimestreDois, setTrimestreDois] = useState([]);
// const [trimestreTres, setTrimestreTres] = useState([]);
// const [trimestreQuatro, setTrimestreQuatro] = useState([]);

// useEffect(() => {
//     const pegarDados = async () => {
//         try {
//             const um = await trimestreUm()
//             const dois = await trimestreDois()
//             const tres = await trimestreTres()
//             const quatro = await trimestreQuatro()

//             setTrimestreUm(um.data)
//             setTrimestreDois(dois.data)
//             setTrimestreTres(tres.data)
//             setTrimestreQuatro(quatro.data)
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     pegarDados()
// })