import { Button, Form } from "react-bootstrap"
export default function SignIn() {
    return (
        <div className="col-md-9">
            <h3>Login Form</h3>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label></Form.Label>
                    <Button className="btn btn-primary">Login</Button>
                </Form.Group>
            </Form>
        </div>
    )
}