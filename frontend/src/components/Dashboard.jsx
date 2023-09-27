import 'bootstrap-icons/font/bootstrap-icons.css';

import {  Row, Col, Card } from "react-bootstrap";

import { salasAnalisadas } from '../services/sala-services'
import { quantidadeAnoReservas, totalReservas } from '../services/reserva-services';
import '../style.css'
import GraficoBarraTurno from '../graficos/turno-reserva-barra'
import React, { useEffect, useState } from 'react'
import GraficoLinhaTrimestre from '../graficos/trimestre-reserva-linha';



export function Dashboard() {

    const [quantidadeDeSalas, setQuantidadeDeSalas] = useState([]);
    const [quantidadeDeReservasAno, setQuantidadeDeReservasAno] = useState([]);
    const [quantidaReservaTotal, setQuantidadeReservaTotal] = useState([]);
        
    useEffect(()=>{
        const pegarDados = async () =>{
            try {
                const quantidadeSalas = await salasAnalisadas()
                const quantidadeReservasAno = await quantidadeAnoReservas()
                const totalDeReservas = await totalReservas()
    
                setQuantidadeDeSalas(quantidadeSalas.data)
                setQuantidadeDeReservasAno(quantidadeReservasAno.data)
                setQuantidadeReservaTotal(totalDeReservas.data)
            } catch (error) {
                console.log(error)
            }
        }
        pegarDados()
    })
    
    return (
        <>
       <div className='p-5 bg-light'>
            <div className="container-fluid">
                <div className="row">
                    <div className="d-flex justify-content-around align-items-center col p-3 bg-white border border-secundary shadow-sm">
                        <i className="bi bi-arrow-left-square-fill fs-1 text-success"></i>
                        <div>
                            <p className='TextoDash'><strong>Salas analisadas</strong></p>
                            <h2>{quantidadeDeSalas}</h2>
                        </div>
                    </div>
                    <div className="d-flex justify-content-around align-items-center col p-3 bg-white border border-secundary shadow-sm">
                        <i className="bi bi-calendar-event fs-1 text-primary"></i>
                        <div>
                            <p className='TextoDash'><strong>Reservas no ano</strong></p>
                            <h2>{quantidadeDeReservasAno}</h2>
                        </div>
                    </div>
                    <div className="d-flex justify-content-around align-items-center col p-3 bg-white border border-secundary shadow-sm">
                        <i className="bi bi-calendar2-check-fill fs-1 text-warning"></i>
                        <div>
                            <p className='TextoDash'><strong>Reservas (Todos os tempos)</strong></p>
                            <h2>{quantidaReservaTotal}</h2>
                        </div>
                    </div>
                </div>
                
            </div>    
           
       </div>
       <Row>
       <Col lg={6} md={12}>
           <Card className="custom-card">
               <Card.Body>
                    <GraficoBarraTurno/>
               </Card.Body>
           </Card>
       </Col>

       <Col lg={6} md={12}> 
           <Card className="custom-card">
               <Card.Body>
                   <GraficoLinhaTrimestre/>
               </Card.Body>
           </Card>
       </Col>
   </Row>
   </>
    );

}

export default Dashboard