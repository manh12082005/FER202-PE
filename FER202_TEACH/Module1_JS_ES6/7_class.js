// ============================================================
// CLASS (Lớp / Khuôn mẫu đối tượng)
// ============================================================
// Class là một "khuôn mẫu" (blueprint) để tạo ra các đối tượng.
// Hãy tưởng tượng class như một form mẫu nhân viên:
//   → Mọi nhân viên đều có: id, name, salary
//   → Từ khuôn mẫu đó, ta tạo ra từng nhân viên cụ thể bằng từ khóa "new"
// ============================================================

class Employee {
    // constructor() là hàm đặc biệt, tự động chạy khi tạo đối tượng bằng "new".
    // Nhiệm vụ: nhận các giá trị truyền vào và gắn vào đối tượng qua "this".
    // "this" đại diện cho chính đối tượng đang được tạo ra.
    constructor(id, name, salary) {
        this.id = id;         // gán id cho đối tượng
        this.name = name;     // gán tên cho đối tượng
        this.salary = salary; // gán lương cho đối tượng
    }

    // Đây là một method (phương thức) của class.
    // Method là hàm được định nghĩa bên trong class,
    // chỉ gọi được thông qua một đối tượng của class đó.
    printEmployee() {
        console.log(`${this.id}\t${this.name}\t${this.salary}`);
    }
}


// ============================================================
// SỬ DỤNG CLASS: Tạo đối tượng bằng từ khóa "new"
// ============================================================

// Tạo một mảng rỗng để chứa danh sách nhân viên
const employeeList = [];

// Dùng "new Employee(...)" để tạo ra từng đối tượng nhân viên cụ thể.
// Mỗi lần "new" được gọi, constructor() sẽ tự động chạy và trả về 1 đối tượng mới.
const emp1 = new Employee(1, "Tom", 2000);
const emp2 = new Employee(2, "Mary", 4000);
const emp3 = new Employee(3, "David", 2500);

// Thêm lần lượt từng nhân viên vào cuối mảng bằng push()
employeeList.push(emp1);
employeeList.push(emp2);
employeeList.push(emp3);

// Dùng forEach() để duyệt qua từng nhân viên trong danh sách
// và gọi method printEmployee() để in thông tin ra màn hình
employeeList.forEach(emp => emp.printEmployee());
// Output:
// 1    Tom     2000
// 2    Mary    4000
// 3    David   2500
