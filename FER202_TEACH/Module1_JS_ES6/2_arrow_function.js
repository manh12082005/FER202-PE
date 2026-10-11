// ============================================================
// ARROW FUNCTION (HÀM MŨI TÊN) - ES6
// Arrow function là cách viết hàm ngắn gọn hơn trong JavaScript
// ============================================================


// -------------------------------------------------------
// CÁCH 1: Hàm truyền thống (cách viết cũ)
// -------------------------------------------------------
function sumNumber(a, b) {
    return a + b;
}
console.log("Sum Number: " + sumNumber(10, 20));


// -------------------------------------------------------
// CÁCH 2: Arrow Function - 2 tham số, có return
// Quy tắc: Chỉ 1 dòng lệnh => bỏ {} và bỏ return (JS tự hiểu)
//   function(a, b) { return a + b }
//   rút gọn thành =>  (a, b) => a + b
// -------------------------------------------------------
const sumNumber1 = (a, b) => a + b;
console.log(sumNumber1(5, 7));


// -------------------------------------------------------
// CÁCH 3: Arrow Function - 2 tham số, KHÔNG có return
// Chỉ thực thi lệnh (in ra màn hình), không trả về giá trị
// -------------------------------------------------------
const sumNumber2 = (a, b) => console.log(a + b);
sumNumber2(2, 3);


// -------------------------------------------------------
// CÁCH 4: Arrow Function - có NHIỀU câu lệnh => BẮT BUỘC dùng {}
// Khi dùng {}, phải viết return tường minh (không JS trả về undefined)
// Bài toán: Tính trung bình 2 số, mỗi số tăng thêm 10 trước khi tính
// -------------------------------------------------------
const avgNumbers = (a, b) => {
    a += 10;                           // tăng a lên 10
    b += 10;                           // tăng b lên 10
    return ((a + b) / 2).toFixed(2);  // toFixed(2) = làm tròn 2 chữ số thập phân
}
console.log("Average two number: " + avgNumbers(4, 10));


// -------------------------------------------------------
// CÁCH 5: Arrow Function - CHỈ 1 tham số => được phép bỏ ()
// Đúng chuẩn:  (name) => ...
// Viết tắt  :   name  => ...   ✅ đều hợp lệ
// -------------------------------------------------------
const displayName = name => console.log("Product name is: " + name);
displayName("Iphone 18 pro max");


// -------------------------------------------------------
// CÁCH 6: Arrow Function - KHÔNG có tham số => BẮT BUỘC giữ ()
// Chú ý: dấu ` ` (backtick - phím số 1 góc trái) dùng cho Template Literal
//        ${biến} để nhúng biến thẳng vào trong chuỗi
// -------------------------------------------------------
const showInfor = () => {
    let name   = "Tom";
    let age    = 20;
    let gender = 'Male';  // trong JS: '' và "" hoàn toàn giống nhau

    console.log(`Name: ${name}, Age: ${age}, Gender: ${gender}`);
}
showInfor();


// ============================================================
// TÓM TẮT NHANH
// ============================================================
// | Số tham số | Số lệnh trong thân hàm | Cú pháp               |
// |------------|------------------------|-----------------------|
// | 0 tham số  | bất kỳ                 | () => { ... }         |
// | 1 tham số  | 1 lệnh (return)        | x => x * 2            |
// | 2+ tham số | 1 lệnh (return)        | (a, b) => a + b       |
// | bất kỳ     | nhiều lệnh             | (a, b) => { ...; return ... } |
// ============================================================