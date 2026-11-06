// ======================================================
// COMPONENT: Product
// ======================================================
// Đây là component con (Common/UI Component) — còn gọi là "Presentational Component".
// Nhiệm vụ: chỉ NHẬN dữ liệu từ component cha qua PROPS và hiển thị (render) ra UI.
// Component này KHÔNG tự quản lý dữ liệu, không gọi API.
//
// PROPS NHẬN VÀO (được truyền từ HomePage):
// ------------------------------------------
//   - name  (string) : tên sản phẩm          → hiển thị trong <span>
//   - price (number) : giá sản phẩm (VNĐ)    → hiển thị trong <span>
//   - image (string) : URL ảnh sản phẩm       → dùng làm src của <img>
//
// CÁCH NHẬN PROPS - Destructuring:
// ------------------------------------------
// Thay vì viết:  (props) rồi dùng props.name, props.price, props.image
// Ta dùng:       ({ name, price, image }) → lấy thẳng giá trị từ props object.
// Hai cách tương đương nhau, nhưng destructuring ngắn gọn và rõ ràng hơn.
//
// Ví dụ props nhận được khi HomePage gọi:
//   <Product key={1} name="Tai nghe Bluetooth" price={590000} image="https://..." />
//   → name  = "Tai nghe Bluetooth"
//   → price = 590000
//   → image = "https://..."

export const Product = ({ name, price, image }) => {

    return (
        // Mỗi sản phẩm được bọc trong div.product-card để CSS style riêng
        <div className="product-card">
            <figure>
                <img src={image} alt={name} />
            </figure>
            <div>
                <strong>Name: </strong>
                <span>{name}</span>
            </div>
            <div>
                <strong>Price: </strong>
                <span>{price}</span>
            </div>
        </div>
    )
}