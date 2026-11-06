// ContextProvider.js
// Tạo Context để chia sẻ danh sách sản phẩm cho toàn bộ component con.
//
// Luồng hoạt động:
//   1. ContextProvider gọi API lấy danh sách sản phẩm (chỉ 1 lần khi mount)
//   2. Lưu vào state listProduct
//   3. Đưa listProduct vào Provider → các component con lấy ra dùng bằng useContext

import { createContext, useEffect, useState } from "react";
import instance from "../utils"; // axios instance đã cấu hình sẵn baseURL

// Tạo Context (kho dữ liệu chung)
// BoxProvider sẽ được dùng ở cả Provider (ở đây) và useContext (ở component con)
export const BoxProvider = createContext();

// Component Provider: bọc ngoài các component cần dùng dữ liệu
export const ContextProvider = ({ children }) => {
    // Lưu danh sách sản phẩm lấy từ API
    const [listProduct, setListProduct] = useState([]);

    // deps = [] → chỉ gọi API 1 lần khi component vừa xuất hiện
    useEffect(() => {
        instance.get("/products")           // GET http://localhost:9999/products
            .then((res) => {
                setListProduct(res.data); // lưu danh sách sản phẩm vào state
            });
    }, []); // [] = chạy 1 lần duy nhất

    return (
        // Đưa listProduct, setListProduct, error vào kho để component con lấy ra dùng
        <BoxProvider.Provider
            value={{
                listProduct,    // danh sách sản phẩm
                setListProduct, // hàm cập nhật danh sách (dùng khi thêm/xóa)
            }}
        >
            {children}
        </BoxProvider.Provider>
    );
};