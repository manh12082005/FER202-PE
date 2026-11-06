// ======================================================
// COMPONENT: HomePage
// ======================================================
// Đây là component trang chủ (Page Component).
// Nhiệm vụ: quản lý dữ liệu sản phẩm và hiển thị danh sách sản phẩm.
// Page component thường chứa dữ liệu (state/data) và truyền xuống
// các component con thông qua props.

import { Product } from "../common/Product"

// -------------------------------------------------------
// DỮ LIỆU SẢN PHẨM (mock data - dữ liệu giả lập)
// -------------------------------------------------------
// Trong thực tế, listProduct thường được lấy từ API (fetch/axios).
// Mỗi object trong mảng đại diện cho 1 sản phẩm với các thuộc tính:
//   - id    : định danh duy nhất của sản phẩm (dùng làm key khi render danh sách)
//   - name  : tên sản phẩm (string)
//   - price : giá sản phẩm (number, đơn vị: VNĐ)
//   - image : đường dẫn URL ảnh sản phẩm (string)
const listProduct = [
    {
        id: 1,
        name: "Tai nghe Bluetooth",
        price: 590000,
        image:
            "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
    },
    {
        id: 2,
        name: "Eyeshadow Palette with Mirror",
        price: 1290000,
        image:
            "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
    },
    {
        id: 3,
        name: "Powder Canister",
        price: 750000,
        image:
            "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp",
    }
]

// -------------------------------------------------------
// COMPONENT CHÍNH: HomePage
// -------------------------------------------------------
export const HomePage = () => {
    return (
        <>
            <div className="main-content">
                <h1 className="homePage">HomePage</h1>

                {/*
                    RENDER DANH SÁCH SẢN PHẨM bằng Array.map()
                    ------------------------------------------
                    - listProduct.map() lặp qua từng phần tử trong mảng.
                    - Mỗi vòng lặp trả về 1 component <Product />.
                    - (item) là từng object sản phẩm trong mảng, ví dụ:
                        { id: 1, name: "Tai nghe Bluetooth", price: 590000, image: "..." }

                    TRUYỀN PROPS XUỐNG COMPONENT <Product />:
                    ------------------------------------------
                    - key={item.id}       → key là prop đặc biệt của React, KHÔNG truyền vào component.
                                            React dùng key để nhận biết phần tử nào thay đổi
                                            trong danh sách (tăng hiệu năng render).
                                            Nên dùng id duy nhất, tránh dùng index của mảng.

                    - name={item.name}    → truyền tên sản phẩm (string) vào prop "name"
                                            Component <Product> sẽ nhận và hiển thị giá trị này.

                    - price={item.price}  → truyền giá sản phẩm (number) vào prop "price"
                                            Component <Product> sẽ nhận và hiển thị giá trị này.

                    - image={item.image}  → truyền URL ảnh (string) vào prop "image"
                                            Component <Product> dùng làm src của thẻ <img>.

                    ⚠️ Lưu ý: Dữ liệu chỉ đi 1 chiều từ cha (HomePage) → con (Product).
                               Đây là nguyên tắc "one-way data flow" của React.
                */}
                <div className="product-list">
                {listProduct.map((item) => {
                    return (
                        <Product
                            key={item.id}       // key giúp React tối ưu render danh sách
                            name={item.name}    // prop: tên sản phẩm
                            price={item.price}  // prop: giá sản phẩm
                            image={item.image}  // prop: URL ảnh sản phẩm
                        />
                    )
                })}
                </div>
            </div>
        </>
    )
}