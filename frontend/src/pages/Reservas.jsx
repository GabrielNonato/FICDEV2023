import { Container, Col, Modal, Form, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

import { Reserva } from "../components/Reserva";
import { Header } from "../components/Header";
import { Input } from '../components/Input';

import { createReserva, deleteReserva, getReservas, updateReserva, getFiltroReservas } from "../services/reserva-services"

export function Reservas() {
    const [reservas, setReservas] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'all' });
    const navigate = useNavigate();

    useEffect(() => {
        findReservas();
        // eslint-disable-next-line
    }, []);

    async function findReservas() {
        try {
            const result = await getReservas();
            setReservas(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    async function findDiaReservas(data) {
        try {
            const result = await getFiltroReservas(data);
            setReservas(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function removeReserva(id) {
        try {
            await deleteReserva(id);
            await findReservas();
        } catch (error) {
            console.error(error);
        }
    }

    async function addReserva(data) {
        try {
            await createReserva(data);
            setIsCreated(false);
            await findReservas();
        } catch (error) {
            console.error(error);
        }
    }

    async function editReserva(data) {
        try {
            await updateReserva({
                id: data.id,
                nomeResponsavel: data.nomeResponsavel,
                diaReserva: data.diaReserva,
                horarioInicio: data.horarioInicio,
                horarioFim: data.horarioFim,
                idSala: data.idSala
            });
            await findReservas();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container fluid>
            <Header title="Reservas" />
            <Row className="w-50 m-auto mb-5 mt-5 ">
                <Col md='10'>
                    <Button onClick={() => setIsCreated(true)}>Reservar Sala</Button>
                </Col>
                <Col>
                    <Button variant="outline-secondary" onClick={() => {
                        navigate('/home');
                    }}>Voltar</Button>
                </Col>
            </Row>
            <Row className="w-50 m-auto mb-5 mt-5 ">
                <Form
                    noValidate
                    validated={!errors}
                    onSubmit={handleSubmit(findDiaReservas)}
                    autoComplete='off'
                >
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            controlId="formGroupFiltroReserva"
                            label='Digite o dia da reserva'
                            type='date'
                            name='filtroReserva'
                            errors={errors.filtroReserva}
                            placeholder='Insira o filtro da reserva'
                            validations={register('filtroReserva', {
                                required: {
                                    value: false,
                                },
                                valueAsDate: true
                            })}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit" >Filtrar</Button>

                    </Modal.Footer>
                </Form>
            </Row>
            <Col className="w-50 m-auto">
                {reservas && reservas.length > 0
                    ? reservas.map((reserva, index) => (
                        <Reserva
                            key={index}
                            reserva={reserva}
                            removeReserva={async () => await removeReserva(reserva.id)}
                            editReserva={editReserva}
                        />
                    ))
                    : <p className="text-center">Nenhuma sala reservada!</p>}
            </Col>
            <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                <Modal.Header>
                    <Modal.Title>Reservar Sala</Modal.Title>
                </Modal.Header>
                <Form
                    noValidate
                    validated={!errors}
                    onSubmit={handleSubmit(addReserva)}
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
                        <Button variant="primary" type="submit" disabled={!isValid}>Reservar</Button>
                        <Button variant="secondary" onClick={() => setIsCreated(false)}>Fechar</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
}