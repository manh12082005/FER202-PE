// Product.js
// Component hiển thị danh sách sản phẩm.
// Lấy dữ liệu từ Context thay vì nhận qua props.
//
// Tại sao dùng Context thay vì props?
//   → Nếu dùng props: App → Page → Product (phải truyền qua nhiều tầng)
//   → Dùng Context:   Product lấy thẳng từ kho, không cần qua tầng nào

import { useContext } from "react";
import { BoxProvider } from "../context/ContextProvider";

export const Product = () => {
    // Lấy listProduct từ kho (BoxProvider Context)
    const { listProduct } = useContext(BoxProvider);

    return (
        <>
            <div>
                <h2>Danh sách sản phẩm</h2>

                {/* Render từng sản phẩm trong danh sách */}
                {listProduct.map((item) => (
                    // key={item.id} giúp React phân biệt từng phần tử khi re-render
                    <div key={item.id}>
                        <h3>{item.name}</h3>
                        <p>{item.price}</p>
                        <button>Thêm vào giỏ hàng</button>
                    </div>
                ))}
            </div>
        </>
    );
};