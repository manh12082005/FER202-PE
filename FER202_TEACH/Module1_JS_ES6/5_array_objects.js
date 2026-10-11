// ============================================================
// ARRAY & OBJECT – Mảng và Đối tượng trong JavaScript ES6
// ============================================================

// -------------------------------------------------------
// PHẦN 1: ARRAY (Mảng)
// -------------------------------------------------------
// Mảng là danh sách chứa nhiều giá trị, truy cập qua chỉ số (index bắt đầu từ 0)
// Mảng có thể chứa nhiều kiểu dữ liệu khác nhau trong cùng 1 mảng
const price = [10, 5, 20, 35];            // mảng số
const list  = [1, "Macbook Pro", 1500.5, true]; // mảng hỗn hợp nhiều kiểu dữ liệu

// -------------------------------------------------------
// 1. THÊM / CẬP NHẬT phần tử trong mảng
// -------------------------------------------------------
price[1] = 15;   // Ghi đè phần tử tại index 1: [10, 15, 20, 35]
price.push(100); // Thêm phần tử vào CUỐI mảng:  [10, 15, 20, 35, 100]
console.log(price);

// -------------------------------------------------------
// 2. XÓA phần tử khỏi mảng
// -------------------------------------------------------
// .pop() → Xóa phần tử CUỐI CÙNG và TRẢ VỀ phần tử đó
const poppedItem = price.pop();
console.log(poppedItem); // 100  (phần tử vừa bị xóa)
console.log(price);      // [10, 15, 20, 35]

// -------------------------------------------------------
// 3. DUYỆT TỪNG PHẦN TỬ trong mảng (3 cách)
// -------------------------------------------------------

// Cách 1: Vòng lặp for truyền thống
// → Dùng khi cần truy cập index (vị trí) của từng phần tử
console.log("List of price: (using for loop)");
for (let index = 0; index < price.length; index++) {
    console.log(price[index]); // price[0]=10, price[1]=15, ...
}

// Cách 2: .forEach() – duyệt qua từng phần tử, KHÔNG tạo mảng mới
// → Chỉ dùng để thực hiện hành động phụ (in ra, ghi log...)
// → item sẽ lần lượt nhận giá trị từng phần tử: 10, 15, 20, 35
console.log("List of price: (using forEach)");
price.forEach((item) => console.log(item));

// Cách 3: .map() – duyệt và TẠO RA MẢNG MỚI từ mảng cũ
// → Mỗi phần tử được biến đổi theo hàm callback, kết quả gom thành mảng mới
// → Mảng gốc KHÔNG bị thay đổi
console.log("List of price: (using map)");
price.map((value, index) => console.log(`#${index} - ${value}`));

// -------------------------------------------------------
// 4. TẠO MẢNG MỚI từ mảng gốc bằng .map()
// -------------------------------------------------------
// Dấu ? (Optional Chaining) → kiểm tra price có tồn tại không trước khi gọi .map()
// Nếu price là null/undefined thì trả về undefined thay vì báo lỗi
const newPrices = price?.map(item => item + 2); // tăng mỗi phần tử lên 2
console.log(newPrices); // [12, 17, 22, 37]
console.log(price);     // [10, 15, 20, 35] → mảng gốc vẫn nguyên vẹn

// -------------------------------------------------------
// 5. LỌC phần tử bằng .filter()
// -------------------------------------------------------
// .filter() → Duyệt toàn bộ mảng, TẠO MẢNG MỚI chỉ gồm các phần tử thỏa điều kiện
// Các phần tử không thỏa mãn sẽ bị bỏ qua
const filterPrice = price?.filter(item => item % 2 === 0); // chỉ lấy số chẵn
console.log(filterPrice); // [10, 20]

// -------------------------------------------------------
// 6. TÌM KIẾM phần tử bằng .find()
// -------------------------------------------------------
// .find() → Trả về phần tử ĐẦU TIÊN thỏa mãn điều kiện, rồi DỪNG luôn
//           Nếu không tìm thấy → trả về undefined
// Khác .filter(): filter trả về MẢNG, find trả về 1 GIÁ TRỊ DUY NHẤT
const foundPrice = price.find(item => item > 12); // tìm số đầu tiên lớn hơn 12
console.log(foundPrice); // 15  (dừng ngay khi tìm thấy, không tìm tiếp)

const notFound = price.find(item => item > 999); // không có phần tử nào > 999
console.log(notFound); // undefined

