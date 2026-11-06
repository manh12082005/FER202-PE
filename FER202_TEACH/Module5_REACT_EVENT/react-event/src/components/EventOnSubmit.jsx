import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';

export const EventOnSubmit = () => {
    
    // [1] HÀM XỬ LÝ FORM SUBMIT
    const handleOnSubmit = (event) => {
        // BƯỚC QUAN TRỌNG NHẤT:
        // Mặc định của HTML là khi submit form, trình duyệt sẽ bị TẢI LẠI TRANG (reload).
        // Lệnh event.preventDefault() sẽ ngăn chặn việc reload này để React tự xử lý ngầm (Single Page Application).
        event.preventDefault(); 
        
        // Lấy giá trị mà người dùng đã nhập:
        // Cú pháp: event.target.[name_của_ô_input].value
        // Ở đây ô input có name="keyword", nên lấy bằng event.target.keyword.value
        const keyword = event.target.keyword.value;
        
        console.log("Từ khóa tìm kiếm:", keyword);
        alert(`Đang tìm kiếm từ khóa: ${keyword}`); // Bật thông báo để thấy kết quả
    };

    return (
        <Card className="mb-4">
            <Card.Header as="h3">Ví dụ về onSubmit</Card.Header>
            <Card.Body>
                {/* [2] SỰ KIỆN ONSUBMIT (Gắn vào thẻ FORM, KHÔNG gắn vào nút Gửi) */}
                <Form onSubmit={(event) => handleOnSubmit(event)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Tìm kiếm khóa học:</Form.Label>
                        
                        {/* Thuộc tính name="keyword" bắt buộc phải có để lấy dữ liệu ở dòng 15 */}
                        <Form.Control 
                            type="text" 
                            name="keyword" 
                            placeholder="Nhập từ khóa..." 
                        />
                    </Form.Group>
                    
                    {/* Bắt buộc phải là type="submit" thì khi bấm mới kích hoạt được sự kiện onSubmit của Form phía trên */}
                    <Button variant="success" type="submit">
                        Gửi
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};
