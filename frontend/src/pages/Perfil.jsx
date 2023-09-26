import { Container, Modal, Card, Button, Row, Form, Col} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {NavbarComponent} from '../components/Navbar'
import { Input } from "../components/Input"

import { deleteUsuario, getUsuario, updateUsuario } from "../services/usuario-services"

export function Perfil(props) {
    const [usuario, setUsuario] = useState([]);
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'all' });
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
                nomeUsuario: data.nomeUsuario,
                emailUsuario: data.emailUsuario,
                senhaUsuario: data.senhaUsuario
            });
            await findUsuario();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        
        <Container fluid>
            <div className='col'>
                <NavbarComponent/>
            </div>
            
            <Card className="mb-3 p-3 bg-light">
                <Card.Title><strong>Nome: </strong>{usuario.nome}</Card.Title>
                <Card.Text><strong>Email: </strong>{usuario.email}</Card.Text>
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
           
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar usuario: {usuario.nome}</Modal.Title>
                </Modal.Header>
                <Form
                    noValidate
                    validated={!errors}
                    onSubmit={handleSubmit(editUsuario)}
                    autoComplete='off'
                >
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            controlId="formGroupNomeUsuario"
                            label='Nome do usuario'
                            type='text'
                            name='nomeUsuario'
                            errors={errors.nomeUsuario}
                            placeholder='Insira o nome do responsavel pela sala'
                            validations={register('nomeUsuario', {
                                required: {
                                    value: true,
                                    message: 'Nome do usuario é obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            controlId="formGroupEmailUsuario"
                            label='email'
                            type='email'
                            name='emailUsuario'
                            errors={errors.emailUsuario}
                            placeholder='Insira o dia da reserva'
                            validations={register('emailUsuario', {
                                required: {
                                    value: true,
                                    message: 'Email usuario é obrigatório.'
                                }
                            })}
                        />
                    
                    <Input
                            className="mb-3"
                            controlId="formGroupSenha"
                            label='senhaUsuario'
                            type='password'
                            name='senhaUsuario'
                            errors={errors.senhaUsuario}
                            placeholder='Insira o codigo da sala'
                            validations={register('senhaUsuario', {
                                required: {
                                    value: true,
                                    message: 'senha é obrigatório.'
                                }
                            })}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit" disabled={!isValid}>Editar</Button>
                        <Button variant="secondary" onClick={() => setIsUpdated(false)}>Fechar</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Col>
                    <Button variant="outline-secondary" onClick={() => {
                        sessionStorage.setItem('token', null)
                        sessionStorage.setItem('idUsuario', null)
                        navigate('/');
                    }}>LogOut</Button>
            </Col>
                
        </Container>
    );
}