// -------------------------------------------------------
// 7. KIỂM TRA mảng bằng .some() và .every()
// -------------------------------------------------------
// .some()  → Trả về TRUE nếu CÓ ÍT NHẤT 1 phần tử thỏa mãn điều kiện
//            (chỉ cần 1 đúng là đủ → "hay không?")
// .every() → Trả về TRUE nếu TẤT CẢ phần tử đều thỏa mãn điều kiện
//            (cần tất cả đúng → "tất cả đều...?")
// Cả hai đều trả về boolean: true hoặc false

const hasEven  = price.some(item => item % 2 === 0);  // có số chẵn nào không?
const allEven  = price.every(item => item % 2 === 0); // tất cả đều chẵn không?


console.log(`Có số chẵn không?          ${hasEven}`);   // true  (10, 20 là chẵn)
console.log(`Tất cả đều chẵn không?     ${allEven}`);   // false (15, 35 là lẻ)


// ============================================================
// PHẦN 2: OBJECT (Đối tượng)
// ============================================================
// Object là tập hợp các cặp key: value (thuộc tính: giá trị)
// Dùng để mô tả một thực thể có nhiều thông tin (sản phẩm, người dùng...)
const product = { id: 1, name: "Mouse", price: 10 };

// -------------------------------------------------------
// 1. TRUY CẬP thuộc tính của object
// -------------------------------------------------------
// Dùng dấu chấm (.) để truy cập: object.tenThuocTinh
console.log(`Name: ${product.name}`);   // "Mouse"
console.log(`Price: ${product.price}`); // 10
console.log(`Id: ${product.id}`);       // 1
console.log(`${product.id} - ${product.name} - ${product.price}`); // "1 - Mouse - 10"

// -------------------------------------------------------
// 2. THÊM thuộc tính mới vào object
// -------------------------------------------------------
// Chỉ cần gán trực tiếp: object.thuocTinhMoi = giaTri
product.category = "Electronics"; // thêm thuộc tính category
console.log(product); // { id:1, name:"Mouse", price:10, category:"Electronics" }

// -------------------------------------------------------
// 3. TẠO OBJECT MỚI từ object cũ (dùng Spread)
// -------------------------------------------------------
// ...product sao chép toàn bộ thuộc tính của product
// rồi thêm brand và supperlier vào object mới
// → product gốc KHÔNG bị thay đổi
const newProduct = { ...product, brand: "Logitech", supperlier: "FPT SHOP" };
console.log(newProduct);

// -------------------------------------------------------
// 4. CẬP NHẬT thuộc tính của object
// -------------------------------------------------------
// Gán trực tiếp để thay đổi giá trị thuộc tính đã có
newProduct.supperlier = "Techcom"; // ghi đè "FPT SHOP" → "Techcom"
console.log(newProduct);

// ============================================================
// PHẦN 3: MẢNG CÁC ĐỐI TƯỢNG (Array of Objects)
// ============================================================
// Kết hợp Array + Object → thường dùng để lưu danh sách dữ liệu thực tế
// Mỗi phần tử trong mảng là 1 object, object có thể chứa mảng bên trong (lồng nhau)
const employees = [
    {
        id: 1,
        name: "Đạt",
        gender: true,           // true = Nam, false = Nữ
        dependents: [           // mảng người thân (object lồng trong object)
            { id: 1, name: "Bảo" },
            { id: 2, name: "Lan" }
        ]
    },
    {
        id: 2,
        name: "Chi",
        gender: false,
        dependents: [
            { id: 1, name: "Minh" },
            { id: 2, name: "Khôi" }
        ]
    },
];

// -------------------------------------------------------
// 5. XỬ LÝ MẢNG ĐỐI TƯỢNG – In dạng bảng
// -------------------------------------------------------
// .map() biến đổi mỗi employee thành 1 object mới phù hợp để in bảng:
//   - gender (true/false) → chuyển thành chuỗi "Male"/"Female"
//   - dependents (mảng object) → lấy tên từng người → nối thành chuỗi "Bảo, Lan"
//     .map(d => d.name) → ["Bảo", "Lan"]
//     .join(", ")       → "Bảo, Lan"
// Lưu ý: arrow function trả về object phải bọc trong () để tránh nhầm với khối {}
const tableData = employees?.map(employee => ({
    Id:         employee.id,
    Name:       employee.name,
    Gender:     employee.gender ? "Male" : "Female",
    Dependents: employee.dependents
                    .map(d => d.name)   // lấy tên từng người thân
                    .join(", ")         // nối thành chuỗi ngăn cách bởi ", "
}));

// console.table() → in dữ liệu dạng bảng đẹp hơn console.log()
console.table(tableData);