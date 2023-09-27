import {NavbarComponent} from '../components/Navbar'
import {Row, Card} from 'react-bootstrap'

export function Ajuda() {

    return (
        <>
        <div className="d-flex">
            <div className="col">
                <NavbarComponent/>
            </div>
        </div>
        <Card className="mb-3 p-3 bg-light ">
                <Card.Title className='d-flex justify-content-center'><strong>Como faço para cadastrar uma sala?</strong></Card.Title>
                <Row xs="auto" className="d-flex justify-content-center">
                    1. Clique na barra de navegação na aba 'Salas'<br></br>
                    2. Clique no botão 'Adicionar nova sala'<br></br>
                    3. Preencha o formulário com os campos necessários
                </Row>
        </Card>
        <Card className="mb-3 p-3 bg-light ">
                <Card.Title className='d-flex justify-content-center'><strong>Como faço para reservar?</strong></Card.Title>
                <Row xs="auto" className="d-flex justify-content-center">
                    1. Clique na barra de navegação na aba 'Reservas'<br></br>
                    2. Clique no botão 'Reservar sala'<br></br>
                    3. Preencha o formulário com os campos necessários
                </Row>
        </Card>
        <Card className="mb-3 p-3 bg-light ">
                <Card.Title className='d-flex justify-content-center'><strong>Gostaria de alterar uma informação pessoal. É possível?</strong></Card.Title>
                <Row xs="auto" className="d-flex justify-content-center">
                    Sim, basta procurar na navegação o ícone de perfil e clicar nele.<br></br> 
                    Você será redirecionado para uma página de perfil<br></br> 
                    Ao clicar no botão editar é possível alterar dados pessoais
                </Row>
        </Card>
        <Card className="mb-3 p-3 bg-light ">
                <Card.Title className='d-flex justify-content-center'><strong>Gostaria de deletar a minha conta. É possível?</strong></Card.Title>
                <Row xs="auto" className="d-flex justify-content-center">
                    Sim, basta procurar na navegação o ícone de perfil e clicar nele.<br></br> 
                    Você será redirecionado para uma página de perfil e clicar no botão deletar<br></br> 
                    Será requisitado uma confirmação e após isso sua conta será deletada de nosso sistema
                </Row>
        </Card>
        </>
    );

}
