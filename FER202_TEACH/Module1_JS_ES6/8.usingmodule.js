// ============================================================
// MODULE - FILE SỬ DỤNG DỮ LIỆU (Using Module)
// ============================================================
// "import" là từ khóa dùng để lấy dữ liệu/hàm từ một file khác vào sử dụng.
//
// Cú pháp import default:
//   import <tenBien> from '<duongDanToi_file>';
//
//   → <tenBien>  : tên bạn muốn đặt cho thứ được import (đặt tuỳ ý)
//   → <duongDan> : đường dẫn đến file chứa export, bắt đầu bằng './'
//
// Lưu ý quan trọng:
//   - Phải có "type": "module" trong package.json để Node.js hiểu được cú pháp này
//   - Hoặc đổi đuôi file thành .mjs
//   - Trình duyệt hỗ trợ natively với <script type="module">
// ============================================================


// Import object "data" từ file 9.data.js
// Vì 9.data.js dùng "export default" nên ta không cần dấu {}
// Tên "data" có thể đổi thành bất kỳ tên nào, ví dụ: schoolData, myData, ...
import data from './9.data.js';


// ============================================================
// SO SÁNH: export default vs export named
// ============================================================
// export default (file 9.data.js):          export named (ví dụ tham khảo):
//   export default data;                      export const PI = 3.14;
//                                             export function add(a, b) {...}
//
// import default:                           import named:
//   import data from './9.data.js';           import { PI, add } from './utils.js';
//   import batCuTen from './9.data.js';       // tên phải khớp với tên gốc
// ============================================================


// In toàn bộ object data ra console để kiểm tra dữ liệu đã được import thành công
console.log(data);

// Kết quả mong đợi:
// {
//   students: [ {id:1, name:'Đức', ...}, ... ],
//   course:   [ {id:1, title:'FER202', ...}, ... ],
//   classes:  [ {id:1, name:'SE2014'}, ... ]
// }
