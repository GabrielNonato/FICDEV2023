import { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export function PerfilUsuario(props) {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'all' });
    const [isUpdated, setIsUpdated] = useState(false);

    async function editUsuario(data) {
        await props.editUsuario({ ...data, id: props.usuario.id });
        setIsUpdated(false);
    }

    return (
        <>
            
            <Card className="mb-3 p-3 bg-light">
                <Card.Title><strong></strong>{props.usuario.nome}</Card.Title>
                <Card.Text><strong></strong>{props.usuario.email}</Card.Text>
                <Card.Text><strong></strong>{props.usuario.senha}</Card.Text>

                <Row xs="auto" className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>
                    <Button
                        variant="outline-danger"
                        className="ms-3"
                        onClick={props.removeUsuario}
                    >
                        Apagar
                    </Button>
                </Row>
            </Card>
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar usuario: {props.usuario.nome}</Modal.Title>
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
        </>
    );
}