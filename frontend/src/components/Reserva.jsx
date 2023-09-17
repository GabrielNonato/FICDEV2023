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
                <Card.Title><strong>Dia: </strong>{props.reserva.dia}</Card.Title>
                <Card.Text><strong>Nome do Responsável: </strong>{props.reserva.nomeResponsavel}</Card.Text>
                <Card.Text><strong>Horario inicio: </strong>{props.reserva.horarioInicio}</Card.Text>
                <Card.Text><strong>Horario fim: </strong>{props.reserva.horarioFim}</Card.Text>

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
                    <Modal.Title>Editar reserva: {props.reserva.dia}</Modal.Title>
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
                            label='Nome do responsavel pela sala'
                            type='text'
                            name='nomeResponsavel'
                            errors={errors.nomeResponsavel}
                            placeholder='Insira o nome do responsavel pela sala'
                            validations={register('nomeResponsavel', {
                                required: {
                                    value: true,
                                    message: 'Nome do responsável é obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            controlId="formGroupDiaReserva"
                            label='Dia da reserva'
                            type='date'
                            name='diaReserva'
                            errors={errors.diaReserva}
                            placeholder='Insira o dia da reserva'
                            validations={register('diaReserva', {
                                required: {
                                    value: true,
                                    message: 'Dia da reserva é obrigatório.'
                                }
                            })}
                        />
                    <Form.Group controlId="formHorarioInicio">
                        <Form.Label>Horario de inicio</Form.Label>
                        <Form.Select
                            name="horarioInicio"
                            {...register('horarioInicio')}
                        >
                            <option disabled>Clique para selecionar</option>
                            <option value='07:00'>07:00</option>
                            <option value='09:00'>09:00</option>
                            <option value='11:00'>11:00</option>
                            <option value='13:00'>13:00</option>
                            <option value='15:00'>15:00</option>
                            <option value='17:00'>17:00</option>
                            <option value='19:00'>19:00</option>
                            <option value='21:00'>21:00</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="formHorarioFim">
                        <Form.Label>Horario final</Form.Label>
                        <Form.Select
                            name="horarioFim"
                            {...register('horarioFim')}
                        >
                            <option disabled>Clique para selecionar</option>
                            <option value='09:00'>09:00</option>
                            <option value='11:00'>11:00</option>
                            <option value='13:00'>13:00</option>
                            <option value='15:00'>15:00</option>
                            <option value='17:00'>17:00</option>
                            <option value='19:00'>19:00</option>
                            <option value='21:00'>21:00</option>
                            <option value='23:00'>07:00</option>
                        </Form.Select>
                    </Form.Group>
                    <Input
                            className="mb-3"
                            controlId="formGroupIdSala"
                            label='idSala'
                            type='number'
                            name='idSala'
                            errors={errors.idSala}
                            placeholder='Insira o codigo da sala'
                            validations={register('idSala', {
                                required: {
                                    value: true,
                                    message: 'Codigo da reserva é obrigatório.'
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