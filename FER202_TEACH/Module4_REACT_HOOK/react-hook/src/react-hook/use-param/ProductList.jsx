// BÀI HỌC 1: ĐIỀU HƯỚNG BẰNG CODE (useNavigate)
// Mục tiêu: Lấy danh sách sản phẩm từ API, hiển thị ra bảng. 
// Khi click vào nút "Xem chi tiết", ta dùng useNavigate chuyển sang trang ProductDetail kèm theo ID trên URL.

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook dùng để chuyển trang bằng code
import axios from "axios";
import { Table, Button } from "react-bootstrap";

export default function ProductList() {
    // 1. State lưu danh sách sản phẩm lấy từ API
    const [products, setProducts] = useState([]);

    // 2. Khởi tạo hàm navigate từ hook useNavigate
    const navigate = useNavigate();

    // 3. useEffect chạy 1 lần duy nhất khi trang vừa load để gọi API (Chuẩn đề thi PE)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Gọi API lấy dữ liệu từ json-server đang chạy ở port 9999
                const response = await axios.get("http://localhost:9999/products");
                setProducts(response.data); // Cất dữ liệu vào state
            } catch (error) {
                console.error("Lỗi khi tải danh sách sản phẩm:", error);
            }
        };
        fetchProducts();
    }, []); // Mảng rỗng [] đảm bảo hàm này chỉ chạy 1 lần khi mở trang

    // 4. Hàm này chạy khi bấm nút "Xem chi tiết"
    const handleViewDetail = (id) => {
        // Điều hướng trình duyệt sang đường dẫn /products/KÈM_ID_CỦA_SẢN_PHẨM
        // Ví dụ bấm vào id = 1 -> URL sẽ đổi thành /products/1
        navigate(`/products/${id}`);
    };

    return (
        <div className="container mt-4">
            <h2>Danh sách sản phẩm</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên sản phẩm</th>
                        <th>Danh mục</th>
                        <th>Giá</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Dùng hàm map để duyệt qua mảng products và sinh ra từng dòng của bảng */}
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.price.toLocaleString("vi-VN")} ₫</td>
                            <td>
                                {/* Gắn sự kiện onClick vào nút Button, khi bấm sẽ gọi hàm navigate */}
                                <Button
                                    variant="primary"
                                    onClick={() => handleViewDetail(product.id)}
                                >
                                    Xem chi tiết
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
