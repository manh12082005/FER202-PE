import React, { useState } from 'react';
import { Button, Collapse, ListGroup, Card } from 'react-bootstrap';

export const EventOnClick = () => {
    // [1] KHAI BÁO STATE
    // Dùng state 'open' (true/false) để biết menu đang mở hay đóng
    // Trong React, HẠN CHẾ tối đa dùng document.querySelector để sửa giao diện
    const [open, setOpen] = useState(false);

    // Có thể viết một hàm xử lý riêng như thế này, hoặc viết thẳng vào onClick cũng được:
    // const handleToggleMenu = () => {
    //     setOpen(!open);
    // };

    return (
        <Card className="mb-4">
            <Card.Header as="h3">Ví dụ về onClick</Card.Header>
            <Card.Body>
                {/* [2] SỰ KIỆN ONCLICK */}
                {/* Khi người dùng click chuột vào nút, gọi setOpen(!open) để đảo ngược trạng thái (đang đóng -> mở, đang mở -> đóng) */}
                <Button 
                    onClick={() => setOpen(!open)}
                    aria-controls="menu-list"
                    aria-expanded={open}
                    variant="primary"
                    className="mb-3"
                >
                    Menu
                </Button>
                
                {/* [3] HIỂN THỊ DỰA THEO STATE (Cách cơ bản) */}
                {/* Dùng toán tử &&: Nếu 'open' là true thì phần ( <ul>...</ul> ) phía sau mới được render ra màn hình */}
                {open && (
                    <div id="menu-list">
                        <ul>
                            <li>Mục 1</li>
                            <li>Mục 2</li>
                            <li>Mục 3</li>
                        </ul>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};
