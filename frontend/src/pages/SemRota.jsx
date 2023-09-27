import { Link } from 'react-router-dom'

export function SemRota() {

    return (
        
        <div className="d-flex">
            <div className="col">
                <h5>A rota acessada é inexistente, por favor retorne ao nosso site <Link to="/">aqui</Link>.</h5>
            </div>
        </div>
    );

}