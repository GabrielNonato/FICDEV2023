import { Container, Modal, Card, Button, Row, Form, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavbarComponent } from '../components/Navbar'
import { Input } from "../components/Input"

import '../style.css'

import { deleteUsuario, getUsuario, updateUsuario } from "../services/usuario-services"

export function Perfil(props) {
  const [usuario, setUsuario] = useState([]);
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

  const navigate = useNavigate();

  const id = sessionStorage.getItem('idUsuario')

  useEffect(() => {
    findUsuario(id);
    // eslint-disable-next-line
  }, []);

  async function findUsuario() {
    try {
      const result = await getUsuario(id);
      setUsuario(result.data);
      console.log(result.data)
    } catch (error) {
      console.error(error);

    }
  }

  async function removeUsuario() {
    try {
      await deleteUsuario(id);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  async function editUsuario(data) {
    try {
      await updateUsuario({
        id: id,
        nomeUsuario: data.nomeUsuario,
        emailUsuario: data.emailUsuario,
        senhaUsuario: data.senhaUsuario
      });
      await findUsuario();
      setIsUpdated(false)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <NavbarComponent />
      <Container fluid>
          <br></br>
          <Row className="justify-content-center align-items-center h-100">
            <Col lg="6" className="mb-4 mb-lg-0 ">
              <Card className="mb-3 ">
                <Row className="g-0 ">
                  <Col md="4" className="text-center text-light bg-dark rounded-left border border-dark ">
                    <Row className="bi bi-person display-1 objetivoCentralizar"></Row>
                  </Col>
                  <Col md="8">
                    <Card.Body className="p-4">

                      <hr className="mt-0 mb-4" />
                      <Row className="pt-1">
                        <Col size="6" className="mb-3">
                          <Card.Text className="text-muted"><strong>Nome</strong></Card.Text>
                        </Col>
                        <Col size="6" className="mb-3">
                          <Card.Text className="text-muted"><strong>Email</strong></Card.Text>
                        </Col>
                      </Row>


                      <hr className="mt-0 mb-4" />
                      <Row className="pt-1">
                        <Col size="6" className="mb-3">
                          <Card.Text className="text-muted">{usuario.nome}</Card.Text>
                        </Col>
                        <Col size="6" className="mb-3">
                          <Card.Text className="text-muted">{usuario.email}</Card.Text>
                        </Col>
                      </Row>
                      <Row>
                        <Button variant="primary" className="bi bi-pencil-square btn-dark" onClick={() => setIsUpdated(true)}><strong>&nbsp;Editar</strong></Button>
                        
                      </Row>
                      <br></br>
                      <Row>
                      <Button variant="outline-danger" className="" onClick={() => setIsDeleted(true)}>Deletar conta</Button>
                      </Row>

                    </Card.Body>

                  </Col>
                </Row>
              </Card>
              <Row xs="auto" className="d-flex justify-content-center">
                
              </Row>
            </Col>

          </Row>

        

        <Modal show={isDeleted} onHide={() => setIsDeleted(false)}>
          <Modal.Header>
            <Modal.Title>Deseja deletar?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="danger" type="submit" onClick={removeUsuario} disabled={!isValid2}>Apagar</Button>
            <Button variant="secondary" onClick={() => setIsDeleted(false)}>Fechar</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
          <Modal.Header>
            <Modal.Title>Editar usuario: {usuario.nome}</Modal.Title>
          </Modal.Header>
          <Form
            noValidate
            validated={!errors}
            onSubmit={handleSubmit(editUsuario)}
            autoComplete='off'
          >
            <Modal.Body>
              <Input
                className="mb-3"
                controlId="formGroupNomeUsuario"
                label='Nome do usuario'
                type='text'
                name='nomeUsuario'
                errors={errors.nomeUsuario}
                defaultValue={usuario.nome}
                placeholder='Insira o nome do responsavel pela sala'
                validations={register('nomeUsuario', {
                  required: {
                    value: true,
                    message: 'Nome do usuario é obrigatório.'
                  }
                })}
              />
              <Input
                className="mb-3"
                controlId="formGroupEmailUsuario"
                label='email'
                type='email'
                name='emailUsuario'
                errors={errors.emailUsuario}
                defaultValue={usuario.email}
                placeholder='Insira o dia da reserva'
                validations={register('emailUsuario', {
                  required: {
                    value: true,
                    message: 'Email usuario é obrigatório.'
                  },
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: 'E-mail inválido!'
                  }
                })}
              />

              <Input
                className="mb-3"
                controlId="formGroupSenha"
                label='Senha'
                type='password'
                name='senhaUsuario'
                errors={errors.senhaUsuario}
                placeholder='Insira o codigo da sala'
                validations={register('senhaUsuario', {
                  required: {
                    value: true,
                    message: 'Senha é obrigatório.'
                  },
                  minLength: {
                    value: 6,
                    message: 'Senha deve ter no minimo 6 digitos'
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


      </Container>
    </>
  );
}

/*


export default function PersonalProfile() {
  return (
      <Container className="py-5 h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="6" className="mb-4 mb-lg-0">
            <Card className="mb-3">
              <Row className="g-0">
                <Col md="4" className="text-center text-white">
                  <CardImage>
                  <Card.Text>Web Designer</Card.Text>
                  <Icon far icon="edit mb-5" />
                </Col>
                <Col md="8">
                  <CardBody className="p-4">
                    
                    <hr className="mt-0 mb-4" />
                    <Row className="pt-1">
                      <Col size="6" className="mb-3">
                     
                        <Card.Text className="text-muted">info@example.com</Card.Text>
                      </Col>
                      <Col size="6" className="mb-3">
                       
                        <Card.Text className="text-muted">123 456 789</Card.Text>
                      </Col>
                    </Row>

                  
                    <hr className="mt-0 mb-4" />
                    <Row className="pt-1">
                      <Col size="6" className="mb-3">
                       
                        <Card.Text className="text-muted">info@example.com</Card.Text>
                      </Col>
                      <Col size="6" className="mb-3">
                       
                        <Card.Text className="text-muted">123 456 789</Card.Text>
                      </Col>
                    </Row>

                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
  );
}



*/