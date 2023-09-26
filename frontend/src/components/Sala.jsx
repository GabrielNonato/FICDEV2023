import { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export function Sala(props) {

    
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid
        }
    } = useForm({
        mode: 'all'
    });
    const {

        formState: {
            isValid: isValid2
        }
    } = useForm({
        mode: 'all'
    });

    const [isUpdated, setIsUpdated] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    async function editSala(data) {
        await props.editSala({ ...data, id: props.sala.id });
        setIsUpdated(false);
    }

    async function removeSala(data) {
        await props.removeSala({ ...data, id: props.sala.id });
        setIsDeleted(false);
    }

    return (
        <>
            
            <Card className="mb-3 p-3 bg-light">
                <Card.Title><strong>Nome: </strong>{props.sala.nome}</Card.Title>
                <Card.Text><strong>Capacidade: </strong>{props.sala.capacidade}</Card.Text>
                
                <Row xs="auto" className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>
                    <Button
                        variant="outline-danger"
                        className="ms-3"
                        onClick={()=>setIsDeleted(true)}
                    >
                        Apagar
                    </Button>
                </Row>
            </Card>

            <Modal show={isDeleted} onHide={() => setIsDeleted(false)}>
                <Modal.Header>
                    <Modal.Title>Deseja Deletar?</Modal.Title>
                </Modal.Header>
                    <Modal.Footer>
                        <Button variant="danger" type="submit" onClick={removeSala} disabled={!isValid2}>Apagar</Button>
                        <Button variant="secondary" onClick={() => setIsDeleted(false)}>Fechar</Button>
                    </Modal.Footer>
            </Modal>

            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar sala: {props.sala.nome}</Modal.Title>
                </Modal.Header>
                <Form
                    noValidate
                    validated={!errors}
                    onSubmit={handleSubmit(editSala)}
                    autoComplete='off'
                >
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            controlId="formGroupNomeSala"
                            label='Nome da sala'
                            type='text'
                            name='nomeSala'
                            errors={errors.nomeSala}
                            placeholder='Insira o nome da sala'
                            defaultValue={props.sala.nome}
                            validations={register('nomeSala', {
                                required: {
                                    value: true,
                                    message: 'Nome da sala é obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            controlId="formGroupCapacidadeSala"
                            label='Capacidade da sala'
                            type='text'
                            name='capacidadeSala'
                            errors={errors.capacidadeSala}
                            placeholder='Insira a capacidade da sala'
                            defaultValue={props.sala.capacidade}
                            validations={register('capacidadeSala', {
                                required: {
                                    value: true,
                                    message: 'Capacidade da sala é obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            controlId="formGroupDepartamentoSala"
                            label='Departamento da sala'
                            type='text'
                            name='departamentoSala'
                            errors={errors.departamentoSala}
                            placeholder='Insira o departamento da sala'
                            defaultValue={props.sala.departamento}
                            validations={register('departamentoSala', {
                                required: {
                                    value: true,
                                    message: 'Departamento da sala é obrigatório.'
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