// ============================================================
// MODULE - FILE DỮ LIỆU (Data Module)
// ============================================================
// Trong JavaScript hiện đại, mỗi file .js là một "module" riêng biệt.
// Các biến/hàm khai báo trong file này KHÔNG tự động dùng được ở file khác.
//
// Để chia sẻ dữ liệu ra ngoài, ta dùng từ khóa: export
//
// Có 2 loại export:
//   1. export default  → mỗi file chỉ có 1 cái, import không cần dấu {}
//   2. export (named)  → mỗi file có thể có nhiều cái, import phải dùng {}
//
// File này dùng "export default" vì chỉ cần xuất 1 thứ duy nhất: object data
// ============================================================

const data = {
    students: [
        { id: 1, name: "Đức", dob: "2000/01/01", course: 1, class: 1 },
        { id: 2, name: "Hồng", dob: "2001/02/02", course: 1, class: 2 },
        { id: 3, name: "Lan", dob: "2002/03/03", course: 1, class: 3 },
        { id: 4, name: "Minh", dob: "2003/04/04", course: 2, class: 1 }
    ],
    course: [
        { id: 1, title: "FER202", credit: 3 },
        { id: 2, title: "SDN302", credit: 3 },
        { id: 3, title: "DBI202", credit: 2 }
    ],
    classes: [
        { id: 1, name: "SE2014" },
        { id: 2, name: "SE2015" },
        { id: 3, name: "SE2016" },
        { id: 4, name: "SE2010" }
    ]
};

// export default: "xuất" biến data ra ngoài để các file khác có thể import vào dùng.
// Vì là export default, khi import ở file khác có thể đặt tên tuỳ ý.
export default data;
