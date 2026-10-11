// ============================================================
// REST & SPREAD – Hai toán tử dùng chung ký hiệu "..." trong ES6
// ============================================================
// Tuy cùng ký hiệu "..." nhưng có vai trò NGƯỢC NHAU:
//   REST   (...) → GOM nhiều giá trị lại thành 1 mảng  (dùng trong hàm)
//   SPREAD (...) → TÁCH 1 mảng/object ra thành nhiều phần tử riêng lẻ

// ============================================================
// PHẦN 1: THAM SỐ REST (...) – Gom tham số thành mảng
// ============================================================

//  Cách cũ: hàm cố định 3 tham số → không linh hoạt
//    Nếu truyền 4, 5 số thì không tính được
const sumNumbers = (a, b, c) => a + b + c;

//  Dùng REST: hàm nhận bất kỳ bao nhiêu số cũng được
//    ...numbers gom TẤT CẢ tham số truyền vào thành 1 mảng [numbers]
const sumNumbersWithRestParam = (...numbers) => {
    let total = 0;
    for (const item of numbers) { // duyệt qua từng phần tử trong mảng
        total += item;
    }
    return total;
}

//  Cách viết tối ưu hơn dùng .reduce()
//    .reduce((tổng tích lũy, phần tử hiện tại) => ..., giá trị ban đầu)
//    Ý nghĩa: bắt đầu từ 0, cộng dồn từng phần tử cho đến hết mảng
const sumNumbersWithRestParam1 = (...numbers) => numbers.reduce((total, item) => total + item, 0);

console.log(sumNumbers(10, 20, 30));                      // 60  (cố định 3 số)
console.log(sumNumbersWithRestParam([1, 2, 3, 4, 5, 6, 7, 8])); // truyền mảng
console.log(sumNumbersWithRestParam1(3, 5, 7, -10));      // 5   (linh hoạt số lượng)

// ============================================================
// PHẦN 2: TOÁN TỬ SPREAD (...) – Trải phần tử ra ngoài
// ============================================================

// -------------------------------------------------------
// 2a. SPREAD với MẢNG – Nối mảng
// -------------------------------------------------------
// ...name1 "trải" từng phần tử của name1 ra, tương tự ...name2
// Kết quả: gộp 2 mảng thành 1 mảng mới
const name1 = ["Đạt", "Hồng", "Lan"];
const name2 = ["Cúc", "Mai"];
const name = [...name1, ...name2]; // → ["Đạt", "Hồng", "Lan", "Cúc", "Mai"]
console.log(name);

// -------------------------------------------------------
// 2b. SPREAD để truyền mảng vào hàm nhận REST
// -------------------------------------------------------
// Hàm sumNumbersWithRestParam1 nhận các số riêng lẻ (không phải mảng)
// ...revenew "trải" mảng ra → truyền từng phần tử vào hàm
const revenew = [1000, 3000, 1200, 4000];
const total_revenue = sumNumbersWithRestParam1(...revenew); // giống gọi (1000, 3000, 1200, 4000)
console.log(`Total revenue: ${total_revenue}`);            // 9200

// -------------------------------------------------------
// 2c. SPREAD với OBJECT – Gộp object
// -------------------------------------------------------
// Lưu ý: nếu 2 object có thuộc tính TRÙNG TÊN,
//        object viết SAU sẽ GHI ĐÈ lên object viết trước
const student1 = { id: 1, name: "Đạt",  age: 20 };
const student2 = { id: 2, name: "Hồng", age: 19 };

// Gộp 2 object → student2 ghi đè student1 (vì id, name, age trùng nhau)
// Kết quả: { id: 2, name: "Hồng", age: 19 }
const students = { ...student1, ...student2 };
console.log(students);

// -------------------------------------------------------
// 2d. SPREAD để GỘP 2 object KHÁC THUỘC TÍNH
// -------------------------------------------------------
// studentInformation và studentScores có thuộc tính khác nhau hoàn toàn
// → Gộp vào sẽ có đầy đủ tất cả thuộc tính, không bị mất dữ liệu
const studentInformation = { id: 1, name: "Đạt", age: 20 };
const studentScores      = { course1: 9.5, course2: 8.0, course3: 7.5 };

// Kết quả: { id: 1, name: "Đạt", age: 20, course1: 9.5, course2: 8.0, course3: 7.5 }
const studentProfile = { ...studentInformation, ...studentScores };
console.log(studentProfile);

// -------------------------------------------------------
// 2e. SPREAD để CẬP NHẬT object (tạo bản sao có sửa đổi)
// -------------------------------------------------------
// Trải toàn bộ studentInformation ra, rồi ghi đè lên các trường muốn thay đổi.
// studentInformation GỐC không bị ảnh hưởng → đây là cách cập nhật AN TOÀN
const newStudentInfor = { ...studentInformation, age: 22, name: "Đạt Nguyễn" };
// Kết quả: { id: 1, name: "Đạt Nguyễn", age: 22 }
console.log(newStudentInfor);
