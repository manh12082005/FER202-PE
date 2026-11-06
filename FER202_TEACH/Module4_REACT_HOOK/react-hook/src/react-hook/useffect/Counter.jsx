import { useState, useEffect } from "react";

// ==========================================
// BÀI HỌC VỀ: useEffect (Trường hợp KHÔNG truyền mảng dependencies)
// ==========================================
// 1. useEffect là gì?
//    - Dùng để chạy các đoạn code gây ra "Side Effect" (Tác dụng phụ) như: gọi API, đếm thời gian, đổi tiêu đề tab...
// 2. Khi nào useEffect chạy?
//    - NÓ LUÔN LUÔN CHẠY SAU KHI GIAO DIỆN ĐÃ VẼ XONG TRÊN MÀN HÌNH (Render xong mới chạy)
// 3. Mảng dependencies (deps) là gì?
//    - Là tham số thứ 2 truyền vào useEffect: useEffect( () => {...}, [deps] )
//    - Nó dùng để "nhắc nhở" React: "Chỉ khi nào các biến trong mảng này thay đổi, thì mới chạy lại đoạn code này nhé!".
//    - Có 3 trường hợp dùng mảng dependencies:
//      + KHÔNG có mảng (ví dụ file này) -> Render lại là chạy.
//      + Mảng rỗng [] -> Chạy đúng 1 lần đầu tiên.
//      + Mảng có biến [a, b] -> Chạy khi a hoặc b thay đổi.
//
// 4. Cú pháp file này: useEffect( () => { ... } ) // Không có phẩy mảng [] ở đuôi

export default function Counter() {
    const [count, setCount] = useState(0);

    // [1] KHAI BÁO USEEFFECT KHÔNG CÓ DEPS
    // Trường hợp này: Code trong đây sẽ chạy LẠI TỪ ĐẦU sau MỖI LẦN component này được vẽ (render)
    useEffect(() => {
        console.log("useEffect chạy - giá trị count hiện tại:", count);
    });
    console.log("Component render - count:", count);
    return (
        <div>
            <p>Count: {count}</p>
            {/* Mỗi lần bấm nút -> state 'count' tăng -> Component render lại -> useEffect chạy lại */}
            <button onClick={() => setCount(count + 1)}>Tăng</button>
        </div>
    );
}

// ------------------------------------
// TÓM TẮT LUỒNG HOẠT ĐỘNG:
// 1. Mở trang -> Vẽ UI (Count = 0) -> Chạy useEffect (In ra 0, đổi title tab thành 0)
// 2. Bấm nút Tăng -> Vẽ lại UI (Count = 1) -> Chạy useEffect (In ra 1, đổi title tab thành 1)
// ------------------------------------