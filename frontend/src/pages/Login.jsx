import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import '../style.css'

import { Input } from "../components/Input";
import { Modal } from '../components/Modal';

import { loginUsuario } from '../services/usuario-services';

export function Login() {
    const { handleSubmit, register, formState: { errors, isValid } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const usuario = await loginUsuario(data);
            setResult(usuario);
            navigate('/home');
        } catch (error) {
            setResult({
                title: 'Houve um erro no login!',
                message: error.response.data.error,
            });
        }
    }

    return (
        <>
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Modal
                show={result}
                title={result?.title}
                message={result?.message}
                handleClose={() => setResult(null)}
            />
            <Row className="border border-dark rounded-5 p-3 bg-white shadow box-area">
                <Col className="col-md-6 rounded-4 d-flex justify-content-center flex-column left-box bg-dark">
                    <div className="featured-image mb-3">
                        <h2 className="text-light bi bi-calendar"><strong>&nbsp;&nbsp;SSR</strong></h2>
                    </div>
                    <p className="text-light">Sobre nós:</p>
                    <small className="text-light">Somos um sistema de gestão de salas. Você encontrará diversas funcionalidades para reserva e criação de salas além de um dashboard completo.<br></br>
                    Esperamos ver você novamente.
                    </small>
                </Col>
               
                <Col className="col-md-6 right-box">
                    <Row className="row align-items-center">
                    <div className="header-text mb-4">
                            <h2 className="text-center"><strong>Bem vindo!</strong></h2>
                            <p className="text-center">Por favor, conecte-se na sua conta.</p>
                        </div>

                        <Form
                                noValidate
                                validated={!errors}
                                onSubmit={handleSubmit(onSubmit)}
                                autoComplete='off'
                                className="form-control form-control-lg bg-light fs-6"
                            >
                            
                                <Input
                                    className="mb-4"
                                    controlId="formGroupEmail"
                                    label="E-mail"
                                    type="email"
                                    name="email"
                                    errors={errors.email}
                                    placeholder="Insira seu e-mail"
                                    validations={register('email', {
                                        required: {
                                            value: false,
                                        },

                                    })}
                                />
                                <Input
                                    className="mb-4"
                                    controlId="formGroupSenha"
                                    label="Senha"
                                    type="password"
                                    name="senha"
                                    errors={errors.senha}
                                    placeholder="Insira sua senha"
                                    validations={register('senha', {
                                        required: {
                                            value: false,
                                        }
                                    })}
                                />
                                <Button type="submit" className="btn btn-dark btn-lg w-100 fs-6" disabled={!isValid}>Entrar</Button>
                        </Form>
                    </Row>
                    <Row>
                        <small className="text-center">Não possue conta? <Link to="/register" className="text-decoration-none text-dark"><strong>Cadastre-se</strong></Link></small>
                    </Row>
                </Col>
 
            </Row>
        </Container>
        
            
  
     </>
  );
}
