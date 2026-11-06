// BÀI HỌC 2: LẤY THAM SỐ TỪ URL (useParams)
// Mục tiêu: Bắt lấy cái ID trên đường dẫn URL (ví dụ URL là: /products/1 -> lấy số 1).
// Sau đó dùng ID này gọi API để lấy thông tin chi tiết của đúng sản phẩm đó.
//
// Cách cài đặt Route trong App.js (hoặc index.js) thường có dạng:
//   <Route path="/products/:id" element={<ProductDetail />} />
// Dấu ':' báo hiệu cho React Router biết 'id' là một biến thay đổi liên tục.

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useParams dùng để bóc tách dữ liệu từ URL
import axios from "axios";

export default function ProductDetail() {
    // 1. Lấy ID từ thanh địa chỉ trình duyệt
    // Hàm useParams() trả về 1 object. Ta dùng cặp ngoặc nhọn { id } để lấy thẳng biến id ra.
    // LƯU Ý RẤT QUAN TRỌNG: Giá trị id lấy từ URL luôn luôn là CHUỖI (string), không phải SỐ (number).
    const { id } = useParams();

    // 2. Khởi tạo navigate để làm chức năng nút "Quay lại"
    const navigate = useNavigate();

    // 3. State lưu thông tin của MỘT sản phẩm cụ thể. Ban đầu là null vì chưa gọi API xong.
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    // 4. Gọi API lấy chi tiết sản phẩm mỗi khi biến 'id' trên URL thay đổi
    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                // Lồng biến id vào URL API để chỉ yêu cầu server trả đúng 1 sản phẩm cần tìm
                const response = await axios.get(`http://localhost:9999/products/${id}`);
                setProduct(response.data); // Thành công -> cất dữ liệu vào state product
                setError(null);            // Xóa lỗi (nếu trước đó có)
            } catch (err) {
                setError(`Không tìm thấy sản phẩm với id = ${id}`);
                setProduct(null);
            }
        };
        fetchProductDetail();

        // MẢNG PHỤ THUỘC (DEPENDENCIES): 
        // Đưa biến 'id' vào đây là BẮT BUỘC. Nhờ vậy, nếu học sinh gõ tay đổi URL từ /products/1 sang /products/2,
        // useEffect sẽ nhận diện được id thay đổi và tự động chạy lại API để lấy sản phẩm số 2.
    }, [id]);


    // Nếu có lỗi (ví dụ id không tồn tại), hiển thị thông báo lỗi
    if (error) {
        return (
            <div>
                <p>{error}</p>
                {/* Lệnh navigate(-1) giúp trình duyệt quay về đúng trang trước đó giống nút Back */}
                <button onClick={() => navigate(-1)}>← Quay lại</button>
            </div>
        );
    }

    return (
        <div>
            <button onClick={() => navigate(-1)}>← Quay lại</button>

            <h2>Chi tiết sản phẩm</h2>

            {/* Thông tin chi tiết sản phẩm */}
            <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
                {/* 
                    Lưu ý dấu chấm hỏi (?.) - Optional Chaining:
                    Vì ban đầu product = null, nếu ghi product.name web sẽ sập lỗi đỏ lòm (Cannot read properties of null).
                    Ghi product?.name thì React sẽ tự hiểu: Nếu product có dữ liệu thì in ra name, nếu null thì bỏ qua.
                */}
                <h3>{product?.name}</h3>
                <p>Danh mục: <strong>{product?.category}</strong></p>
                <p>Giá: <strong>{product?.price?.toLocaleString("vi-VN")} ₫</strong></p>
                <p>ID: <strong>{product?.id}</strong></p>
            </div>
        </div>
    );
}
