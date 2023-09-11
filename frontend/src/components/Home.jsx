import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Home() {
    
    return(
        <>
            <br></br>   
            <Link to="/customers">
                <Button type="submit">Clientes</Button>
            </Link>
            
            <br></br>
            <br></br>
            <br></br>   

            <Link to="/foods">
                <Button type="submit">Alimentos</Button>
            </Link>
            
        </>
    );
    
}