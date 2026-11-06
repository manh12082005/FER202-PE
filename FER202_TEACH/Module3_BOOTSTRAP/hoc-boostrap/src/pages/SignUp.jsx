import { Button, Form } from "react-bootstrap";

export default function SignUp() {
    // handleSubmit: hàm xử lý khi bấm nút Register
    // e.preventDefault() ngăn trang reload khi submit
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Đăng ký thành công!");
    };

    return (
        <div className="col-md-9">
            <h3>Registration Form</h3>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter password"
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Gender</Form.Label>

                    <div>
                        <Form.Check
                            inline
                            type="radio"
                            label="Male"
                            name="gender"
                            value="male"
                        />

                        <Form.Check
                            inline
                            type="radio"
                            label="Female"
                            name="gender"
                            value="female"
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Dob</Form.Label>
                    <Form.Control
                        type="date"
                        name="dob"
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>City</Form.Label>

                    <Form.Select name="city">
                        <option value="">-- Select City --</option>
                        <option value="ha-noi">Ha Noi</option>
                        <option value="ho-chi-minh">Ho Chi Minh</option>
                        <option value="da-nang">Da Nang</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Address</Form.Label>

                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="address"
                        placeholder="Enter address"
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Favorites</Form.Label>

                    <div>
                        <Form.Check
                            inline
                            type="checkbox"
                            label="Music"
                            name="favorites"
                            value="music"
                        />

                        <Form.Check
                            inline
                            type="checkbox"
                            label="Sport"
                            name="favorites"
                            value="sport"
                        />

                        <Form.Check
                            inline
                            type="checkbox"
                            label="Travel"
                            name="favorites"
                            value="travel"
                        />

                        <Form.Check
                            inline
                            type="checkbox"
                            label="Game"
                            name="favorites"
                            value="game"
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Button type="submit" variant="primary">
                        Register
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
}