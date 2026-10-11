// ========================================================
// DEFAULT PARAMETERS (Tham số mặc định) trong JavaScript ES6
// ========================================================
// Default Parameters cho phép đặt giá trị mặc định cho tham số
// của hàm. Nếu người gọi hàm KHÔNG truyền vào giá trị (hoặc
// truyền vào `undefined`), tham số đó sẽ tự động dùng giá trị mặc định.

// --------------------------------------------------------
// 1. FUNCTION DECLARATION với Default Parameters
// --------------------------------------------------------
// Hàm display1 có 2 tham số:
//   - name: mặc định là "Mạnh"
//   - age : mặc định là 19
function display1(name = "Mạnh", age = 19) {
    console.log(`${name} - ${age}`);
}

display1();             // Không truyền tham số → dùng giá trị mặc định → "Mạnh - 19"
display1("Hồng", 18);  // Truyền đủ tham số → ghi đè giá trị mặc định → "Hồng - 18"

// --------------------------------------------------------
// 2. ARROW FUNCTION với Default Parameters
// --------------------------------------------------------
// Arrow function (hàm mũi tên) cũng hỗ trợ Default Parameters.
// printInfo có 2 tham số:
//   - name : mặc định là "Dell Laptop"
//   - price: mặc định là 1000
const printInfo = (name = "Dell Laptop", price = 1000) =>
    console.log(`${name}, ${price}`);

printInfo();                    // Không truyền → dùng mặc định → "Dell Laptop, 1000"
printInfo("SamSung Note", 1200); // Truyền đủ → ghi đè mặc định → "SamSung Note, 1200"


// mảng đối tượng
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