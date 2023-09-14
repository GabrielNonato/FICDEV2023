import { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export function Reserva(props) {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'all' });
    const [isUpdated, setIsUpdated] = useState(false);

    async function editReserva(data) {
        await props.editReserva({ ...data, id: props.reserva.id });
        setIsUpdated(false);
    }

    return (
        <>
            
            <Card className="mb-3 p-3 bg-light">
                <Card.Title><strong>Dia: </strong>{props.sala.nome}</Card.Title>
                <Card.Text><strong>Nome do Responsável: </strong>{props.sala.capacidade}</Card.Text>
                <Card.Text><strong>Horario inicio: </strong>{props.sala.capacidade}</Card.Text>
                <Card.Text><strong>Horario fim: </strong>{props.sala.capacidade}</Card.Text>

                <Row xs="auto" className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>
                    <Button
                        variant="outline-danger"
                        className="ms-3"
                        onClick={props.removeReserva}
                    >
                        Apagar
                    </Button>
                </Row>
            </Card>
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar reserva: {props.reserva.nome}</Modal.Title>
                </Modal.Header>
                <Form
                    noValidate
                    validated={!errors}
                    onSubmit={handleSubmit(editReserva)}
                    autoComplete='off'
                >
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            controlId="formGroupNomeResponsavel"
                            label='Nome do responsavel'
                            type='text'
                            name='nomeResponsavel'
                            errors={errors.nomeResponsavel}
                            placeholder='Insira o nome do responsavel'
                            defaultValue={props.reserva.nomeResponsavel}
                            validations={register('nomeResponsavel', {
                                required: {
                                    value: true,
                                    message: 'Nome do responsavel é obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            controlId="formGroupDia"
                            label='Dia da reserva'
                            type='date'
                            name='diaReserva'
                            errors={errors.diaReserva}
                            defaultValue={props.reserva.diaReserva}
                            validations={register('diaReserva', {
                                required: {
                                    value: true,
                                    message: 'Dia da reserva é obrigatório.'
                                }
                            })}
                        />
                        {/* <Input
                            className="mb-3"
                            controlId="formGroupNomeResponsavel"
                            label='Nome do responsavel'
                            type='text'
                            name='nomeResponsavel'
                            errors={errors.nomeResponsavel}
                            placeholder='Insira o nome do responsavel'
                            defaultValue={props.reserva.nomeResponsavel}
                            validations={register('nomeResponsavel', {
                                required: {
                                    value: true,
                                    message: 'Nome do responsavel é obrigatório.'
                                }
                            })}
                        /> */}
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