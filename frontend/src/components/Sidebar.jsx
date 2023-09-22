import React, { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";
import '../style.css'

function Sidebar(){
    const [ativo,setAtivo] = useState(1);
    return(
        <div className='sidebar d-flex justify-content-between flex-column bg-dark text-white py-3 ps-3 pe-3  vh-100'>
            <div>
                <Link className='removeDestaque' to="/home">
                    <span className='fs-4'> RESERVAS</span>
                </Link>
                <hr className='text-white mt-2'/>
                <ul className='nav nav-pills flex-column mt-2'>
                    <li className={ativo ===1 ? 'ativo nav-item p-2':'nav-item p-2'}
                        onClick={e => setAtivo(1)}>
                    <Link className='removeDestaque' to="/home">
                        <i className='bi bi-speedometer2 me-3 fs-5'></i>
                        <span className='fs-6'><strong>DASHBOARD</strong></span>
                    </Link>
                    </li>
                    <li className={ativo === 2 ? 'ativo nav-item p-2':'nav-item p-2'}
                        onClick={e => setAtivo(2)}>
                    <Link className='removeDestaque' to="/reserva">
                        <i className='bi bi-calendar me-3 fs-5'></i>
                        <span className='fs-6'><strong>RESERVAS</strong></span>
                    </Link>
                    </li>
                    <li className={ativo ===3 ? 'ativo nav-item p-2':'nav-item p-2'}
                        onClick={e => setAtivo(3)}>
                    <Link className='removeDestaque' to="/sala">
                        <i className='bi bi-box me-3 fs-5'></i>
                        <span className='fs-6'><strong>SALAS</strong></span>
                    </Link>
                    </li>
                </ul>
            </div>
            <div>
                <hr className='text-white'/>
                <div className='nav-item p-2'>
                    <Link className='removeDestaque' to="/perfil">
                        <i className='bi bi-person-circle me-3 fs-5'></i>
                        <span className='fs-4'><strong>PERFIL</strong></span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar