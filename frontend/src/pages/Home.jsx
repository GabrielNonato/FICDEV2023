import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Home() {

    return (
        <div className="text-center mt-5">
            <p>Selecione a opcao desejada</p>
            <Link to="/perfil">
                <Button type="submit">Perfil</Button>
            </Link>

            <Link to="/sala">
                <Button type="submit">Salas</Button>
            </Link>

            <Link to="/reserva">
                <Button type="submit">Reservas</Button>
            </Link>

        </div>
    );

}