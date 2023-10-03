import {  Col, Modal, Form, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import {NavbarComponent} from '../components/Navbar'
import { Reserva } from "../components/Reserva";
import { Input } from '../components/Input';
import { Header } from "../components/Header";

import { ModalN2 } from "../components/ModalN2";

import { createReserva, deleteReserva, getReservas, updateReserva, getFiltroReservas } from "../services/reserva-services"
import { getSalas } from "../services/sala-services"

export function Reservas() {
    const [reservas, setReservas] = useState([]);
    const [salas, setSalas] = useState([])
    const [isCreated, setIsCreated] = useState(false);
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'all' });
    const navigate = useNavigate();
    const [dia, setDia] = useState("")
    const [erroResultado, setErroResultado] = useState(null)
    const [sucessoRota, setSucessoRota] = useState(null)

    useEffect(() => {
        findReservas();
        findSalas();
        // eslint-disable-next-line
    }, []);

    async function findSalas() {
        try {
            const result = await getSalas();
            setSalas(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    async function findReservas() {
        try {
            const result = await getReservas();
            setReservas(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    async function filtrar() {
        try {
            const result = await getFiltroReservas({dia: dia});
            setReservas(result.data);
            setSucessoRota({
                message: 'Filtro realizado'
            })
        } catch (error) {
            console.error(error);
        }
    }

    async function removeReserva(data) {
        try {
            await deleteReserva(data.id);
            await findReservas();
            setSucessoRota({
                message: 'Deleção realizada'
            })
        } catch (error) {
            console.error(error);
        }
    }

    async function addReserva(data) {
        try {
            await createReserva(data);
            setIsCreated(false);
            await findReservas();
            setSucessoRota({
                message: 'Cadastro realizado com sucesso'
            })
        } catch (error) {
            setErroResultado({
                title:'Bad Request',
                message: error.response.data.error
            });
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
            setSucessoRota({
                message: 'Atualizado com sucesso'
            })
        } catch (error) {
            setErroResultado({
                title:'Bad Request',
                message: error.response.data.error
            });
        }
    }

    return (
       
            <div className="d-flex">
                <ModalN2
                    show={erroResultado}
                    title={erroResultado?.title}
                    message={erroResultado?.message}
                    handleClose={() => setErroResultado(null)}
                />

                <ModalN2
                    show={sucessoRota}
                    title={sucessoRota?.title}
                    message={sucessoRota?.message}
                    handleClose={() => setSucessoRota(null)}
                />
                
                <div className="col">
                <NavbarComponent/>
                <Header title="Reservas"/>
                <Row className="w-50 m-auto mb-5 mt-5 ">
                        <div className="d-grid gap-2">
                            <Button className='btn btn-success btn-lg btn' 
                                onClick={() => setIsCreated(true)}
                                    ><strong className="aumentarTamanhoNav">Reservar sala</strong>
                            </Button>
                        </div>
                    </Row>
                <Row className="w-50 m-auto mb-2">
                    <Col md='8'>
                        <Form.Group className="w-50 m-auto mb-2">
                            <Form.Control
                                type="date"
                                placeholder="Filtrar por dia"
                                value={dia}
                                onChange={(e) => setDia(e.target.value)}
                            />
                        </Form.Group>
                        
                    </Col>
                    <Col md='2'>
                        <Button className='btn btn-success' onClick={filtrar}>Filtrar</Button>
                    </Col>
                    <Col>
                        <Button className='btn btn-danger' 
                                onClick={() => {
                                    findReservas()
                                    setDia('')
                                    }
                                }
                                    >Limpar Filtro
                        </Button>
                    </Col>
                </Row>
                <Col className="w-50 m-auto">
                    {reservas && reservas.length > 0
                        ? reservas.map((reserva) => (
                            <Reserva
                                key={reserva.id}
                                reserva={reserva}
                                removeReserva={removeReserva}
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
                                <option value='07:00:00'>07:00</option>
                                <option value='09:00:00'>09:00</option>
                                <option value='11:00:00'>11:00</option>
                                <option value='13:00:00'>13:00</option>
                                <option value='15:00:00'>15:00</option>
                                <option value='17:00:00'>17:00</option>
                                <option value='19:00:00'>19:00</option>
                                <option value='21:00:00'>21:00</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formHorarioFim">
                            <Form.Label>Horario final</Form.Label>
                            <Form.Select
                                name="horarioFim"
                                {...register('horarioFim')}
                            >
                                <option disabled>Clique para selecionar</option>
                                <option value='09:00:00'>09:00</option>
                                <option value='11:00:00'>11:00</option>
                                <option value='13:00:00'>13:00</option>
                                <option value='15:00:00'>15:00</option>
                                <option value='17:00:00'>17:00</option>
                                <option value='19:00:00'>19:00</option>
                                <option value='21:00:00'>21:00</option>
                                <option value='23:00:00'>23:00</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formIdSala">
                            <Form.Label>Sala</Form.Label>
                            <Form.Select
                                name="idSala"
                                {...register('idSala')}
                            >
                                <option disabled>Clique para selecionar</option>
                                {salas && salas.length > 0
                                    ? salas.map((sala, index) => (
                                        <option value={sala.id}>{sala.nome}</option>
                                    ))
                                    : <p className="text-center">Não existe nenhuma sala cadastrada!</p>}
                            </Form.Select>
                        </Form.Group>
                        
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type="submit" disabled={!isValid}>Reservar</Button>
                            <Button variant="secondary" onClick={() => setIsCreated(false)}>Fechar</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
                </div>
            </div>
    );
}
