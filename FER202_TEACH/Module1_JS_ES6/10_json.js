// ============================================================
// JSON (JavaScript Object Notation)
// ============================================================
// JSON là một ĐỊNH DẠNG DỮ LIỆU dưới dạng CHUỖI (string).
//
// Tại sao cần JSON?
//   Các ngôn ngữ lập trình khác nhau (JS, Python, Java, C#...) không thể
//   trực tiếp đọc object của nhau. Nhưng tất cả đều hiểu được CHUỖI VĂN BẢN.
//   → JSON là "ngôn ngữ trung gian" giúp các ngôn ngữ giao tiếp với nhau.
//
// Ví dụ thực tế:
//   FE (JavaScript) lấy được dữ liệu dưới dạng JS Object
//   → Muốn gửi cho BE (Java/Python) thì phải chuyển sang JSON (chuỗi) trước
//   → BE nhận được chuỗi JSON, tự parse sang kiểu dữ liệu của mình
// ============================================================


// ===============
// =============================================
// DỮ LIỆU GỐC: JS Object (chỉ dùng được trong JS)
// ============================================================
const student = {
    id: 1,
    name: "Đức",
    dob: "2000/01/01",
    isPassed: true,
    scores: [8, 9, 7]
};

console.log("=== DỮ LIỆU GỐC (JS Object) ===");
console.log(student);
console.log("Kiểu dữ liệu:", typeof student); // object


// ============================================================
// JSON.stringify() — Chuyển JS Object → JSON (chuỗi)
// ============================================================
// Dùng khi: muốn gửi dữ liệu đi (gửi lên server, lưu vào file, localStorage...)
// Kết quả trả về: một chuỗi string theo chuẩn JSON
//
// Lưu ý: JSON KHÔNG hỗ trợ các kiểu: function, undefined, Date object
//   → Nếu object có những kiểu này, stringify() sẽ tự bỏ qua chúng

const jsonString = JSON.stringify(student);

console.log("\n=== SAU KHI stringify() → JSON String ===");
console.log(jsonString);
console.log("Kiểu dữ liệu:", typeof jsonString); // string


// ============================================================
// Minh họa: JSON KHÔNG hỗ trợ function và undefined
// ============================================================
const dataWithUnsupported = {
    id: 1,
    name: "Tom",
    greet: function () { return "Hello"; }, // function → bị BỎ QUA
    nickname: undefined,                    // undefined → bị BỎ QUA
    score: 9.5                              // number → OK
};

const jsonUnsupported = JSON.stringify(dataWithUnsupported);
console.log("\n=== Khi stringify object có function/undefined ===");
console.log(jsonUnsupported);
// Output: {"id":1,"name":"Tom","score":9.5}
// → "greet" và "nickname" biến mất!


// ============================================================
// JSON.parse() — Chuyển JSON (chuỗi) → JS Object
// ============================================================
// Dùng khi: nhận dữ liệu từ server về (dạng chuỗi JSON)
//           và muốn dùng như một object bình thường trong JS

const parsedStudent = JSON.parse(jsonString);

console.log("\n=== SAU KHI parse() → JS Object ===");
console.log(parsedStudent);
console.log("Kiểu dữ liệu:", typeof parsedStudent); // object
console.log("Truy cập thuộc tính:", parsedStudent.name); // Đức


