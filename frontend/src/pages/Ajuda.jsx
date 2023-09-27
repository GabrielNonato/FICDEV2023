import {NavbarComponent} from '../components/Navbar'
import {Row, Col} from 'react-bootstrap'

export function Ajuda() {

    return (
        <>
        <div className="d-flex">
            <div className="col">
                <NavbarComponent/>
            </div>
        </div>
        <Col>
            <Row>
                <p>lorem ipsum</p>
            </Row>
        </Col>
        </>
    );

}