import { Container, Nav, Navbar } from 'react-bootstrap';

import '../style.css'; 


export function NavbarComponent() {
    return (
        <Navbar className="custom-navbar bg-dark">
            <Container fluid>
                
                    <Nav className="me-auto">
                        <Nav.Link href="/home"><strong className='aumentarTamanhoNav text-light'>Dashboard</strong></Nav.Link>
                        <Nav.Link href="/sala"><strong className='aumentarTamanhoNav text-light'>Salas</strong></Nav.Link>
                        <Nav.Link href="/reserva"><strong className='aumentarTamanhoNav text-light'>Reservas</strong></Nav.Link>
                        <Nav.Link href="/ajuda"><strong className='aumentarTamanhoNav text-light'>Ajuda</strong></Nav.Link>
                    </Nav>
                    <Nav>
                        <Navbar.Brand href="/perfil">
                            <i className="bi bi-person fs-1 text-light"></i>
                        </Navbar.Brand>
                        <Navbar.Brand
                            href="/"
                            onClick={() => {
                                sessionStorage.removeItem('token');
                                sessionStorage.removeItem('idUsuario')
                            }}
                        >
                            <i className="bi bi-box-arrow-in-left fs-1 text-light"></i>
                        </Navbar.Brand>
                    </Nav>
             
            </Container>
        </Navbar>
    )
}