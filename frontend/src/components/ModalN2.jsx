import { Modal, Button } from 'react-bootstrap';

export function ModalN2(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className='align-content-center bi bi-check-circle text-success'>&nbsp;{props.message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}