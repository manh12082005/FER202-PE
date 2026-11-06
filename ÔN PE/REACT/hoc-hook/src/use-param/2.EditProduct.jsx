// useParams dùng để lấy tham số động trên URL path.
// Ví dụ URL:
// /edit-product/3
// Ở đây số 3 là id sản phẩm.
// Muốn React hiểu số 3 là biến, bạn khai báo route như này:
// <Route path="/edit-product/:id" element={<EditProduct />} />
// Dấu : nghĩa là:
// id là biến động
// Nên:
// /edit-product/1  → id = "1"
// /edit-product/2  → id = "2"
// /edit-product/10 → id = "10"

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EditProduct() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:9999/products/${id}`)
            setProduct(response.data);
        }
        fetchData();
    }, [id]);

    if (!product) {
        return <p>Đang tải sản phẩm...</p>;
    }

    return (
        <div>
            <h2>Edit Product</h2>
            <p>Name: {product.name}</p>
            <p>Price: {product.price}</p>
        </div>
    );
}
// 1. User vào /edit-product/3
// 2. useParams lấy id = "3"
// 3. useEffect chạy
// 4. axios gọi http://localhost:9999/products/3
// 5. API trả về product id = 3
// 6. setProduct lưu vào state
// 7. Giao diện hiển thị dữ liệu product


//Nhiều params trong một URL
<Route path="/categories/:catId/products/:productId" element={<ProductDetail />} />
// /categories/2/products/10
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { catId, productId } = useParams();

  return (
    <div>
      <p>Category ID: {catId}</p>
      <p>Product ID: {productId}</p>
    </div>
  );
}