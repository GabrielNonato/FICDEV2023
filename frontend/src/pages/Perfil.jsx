import { Container, Col, Card, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


import { PerfilUsuario } from "../components/PerfilUsuario";
import { Header } from "../components/Header";


import { deleteUsuario, getUsuario, updateUsuario } from "../services/usuario-services"

export function Perfil() {
    const [usuario, setUsuario] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const navigate = useNavigate();

    const id = sessionStorage.getItem('idUsuario')

    useEffect(() => {
        findUsuario(id);
        // eslint-disable-next-line
    }, []);

    async function findUsuario() {
        try {
            const result = await getUsuario(id);
            setUsuario(result.data);
            console.log(result.data)
        } catch (error) {
            console.error(error);

        }
    }

    async function removeUsuario() {
        try {
            await deleteUsuario(id);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }
    
    async function editUsuario(data) {
        try {   
            await updateUsuario({
                id: id,
                nome: data.nomeUsuario,
                email: data.emailUsuario,
                senha: data.senhaUsuario
            });
            await findUsuario();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container fluid>
            <Header title="Perfil" />
            <Card className="mb-3 p-3 bg-light">
                <Card.Title><strong>Email: </strong>{usuario.email}</Card.Title>
                <Card.Text><strong>Senha: </strong>{usuario.senha}</Card.Text>
                <Row xs="auto" className="d-flex justify-content-end">
                    <Button variant="primary" onClick={() => setIsUpdated(true)}>Editar</Button>
                    <Button
                        variant="outline-danger"
                        className="ms-3"
                        onClick={removeUsuario}
                    >
                        Apagar
                    </Button>
                </Row>
            </Card>
           
            
                
        </Container>
    );
}