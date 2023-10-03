import { Modal, Button } from 'react-bootstrap';
import '../style.css'
export function ModalFracasso(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='text-danger'>
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-danger bi bi-x-circle tamanhoFonteModal'>
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