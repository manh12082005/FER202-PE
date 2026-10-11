// ============================================================
// DESTRUCTURING (Phân rã / Trích xuất)
// ============================================================
// Destructuring là cú pháp giúp bạn "mở hộp" một Object hoặc Array,
// lấy ra các giá trị bên trong và gán vào các biến riêng biệt.
//
// Thay vì viết dài dòng:
//   const a = obj.a;
//   const b = obj.b;
// Ta chỉ cần viết gọn:
//   const { a, b } = obj;
// ============================================================


// ============================================================
// PHẦN 1: DESTRUCTURING OBJECT (Phân rã đối tượng)
// ============================================================

const fullName = {
    lastName: "Nguyễn",
    middleName: "Tiến",
    firstName: "Đạt"
};

// Mặc định, tên biến phải trùng với tên thuộc tính trong object.
// Nếu muốn đặt tên ngắn hơn, dùng cú pháp: { tenGoc: tenMoi }
//   Ví dụ: lastName: lName  →  lấy lastName từ object, đặt biến là lName
const { lastName: lName, middleName: midName, firstName: fName } = fullName;
console.log(`Full name: ${fName} ${midName} ${lName}`);
// Output: Full name: Đạt Tiến Nguyễn


// ============================================================
// PHẦN 2: ỨNG DỤNG - DESTRUCTURING TRONG THAM SỐ HÀM
// ============================================================

// Khi object có nhiều thuộc tính nhưng hàm chỉ cần dùng một vài thuộc tính,
// ta dùng destructuring ngay trong phần khai báo tham số của hàm.
// → Lợi ích: code gọn hơn, không cần viết product.id, product.name bên trong hàm.

product = { id: 1, name: "Product 1", quatity: 100, unitsInStock: 200, UnitOnOder: 50 };

// Thay vì nhận cả object rồi dùng product.id, product.name...
// Ta destructure ngay tại tham số: chỉ lấy id, name, quatity là đủ dùng
function showProduct({ id, name, quatity }) {
    console.log(`Product sale: ${id} - ${name} - ${quatity}`);
}
showProduct(product);
// Output: Product sale: 1 - Product 1 - 100


// ============================================================
// PHẦN 3: DESTRUCTURING ARRAY (Phân rã mảng)
// ============================================================

// Destructuring mảng hoạt động theo THỨ TỰ từ trái sang phải.
//   Biến đầu tiên  → phần tử đầu tiên của mảng
//   Biến thứ hai   → phần tử thứ hai của mảng
//   ...
// Nếu không cần phần tử nào, chừa chỗ trống bằng dấu phẩy: const [a, , c] = arr;

const customerInfo = [1, "Tom", true, "2000/06/28"];

// Lấy 3 phần tử đầu tiên: cId=1, cName="Tom", gender=true
// Phần tử thứ 4 ("2000/06/28") bị bỏ qua vì ta không khai báo biến cho nó
const [cId, cName, gender] = customerInfo;
console.log(`Customers: ${cId}, ${cName}, ${gender == true ? "Male" : "Female"}`);
// Output: Customers: 1, Tom, Male


// ============================================================
// PHẦN 4: BÀI TẬP TỔNG HỢP
// Kết hợp destructuring object + array + hàm tìm kiếm
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

// Dùng destructuring để tách 3 mảng con ra khỏi object data
const { students, course, classes } = data;


// Hàm tìm tên môn học (title) dựa vào id của course
// Nếu không tìm thấy → trả về "No Course"
function getTitileById(id) {
    const courseResult = course?.find(c => c.id == id);
    if (courseResult == undefined)
        return "No Course";
    return courseResult.title;
}

// Hàm tìm tên lớp (name) dựa vào id của class
// Nếu không tìm thấy → trả về "No Class"
function getClassNameById(id) {
    const resultClass = classes?.find(c => c.id == id);
    if (resultClass == undefined)
        return "No Class";
    return resultClass.name;
}

// Hàm hiển thị danh sách sinh viên
// Dùng destructuring ngay trong vòng lặp để lấy từng thuộc tính của student.
// Lưu ý: "course" và "class" trùng tên với biến ngoài → đổi tên thành courseId, classId
function showStudentList(studentData) {
    console.log("List of students: ");
    studentData?.map(student => {
        const { id, name, course: courseId, class: classId } = student;
        console.log(`${id}\t   ${name}\t  ${getTitileById(courseId)}\t  ${getClassNameById(classId)}`);
    });
}
showStudentList(students);
