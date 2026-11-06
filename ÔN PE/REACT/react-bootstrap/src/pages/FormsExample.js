import React, { useState } from 'react';
// Form: Thành phần chính bao bọc các trường nhập liệu
// Form.Group: Nhóm một lable, một input và có thể là dòng text hỗ trợ lại với nhau
// Form.Control: Input nhập liệu (text, email, password...)
// Form.Check: Checkbox hoặc Radio button
// Form.Select: Dropdown menu (không dùng trong ví dụ này nhưng cũng rất hay dùng)
// InputGroup: Kết hợp text hoặc nút bấm với input
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function FormsExample() {
  const [validated, setValidated] = useState(false);

  // Hàm xử lý submit form có validation
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <div>
      <h2 className="mb-4">Ví dụ về Forms (Biểu mẫu)</h2>

      <h4 className="mt-4">1. Form cơ bản</h4>
      <Form className="border p-4 rounded bg-light mb-5">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {/* Form.Label dùng để hiển thị nhãn cho ô input */}
          <Form.Label>Địa chỉ Email</Form.Label>
          {/* type="email" định dạng đây là trường nhập email */}
          <Form.Control type="email" placeholder="Nhập email..." />
          {/* Form.Text dùng để ghi chú thích bên dưới ô input */}
          <Form.Text className="text-muted">
            Chúng tôi sẽ không bao giờ chia sẻ email của bạn với ai khác.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" placeholder="Mật khẩu" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          {/* Form.Check dùng cho checkbox hoặc radio button */}
          <Form.Check type="checkbox" label="Nhớ mật khẩu" />
        </Form.Group>

        <Button variant="primary" type="button">
          Đăng nhập
        </Button>
      </Form>

      <h4 className="mt-4">2. Form Validation (Kiểm tra dữ liệu)</h4>
      {/* 
        noValidate tắt chức năng kiểm tra mặc định của trình duyệt để dùng của React Bootstrap. 
        validated={validated} thêm class was-validated vào form nếu state là true
      */}
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="border p-4 rounded mb-5">
        <Row className="mb-3">
          {/* Form.Group có thể hoạt động như Col nếu dùng as={Col} */}
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Tên (First name)</Form.Label>
            {/* Thuộc tính required bắt buộc người dùng phải nhập */}
            <Form.Control required type="text" placeholder="Nhập tên" defaultValue="Mark" />
            {/* Feedback hiện ra khi dữ liệu hợp lệ (nếu form đã được validate) */}
            <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Họ (Last name)</Form.Label>
            <Form.Control required type="text" placeholder="Nhập họ" defaultValue="Otto" />
            <Form.Control.Feedback>Tuyệt vời!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            {/* InputGroup ghép text '@' vào trước ô nhập liệu */}
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control type="text" placeholder="Username" aria-describedby="inputGroupPrepend" required />
              {/* type="invalid" làm feedback này chỉ hiện khi dữ liệu không hợp lệ (để trống) */}
              <Form.Control.Feedback type="invalid">
                Vui lòng chọn một username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Button type="submit">Gửi thông tin</Button>
      </Form>

      <h4 className="mt-4">3. Ví dụ Login Form điển hình</h4>
      <Form className="border p-4 rounded bg-light mb-5">
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" />
          <Form.Text className="text-muted">Email trường FPT</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check label="Remember me" />
        </Form.Group>

        <Button variant="primary">Login</Button>
      </Form>

      <h4 className="mt-4">4. Ví dụ Teacher tạo Course</h4>
      <Form className="border p-4 rounded bg-light mb-5">
        <Form.Group className="mb-3">
          <Form.Label>Tên khóa học</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mô tả</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Skill</Form.Label>
          <Form.Select>
            <option>Reading</option>
            <option>Listening</option>
            <option>Writing</option>
            <option>Speaking</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check type="switch" label="Publish" />
        </Form.Group>

        <Button variant="success">Save</Button>
      </Form>

      <h4 className="mt-4">5. Các component khác (Range, FloatingLabel)</h4>
      <Form className="border p-4 rounded bg-light mb-5">
        <Form.Group className="mb-4">
          <Form.Label>Form.Range (Volume)</Form.Label>
          <Form.Range min={0} max={100} />
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="Floating Label (Email)">
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
        </Form.Group>
      </Form>
    </div>
  );
}

export default FormsExample;
