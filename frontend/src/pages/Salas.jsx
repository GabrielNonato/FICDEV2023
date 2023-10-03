import { Col, Modal, Form, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import {NavbarComponent} from '../components/Navbar'
import { Sala } from "../components/Sala";

import { Input } from '../components/Input';
import { ModalN2 } from '../components/ModalN2'
import { ModalFracasso } from '../components/ModalFracasso'
import { Header } from "../components/Header";

import { createSala, deleteSala, getSalas, updateSala, getFiltroSalas } from "../services/sala-services"

export function Salas() {
    const [salas, setSalas] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'all' });
    const [capacidade, setCapacidade] = useState("")
    const [erroResultado, setErroResultado] = useState(null)
    const [chaveEstrangeiraErro, setChaveEstrangeiraErro] = useState()
    const [sucessoRota, setSucessoRota] = useState(null)

    const navigate = useNavigate();

    
    useEffect(() => {
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

    async function filtrar() {
        try {
            if (!capacidade) {
                return; 
            }

            const result = await getFiltroSalas({ capacidade: capacidade });
            setSalas(result.data);
            setSucessoRota({
                message: 'Filtro realizado'
            })
        } catch (error) {
            console.error(error);
        }
    }

    async function removeSala(data) {
        try {
            await deleteSala(data.id);
            await findSalas();
            setSucessoRota({
                message: 'Deleção realizada'
            })
        } catch (error) {
            setChaveEstrangeiraErro({
                title:'Erro de solicitação',
                message:error.response.data.error
            })
         
        }
    }

    async function addSala(data) {
        try {
            await createSala(data);
            setIsCreated(false);
            await findSalas();
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

    async function editSala(data) {
        try {
            await updateSala({
                id: data.id,
                nomeSala: data.nomeSala,
                capacidadeSala: data.capacidadeSala,
                departamentoSala: data.departamentoSala
            });
            await findSalas();
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
                <ModalFracasso
                    show={chaveEstrangeiraErro}
                    title={chaveEstrangeiraErro?.title}
                    message={chaveEstrangeiraErro?.message}
                    handleClose={() => setChaveEstrangeiraErro(null)}
                />
                <ModalFracasso
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
                    <Header title="Salas"/>
                    <Row className="w-50 m-auto mb-5 mt-5 ">
                        <div className="d-grid gap-2">
                            <Button className='btn btn-success btn-lg btn' 
                                onClick={() => setIsCreated(true)}
                                    ><strong className="aumentarTamanhoNav">Adicionar nova sala</strong>
                            </Button>
                        </div>
                    </Row>
                    <Row className="w-50 m-auto mb-2">
                        <Col md='8'>
                            
                            <Form.Group className="w-50 m-auto mb-2">
                                <Form.Control
                                    type="number"
                                    placeholder="Filtrar por capacidade mínima"
                                    value={capacidade}
                                    onChange={(e) => setCapacidade(e.target.value)}
                                />
                            </Form.Group>
                            
                        </Col>
                        <Col md='2'>
                            <Button className="btn btn-success" onClick={filtrar}>Filtrar</Button>
                        </Col>
                        <Col>
                            <Button className='btn btn-danger' onClick={() => {
                                findSalas()
                                setCapacidade(0)
                                }}>
                              Limpar Filtro
                            </Button>
                        </Col>
                    </Row>
                    <Col className="w-50 m-auto">
                        {salas && salas.length > 0
                            ? salas.map((sala) => (
                                <Sala
                                    key={sala.id}
                                    sala={sala}
                                    removeSala={removeSala}
                                    editSala={editSala}
                                />
                            ))
                            : <p className="text-center">Não existe nenhuma sala cadastrada!</p>}
                    </Col>
                    <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                        <Modal.Header>
                            <Modal.Title>Adicionar nova sala</Modal.Title>
                        </Modal.Header>
                        <Form
                            noValidate
                            validated={!errors}
                            onSubmit={handleSubmit(addSala)}
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
                                    validations={register('capacidadeSala', {
                                        required: {
                                            value: true,
                                            message: 'Capacidade da sala é obrigatório.'
                                        },
                                        min: {
                                            value:1,
                                            message: 'Capacidade inválida'
                                        }
                                    })}
                                /><Input
                                className="mb-3"
                                controlId="formGroupNomeSala"
                                label='Departamento da sala'
                                type='text'
                                name='departamentoSala'
                                errors={errors.departamentoSala}
                                placeholder='Insira o departamento da sala'
                                validations={register('departamentoSala', {
                                    required: {
                                        value: true,
                                        message: 'Departamento da sala é obrigatório.'
                                    }
                                })}
                            />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" type="submit" disabled={!isValid}>Criar</Button>
                                <Button variant="secondary" onClick={() => setIsCreated(false)}>Fechar</Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                </div>
        </div>
    );
}