import { Modal, Button } from 'react-bootstrap';
import '../style.css'

export function ModalN2(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-success bi bi-check-circle tamanhoFonteModal'>
                &nbsp;{props.message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}