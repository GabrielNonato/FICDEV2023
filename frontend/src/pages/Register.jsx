import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../components/Input";
import { Header } from '../components/Header';
import { Modal } from '../components/Modal';

import { signupUsuario } from "../services/usuario-services";

export function Register() {
    const { handleSubmit, register, formState: { errors, isValid } } = useForm({ mode: 'all' });
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const usuario = await signupUsuario(data);
            setResult(usuario);
            navigate('/sala');
        } catch (error) {
            setResult({
                title: 'Houve um erro no cadastro!',
                message: error.response.data.error
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
            <Header title="Crie sua conta" />
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
                            // pattern: {
                            //     value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            //     message: 'E-mail inválido!'
                            // }
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
                    <Input
                        className="mb-4"
                        controlId="formGroupNome"
                        label="Nome"
                        type="text"
                        name="nome"
                        errors={errors.nome}
                        placeholder="Insira seu nome"
                        validations={register('nome', {
                            required: {
                                value: true,
                                message: 'Nome é obrigatório'
                            }
                        })}
                    />
                    <div className="d-flex justify-content-between">
                        <Button type="submit" disabled={!isValid}>Criar</Button>
                        <Link to="/">Já tenho uma conta</Link>
                    </div>
                </Col>
            </Form>
        </Container>
    );
}