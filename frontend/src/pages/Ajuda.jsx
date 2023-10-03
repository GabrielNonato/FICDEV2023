import { NavbarComponent } from '../components/Navbar'
import { Card, Accordion } from 'react-bootstrap'
import { Header } from '../components/Header'
export function Ajuda() {

    return (

        <>
            <div className="d-flex">
                <div className="col">
                    <NavbarComponent />
                </div>
            </div>
            <Header title='Dúvidas frequentes:'></Header>
            <Accordion>
                <Card className="w-50 m-auto">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><strong>Como faço para cadastrar uma sala?</strong></Accordion.Header>
                        <Accordion.Body>
                            1. Clique na barra de navegação na aba 'Salas'<br></br>
                            2. Clique no botão 'Adicionar nova sala'<br></br>
                            3. Preencha o formulário com os campos necessários
                        </Accordion.Body>
                    </Accordion.Item>
                </Card>
                <br></br>
                <Card className="w-50 m-auto">
                    <Accordion.Item eventKey="1">
                        <Accordion.Header><strong>Como faço para reservar?</strong></Accordion.Header>
                        <Accordion.Body>
                            1. Clique na barra de navegação na aba 'Reservas'<br></br>
                            2. Clique no botão 'Reservar sala'<br></br>
                            3. Preencha o formulário com os campos necessários
                        </Accordion.Body>
                    </Accordion.Item>
                </Card>
                <br></br>
                <Card className="w-50 m-auto">
                    <Accordion.Item eventKey="2">
                        <Accordion.Header><strong>Gostaria de alterar uma informação pessoal. É possível?</strong></Accordion.Header>
                        <Accordion.Body>
                            Sim, basta procurar na navegação o ícone de perfil e clicar nele.<br></br>
                            Você será redirecionado para uma página de perfil<br></br>
                            Ao clicar no botão editar é possível alterar dados pessoais
                        </Accordion.Body>
                    </Accordion.Item>
                </Card>
                <br></br>
                <Card className="w-50 m-auto">
                    <Accordion.Item eventKey="3">
                        <Accordion.Header><strong>Gostaria de deletar a minha conta. É possível?</strong></Accordion.Header>
                        <Accordion.Body>
                            Sim, basta procurar na navegação o ícone de perfil e clicar nele.<br></br>
                            Você será redirecionado para uma página de perfil e clicar no botão deletar<br></br>
                            Será requisitado uma confirmação e após isso sua conta será deletada de nosso sistema
                        </Accordion.Body>
                    </Accordion.Item>
                </Card>
            </Accordion>

        </>
    );

}
