import 'bootstrap-icons/font/bootstrap-icons.css';

import { salasAnalisadas } from '../services/sala-services'
import { quantidadeAnoReservas, totalReservas } from '../services/reserva-services';
import '../style.css'
import GraficoBarraTurno from '../graficos/turno-reserva-barra'


const quantidadeSalas = await salasAnalisadas()
const quantidadeReservasAno = await quantidadeAnoReservas()
const totalDeReservas = await totalReservas()

export function Dashboard() {
    
    return (
       <div className='p-5 bg-light'>
            <div className="container-fluid">
                <div className="row">
                    <div className="d-flex justify-content-around align-items-center col p-3 bg-white border border-secundary shadow-sm">
                        <i className="bi bi-arrow-left-square-fill fs-1 text-success"></i>
                        <div>
                            <p className='TextoDash'><strong>Salas analisadas</strong></p>
                            <h2>{quantidadeSalas.data}</h2>
                        </div>
                    </div>
                    <div className="d-flex justify-content-around align-items-center col p-3 bg-white border border-secundary shadow-sm">
                        <i className="bi bi-calendar-event fs-1 text-primary"></i>
                        <div>
                            <p className='TextoDash'><strong>Reservas no ano</strong></p>
                            <h2>{quantidadeReservasAno.data}</h2>
                        </div>
                    </div>
                    <div className="d-flex justify-content-around align-items-center col p-3 bg-white border border-secundary shadow-sm">
                        <i className="bi bi-calendar2-check-fill fs-1 text-warning"></i>
                        <div>
                            <p className='TextoDash'><strong>Reservas já feitas</strong></p>
                            <h2>{totalDeReservas.data}</h2>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 col-md-8 p-3'>
                        <GraficoBarraTurno/>
                    </div>
                    
                </div>
            </div>
       </div>
    );

}

export default Dashboard