// import { Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard'

export function Home() {

    return (
        <div className="d-flex">
            <div className="w-auto">
                <Sidebar/>
            </div>
            <div className="col">
                <Navbar />
                <Dashboard/>
            </div>
        </div>
    );

}

 // <div className="text-center mt-5">
        <div className="d-flex">
            <div className="w-auto">
                <Sidebar/>
            </div>
            <div className="col">
                <Navbar />
            </div>
        </div>
            // {/* <p>Selecione a opcao desejada</p>
            // <Link to="/perfil">
            //     <Button type="submit">Perfil</Button>
            // </Link>

            // <Link to="/sala">
            //     <Button type="submit">Salas</Button>
            // </Link>

            // <Link to="/reserva">
            //     <Button type="submit">Reservas</Button>
            // </Link> */}