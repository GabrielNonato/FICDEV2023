import { useState } from "react";
import { Form, Button, Col, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../components/Input";
import { Header } from '../components/Header';
import { Modal } from '../components/Modal';

import { loginUsuario } from '../services/usuario-services';

export function Login() {
    const { handleSubmit, register, formState: { errors, isValid } } = useForm({ mode: 'all' });
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
        <Container>
            <Modal
                show={result}
                title={result?.title}
                message={result?.message}
                handleClose={() => setResult(null)}
            />
            <Header title="Entre na sua conta" />
            <Form
                noValidate
                validated={!errors}
                onSubmit={handleSubmit(onSubmit)}
                autoComplete='off'
                className="bg-light rounded p-5 shadow w-50 m-auto"
            >
                <Col>
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
                                value: true,
                                message: 'E-mail é obrigatório'
                            },
                            pattern: {
                                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: 'E-mail inválido!'
                            }
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
                                value: true,
                                message: 'Senha é obrigatória'
                            }
                        })}
                    />
                    <div className="d-flex justify-content-between">
                        <Button type="submit" disabled={!isValid}>Entrar</Button>
                        <Link to="/register">Criar conta</Link>
                    </div>
                </Col>
            </Form>
        </Container>
    );
}