// Ví dụ về alert: Hiển thị một hộp thoại thông báo cho người dùng
alert("Chào mừng bạn đến với ví dụ về alert và prompt!");

// Ví dụ về prompt: Hiển thị hộp thoại yêu cầu người dùng nhập thông tin
// Tham số thứ nhất là câu hỏi, tham số thứ hai (không bắt buộc) là giá trị mặc định
let userName = prompt("Vui lòng nhập tên của bạn:", "Khách");

// Kiểm tra xem người dùng có nhập tên hay không (nhấn OK hay Cancel)
if (userName !== null && userName.trim() !== "") {
    // Nếu người dùng nhập tên và nhấn OK
    alert("Xin chào, " + userName + "! Rất vui được gặp bạn.");
} else {
    // Nếu người dùng nhấn Cancel hoặc để trống
    alert("Bạn chưa nhập tên. Xin chào khách ẩn danh!");
}
