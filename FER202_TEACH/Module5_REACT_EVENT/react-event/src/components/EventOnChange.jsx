import React from 'react';
import { Form, Card } from 'react-bootstrap';

export const EventOnChange = () => {
    
    // [1] HÀM XỬ LÝ SỰ KIỆN (EVENT HANDLER)
    // Hàm này sẽ tự động chạy mỗi khi giá trị của ô select (hoặc ô input) thay đổi.
    // Tham số 'event' (e) chứa toàn bộ thông tin về sự thay đổi đó.
    const handleOnChange = (event) => {
        // event.target: là cái thẻ HTML đang phát sinh sự kiện (ở đây là thẻ <Form.Select>)
        // event.target.value: lấy ra giá trị (value) mới mà người dùng vừa chọn.
        console.log("Màu bạn vừa chọn là:", event.target.value);
        alert(`Bạn đã chọn màu: ${event.target.value}`); // Bật thông báo cho dễ nhìn
    };

    return (
        <Card className="mb-4">
            <Card.Header as="h3">Ví dụ về onChange</Card.Header>
            <Card.Body>
                <Form.Group>
                    <Form.Label>Chọn màu yêu thích:</Form.Label>
                    
                    {/* [2] SỰ KIỆN ONCHANGE */}
                    {/* Bắt buộc truyền (event) vào để hàm handleOnChange bên trên nhận được dữ liệu */}
                    <Form.Select onChange={(event) => handleOnChange(event)} className="color">
                        {/* Lưu ý: event.target.value chính là các giá trị 'yellow', 'red',... được định nghĩa ở đây */}
                        <option value="yellow">Màu Vàng</option>
                        <option value="red">Màu Đỏ</option>
                        <option value="green">Màu Xanh</option>
                        <option value="pink">Màu Hồng</option>
                    </Form.Select>
                </Form.Group>
            </Card.Body>
        </Card>
    );
};
