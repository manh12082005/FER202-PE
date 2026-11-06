import { useState } from "react";

// ==========================================
// BÀI HỌC VỀ: useState
// ==========================================
// 1. useState là gì? 
//    - Là một "Hook" của React dùng để lưu trữ dữ liệu (state) có thể thay đổi bên trong Component.
// 2. Tại sao không dùng biến bình thường (let count = 0)?
//    - Vì khi biến bình thường thay đổi, giao diện trên màn hình KHÔNG cập nhật theo.
//    - Khi state (tạo bằng useState) thay đổi, React sẽ TỰ ĐỘNG VẼ LẠI (re-render) phần giao diện chứa nó.
// 3. Cú pháp: const [tên_biến, hàm_để_sửa_biến] = useState(giá_trị_ban_đầu)

export const Count = () => {
    // [1] KHAI BÁO STATE
    // count    : Biến chứa giá trị hiện tại (lúc đầu là 0)
    // setCount : Hàm dùng để thay đổi giá trị của 'count'
    const [count, setCount] = useState(0);

    // [2] HÀM XỬ LÝ SỰ KIỆN TĂNG
    const increase = () => {
        // MUỐN THAY ĐỔI STATE THÌ BẮT BUỘC PHẢI GỌI HÀM SET
        // KHÔNG ĐƯỢC VIẾT: count = count + 1 (Sẽ bị lỗi, giao diện không đổi)
        setCount(count + 1);
    };

    // [3] HÀM XỬ LÝ SỰ KIỆN GIẢM
    const decrease = () => {
        setCount(count - 1);
    };
    console.log("Component render - count:", count);
    return (
        <div>
            {/* Hiển thị giá trị của state ra màn hình */}
            <p>Count: {count}</p>

            {/* Gắn sự kiện onClick vào 2 nút */}
            <button onClick={increase}>Increase</button>
            <button onClick={decrease}>Decrease</button>
        </div>
    );
};