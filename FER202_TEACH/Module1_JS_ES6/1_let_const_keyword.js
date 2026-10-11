// ============================================================
// LET & CONST – Từ khóa khai báo biến trong JavaScript ES6
// ============================================================

// -------------------------------------------------------
// 1. KHAI BÁO BIẾN
// -------------------------------------------------------
// [let] → Dùng khi giá trị của biến CÓ THỂ thay đổi về sau.
let name = "Nguyễn Tiến Đạt";

// [const] → Dùng khi giá trị KHÔNG BAO GIỜ thay đổi (hằng số).
//           BẮT BUỘC phải gán giá trị ngay khi khai báo.
const age = 20;

// [let] không bắt buộc gán giá trị ngay.
// Nếu chưa gán, giá trị mặc định sẽ là: undefined
let phone;

// [const] với kiểu boolean (true / false)
const gender = true;

// Lưu ý: JavaScript không yêu cầu khai báo kiểu dữ liệu (number, string...),
// nhưng với const thì BẮT BUỘC phải có giá trị ban đầu.

// -------------------------------------------------------
// 2. THAY ĐỔI GIÁ TRỊ
// -------------------------------------------------------
// ✅ let → CÓ THỂ thay đổi giá trị bất cứ lúc nào
name = "Nguyễn Bình";

// ❌ const → KHÔNG THỂ thay đổi giá trị (nếu thử sẽ bị lỗi)
// age = 25; // → TypeError: Assignment to constant variable.

console.log(name);    // "Nguyễn Bình"   (đã bị thay đổi)
console.log(age);     // 20              (không đổi)
console.log(phone);   // undefined       (chưa được gán giá trị)
console.log(gender);  // true

// -------------------------------------------------------
// 3. PHẠM VI (SCOPE) – Sự khác nhau giữa var và let/const
// -------------------------------------------------------
// [var]        → Phạm vi TOÀN CỤC hoặc toàn hàm (function scope).
//                Có thể truy cập từ bên ngoài khối {} → dễ gây lỗi.
// [let, const] → Phạm vi TRONG KHỐI {} nơi nó được khai báo (block scope).
//                Không thể truy cập từ bên ngoài khối → an toàn hơn.

function blockScopeTesting() {
    let x = 10; // x chỉ tồn tại trong hàm blockScopeTesting()

    if (true) {
        var y = 20;  // var → thoát ra ngoài khối if, vẫn dùng được trong hàm
        // let y = 20; // Nếu dùng let → y chỉ sống trong khối if này

        console.log(x); // 10 – truy cập được vì cùng trong hàm
        console.log(y); // 20
    }

    // Nếu y được khai báo bằng let ở trên → dòng này sẽ báo lỗi:
    // ReferenceError: y is not defined
    // Vì y (let) chỉ tồn tại bên trong khối if {}
    console.log(x + y); // 30 – hoạt động vì y là var (không bị giới hạn bởi {})
}

blockScopeTesting();