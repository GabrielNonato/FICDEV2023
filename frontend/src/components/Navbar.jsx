import { Container, Nav, Navbar } from 'react-bootstrap';

import '../style.css'; // Importe seu arquivo CSS


export function NavbarComponent() {
    return (
        <Navbar collapseOnSelect expand="lg" className="custom-navbar">
            <Container fluid>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href="/home"><strong className='aumentarTamanhoNav'>Dashboard</strong></Nav.Link>
                        <Nav.Link href="/sala"><strong className='aumentarTamanhoNav'>Salas</strong></Nav.Link>
                        <Nav.Link href="/reserva"><strong className='aumentarTamanhoNav'>Reservas</strong></Nav.Link>
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
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}