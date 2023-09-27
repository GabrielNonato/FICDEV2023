import { useState } from "react";
import { Button, Col,  Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../components/Input";

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
            navigate('/home');
        } catch (error) {
            setResult({
                title: 'Houve um erro no cadastro!',
                message: error.response.data.error
            });
        }
    }
    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <Modal
                show={result}
                title={result?.title}
                message={result?.message}
                handleClose={() => setResult(null)}
            />
        
           <div className="row border border-dark rounded-5 p-3 bg-white shadow box-area">
        
            <div className="col-md-6 rounded-4 d-flex justify-content-center  flex-column left-box bg-dark">
                <div className="featured-image mb-3">
                    
                </div>
                <p className="text-light">Cadastre-se já:</p>
                <small className="text-light">Somos um sistema de gestão de salas. Com inúmeras funcionalidades para reserva e criação de salas além de um dashboard completo.<br></br>
                Preencha os campos ao lado e venha usufruir do melhor do mercado.
                </small>
            </div> 
       
           <div className="col-md-6 right-box">
              <div className="row align-items-center">
                    <div className="header-text mb-4">
                         <h2 className="text-center">Bem vindo!</h2>
                         <p className="text-center">Por favor, preencha os campos a seguir para concluirmos seu cadastro.</p>
                    </div>

                    <Form
                noValidate
                validated={!errors}
                onSubmit={handleSubmit(onSubmit)}
                autoComplete='off'
                className="form-control form-control-lg bg-light fs-6"
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
                            },
                            minLength:{
                                value:6,
                                message: 'Minimo 6 caracteres'
                            },
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
                        <Button className="btn btn-dark btn-lg w-100 fs-6" type="submit" disabled={!isValid}>Criar</Button>
                    </div>
                </Col>
            </Form>
            <Link className="text-center text-decoration-none text-dark" to="/"><strong>Já tenho uma conta</strong></Link>

                    
              </div>
           </div> 
          </div>
        </div>
    
  );
    
}

/*
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
                            },
                            minLength:{
                                value:6,
                                message: 'Minimo 6 caracteres'
                            },
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
*/