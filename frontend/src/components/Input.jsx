import { FloatingLabel, Form } from "react-bootstrap";

export function Input(props) {
    return (
        <Form.Group
            className={props.className}
            controlId={props.controlId}
        >
            <FloatingLabel label={props.label}>
                <Form.Control
                    type={props.type}
                    name={props.name}
                    isInvalid={props.errors}
                    placeholder={props.placeholder}
                    defaultValue={props.defaultValue}
                    {...props.validations}
                />
                <Form.Control.Feedback type="invalid">
                    {props.errors?.message}
                </Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>
    );
}