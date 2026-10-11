# 🎨 BÁCH KHOA TOÀN THƯ REACT BOOTSTRAP (CHUẨN TÀI LIỆU GỐC)

Tài liệu này được biên soạn siêu chi tiết theo đúng từng cấu trúc thư mục của trang chủ Bootstrap, được chuyển đổi sang cú pháp `react-bootstrap` để anh bê thẳng vào bài thi Thực Hành (PE).

*(Lưu ý chung: Ở tất cả các file có dùng, phải đảm bảo đã `import 'bootstrap/dist/css/bootstrap.min.css';` ở file `App.js` hoặc `index.js`)*

---

## I. TÍNH TOÁN TRÊN MẢNG (ARRAY METHODS HAY GẶP TRONG ĐỀ THI)

### 1. Tính Average (Trung bình) của mảng Rate ⭐

**Toán học:** `average = tổng tất cả rate ÷ số phần tử`

```javascript
const list = [
    { id: 1, title: "Avengers", rate: 8 },
    { id: 2, title: "Batman",   rate: 6 },
    { id: 3, title: "Spider",   rate: 9 },
];
```

**👉 CÔNG THỨC GỐC (Nhớ 1 dòng này là đủ):**
```javascript
const avg = list.reduce((sum, item) => sum + item.rate, 0) / list.length;
// Giải thích: reduce cộng dồn từng item.rate bắt đầu từ 0, rồi chia list.length
// Kết quả: (8 + 6 + 9) / 3 = 7.67
```

**👉 Làm tròn 1-2 chữ số thập phân:**
```javascript
const avg = (list.reduce((sum, item) => sum + item.rate, 0) / list.length).toFixed(1); // "7.7"
const avg = (list.reduce((sum, item) => sum + item.rate, 0) / list.length).toFixed(2); // "7.67"
```

**👉 Tránh lỗi chia cho 0 khi mảng rỗng (Quan trọng khi đi thi):**
```javascript
const avg = list.length > 0
    ? (list.reduce((sum, item) => sum + item.rate, 0) / list.length).toFixed(1)
    : 0;
```

**👉 Dùng trong Component React (Hiển thị lên màn hình):**
```javascript
const MovieStats = ({ listMovie }) => {
    const avgRate = listMovie?.length > 0
        ? (listMovie.reduce((sum, item) => sum + item.rate, 0) / listMovie.length).toFixed(1)
        : 0;

    return (
        <div>
            <h4>⭐ Điểm TB: <strong style={{ color: '#f0ad4e' }}>{avgRate}</strong> / 10</h4>
        </div>
    );
};
```

**👉 Lọc trước rồi mới tính Average (Hay ra trong đề thi):**
```javascript
// Tính avg CHỈ của phim có rate >= 7
const phimTot    = listMovie.filter(item => item.rate >= 7);
const avgPhimTot = phimTot.reduce((sum, item) => sum + item.rate, 0) / phimTot.length;
```

#### 📊 BẢNG TÓM TẮT ARRAY METHODS HAY DÙNG ĐI THI

| Mục tiêu | Code | Kết quả |
|---|---|---|
| **Tổng** tất cả rate | `list.reduce((sum, i) => sum + i.rate, 0)` | Số tổng |
| **Trung bình** rate | `list.reduce(...) / list.length` | Số thập phân |
| **Lọc** rate >= 7 | `list.filter(i => i.rate >= 7)` | Mảng mới |
| **Max** rate | `Math.max(...list.map(i => i.rate))` | Giá trị lớn nhất |
| **Min** rate | `Math.min(...list.map(i => i.rate))` | Giá trị nhỏ nhất |
| **Đếm** phim rate cao | `list.filter(i => i.rate >= 8).length` | Số đếm |
| **Sắp xếp** rate giảm dần | `[...list].sort((a, b) => b.rate - a.rate)` | Mảng đã sắp xếp |
| **Sắp xếp** rate tăng dần | `[...list].sort((a, b) => a.rate - b.rate)` | Mảng đã sắp xếp |

---

## II. CÁC HÀM LÀM TRÒN SỐ VÀ XỬ LÝ CHUỖI (MATH & STRING)
Trong các đề thi, đặc biệt là khi tính Giá tiền (Price) hoặc Giảm giá (Discount), bạn sẽ phải đối mặt với các số thập phân dài ngoằng. Dưới đây là bộ bí kíp làm tròn số "chuẩn không cần chỉnh".

### 2. Làm tròn số (Math Object & toFixed)

**👉 `Math.round()` - Làm tròn gần nhất (Từ 0.5 thì lên, dưới 0.5 thì xuống)**
- **Ví dụ:** `Math.round(4.5)` ➔ `5` | `Math.round(4.4)` ➔ `4`
- **Ứng dụng:** Thường dùng để tính giá mới sau khi giảm giá (Discount).
```javascript
const oldPrice = 100;
const discount = 15; // 15%
const newPrice = Math.round(oldPrice - (oldPrice * discount / 100)); // Ra 85
```

**👉 `Math.floor()` - Làm tròn XUỐNG (Cắt bỏ phần thập phân)**
- **Ví dụ:** `Math.floor(4.99)` ➔ `4` | `Math.floor(4.1)` ➔ `4`
- **Ứng dụng:** Thường dùng khi phân trang (Pagination) tính số trang hoặc khi yêu cầu đề bài bắt buộc lấy phần nguyên thấp hơn.

**👉 `Math.ceil()` - Làm tròn LÊN**
- **Ví dụ:** `Math.ceil(4.01)` ➔ `5`
- **Ứng dụng:** Dùng để tính tổng số trang (Ví dụ: Có 21 sản phẩm, mỗi trang 10 sản phẩm ➔ `Math.ceil(21/10) = 3` trang).
```javascript
const totalItems = 25;
const itemsPerPage = 10;
const totalPages = Math.ceil(totalItems / itemsPerPage); // Ra 3 trang
```

**👉 `.toFixed(n)` - Giữ lại `n` chữ số thập phân (Kết quả trả về là STRING)**
- **Ví dụ:** `(4.5678).toFixed(2)` ➔ `"4.57"`
- **Ứng dụng:** Dùng khi tính điểm trung bình (Rating), hoặc tổng tiền giỏ hàng cần giữ lại 2 số thập phân.
```javascript
const total = list.reduce((sum, item) => sum + item.price, 0).toFixed(2);
// Nhớ cẩn thận: toFixed() trả về chuỗi String. Đừng mang đi cộng trừ tiếp trừ khi ép kiểu Number() lại!
```

### 3. Định dạng Tiền tệ (toLocaleString)
Hiển thị tiền tệ có dấu phẩy/chấm ngắt nghìn (Ví dụ: 10,000,000) thay vì một dải số dính liền.

```javascript
const price = 1500000;
// Định dạng kiểu Việt Nam: 1.500.000
const formatVN = price.toLocaleString("vi-VN"); 

// Định dạng kiểu Mỹ: 1,500,000
const formatUS = price.toLocaleString("en-US");
```
## III. TỔNG HỢP KIẾN THỨC CƠ BẢN BOOTSTRAP

- Bootstrap
    - **Đầu tiên boostrap là gì ?**
        - **Bootstrap** là 1 **framework của css và js**.
        - Hay nói cách khác nó là những đoạn code được viết sẵn giúp chúng ta chỉ việc sử dụng.
    - **Nhúng BST** vào thì chỉ việc sử dụng không cần code bên CSS (vì bản chất BST nó đã code cho rồi lôi ra mà dùng cho tiện).
    
    ***)DỰNG LAYOUT VÀ GRID**
    
    - **1.Khối container trong BST**
        - Khối **container** trong BST t thì nó cũng như là khối container ta định nghĩa. Nhưng khi ta nhúng BST vào r thì ta chỉ cần gọi nó ra.
        - **container** và **container-fluid:** Hai cái này khác nhau
            - container sẽ có các mức
            
            - **container-fluid** nó luôn chiếm **100% nhưng các nội dung bên trong có padding left và right 15px.**
    - **2.Grid trong BST**
        - Class **row** là class có **display flex** tương tự ta đã học.
        - Nó chia màn của ta thành 12 cột và khi đủ 12 cột thì nó sẽ xuống dòng(bởi bản chất nó cũng chỉ là 1 class nó có hai thuộc tính là **display flex và flex-wrap**)
        - Trong ảnh dưới **col-1 nghĩa là nó chiếm 1 trên 12** phần thì nếu ta thay **1 thành x thì nó chiếm x phần trên 12 phần.**
        - Và nó cũng có các thuộc tính reponsive sẵn
            - Lớn hơn 1200px: **.col-xl-x**
            - Lớn hơn 992px: **.col-lg-x**
            - Lớn hơn 720px: **.col-md-x**
            - Lớn hơn 576px: **.col-sm-x**
        
        ⇒ Còn không thì **col-x** thì sẽ luôn luôn giữ đúng x phần khi thay đổi kích thước
        
    - 3.  Các thẻ Form trong React Bootstrap
        
        ## 1. `Form` (thẻ bao form)
        
        ```jsx
        <Form onSubmit={handleSubmit}>
          {/* Các form control */}
        </Form>
        ```
        
        ---
        
        ## 🧾 2. `Form.Group` (nhóm một trường gồm label + input)
        
        ```jsx
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        ```
        
        ---
        
        ## ✍️ 3. `Form.Control` (input, textarea...)
        
        - Input:
            
            ```jsx
            <Form.Control type="text" placeholder="Your name" />
            ```
            
        - Password:
            
            ```jsx
            <Form.Control type="password" placeholder="Password" />
            ```
            
        - Textarea:
            
            ```jsx
            <Form.Control as="textarea" rows={3} />
            ```
            
        
        ---
        
        ## 🔽 4. `Form.Select` (dropdown)
        
        ```jsx
        <Form.Select aria-label="Chọn danh mục">
          <option>Chọn...</option>
          <option value="1">Điện thoại</option>
          <option value="2">Laptop</option>
        </Form.Select>
        ```
        
        ---
        
        ## ✅ 5. `Form.Check` (checkbox / radio)
        
        - Checkbox:
            
            ```jsx
            <Form.Check type="checkbox" label="Ghi nhớ đăng nhập" />
            ```
            
        - Radio:
            
            ```jsx
            <Form.Check
              type="radio"
              label="Nam"
              name="gender"
              value="male"
              id="male"
            />
            ```

---

## IV. BỐ CỤC (LAYOUT)

### 4. Container & Grid system & Columns
Hệ thống chia màn hình thành 12 cột. `<Container>` bọc ngoài cùng để gom nội dung lại.

**💡 BẢNG TỪ ĐIỂN CÁC KÍCH THƯỚC MÀN HÌNH (BREAKPOINTS):**
Khi đi thi, giảng viên rất hay yêu cầu web phải co giãn (Responsive) trên cả Điện thoại và Máy tính. Hãy thuộc nằm lòng các định lý này:
- **`xs` (Extra small)**: Điện thoại di động (<576px). Thường viết `xs={12}` để ép 1 thẻ chiếm trọn nguyên 1 dòng trên điện thoại.
- **`sm` (Small)**: Điện thoại cầm nằm ngang (≥576px).
- **`md` (Medium)**: Màn hình Máy tính bảng / iPad (≥768px). Bắt đầu từ màn hình này người ta mới chia cột ra. Thường xài `md={6}` (chia đôi màn hình) hoặc `md={8}` và `md={4}`.
- **`lg` (Large)**: Màn hình Máy tính bàn / Laptop (≥992px).
- **`xl` / `xxl`**: Màn hình rạp chiếu phim (Siêu to khổng lồ).

```javascript
import { Container, Row, Col } from 'react-bootstrap';

export const LayoutExample = () => (
    <Container fluid="md"> {/* fluid="md": Mở rộng full màn hình trừ khi ở màn hình md (máy tính) trở lên */}
        <Row className="mb-3">
            {/* Cột chiếm 8/12 phần ở màn hình to, và full 12 phần ở Mobile */}
            <Col xs={12} md={8} className="bg-primary text-white p-3">
                Khu vực Danh sách
            </Col>
            <Col xs={6} md={4} className="bg-secondary text-white p-3">
                Khu vực Form
            </Col>
        </Row>
    </Container>
)
```

---

## V. NỘI DUNG (CONTENT)

### 5. Images (Hình ảnh)
Biến hình ảnh thô kệch thành ảnh đẹp tự co giãn, hình tròn, hoặc có viền.
```javascript
import { Image } from 'react-bootstrap';

export const ImageExample = () => (
    <>
        <Image src="https://via.placeholder.com/150" fluid alt="Hình ảnh tự co giãn (Không bị tràn mành hình)" />
        <Image src="https://via.placeholder.com/150" roundedCircle alt="Hình bo tròn xoe" />
        <Image src="https://via.placeholder.com/150" thumbnail alt="Hình có viền xám giống avatar" />
    </>
)
```

### 6. Tables (Bảng dữ liệu)
```javascript
import { Table } from 'react-bootstrap';

export const TableExample = () => (
    <>
    {/* striped: Kẻ sọc | bordered: Có viền | hover: Sáng lên khi trỏ chuột | responsive: Cuộn ngang trên điện thoại */}
    <Table striped bordered hover responsive variant="light">
        <thead className="table-white">
            <tr>
                <th>#</th>
                <th>Tên SP</th>
                <th>Giá</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Laptop Dell</td>
                <td>$1000</td>
            </tr>
        </tbody>
    </Table>
    </>
)
```

---

## VI. BIỂU MẪU (FORMS)

### 7. Forms & Form Controls (`<input>` và `<textarea>`)
Nâng cấp thẻ `<input>` xấu xí của HTML thành ô nhập liệu sang xịn mịn.
```javascript
import { Form } from 'react-bootstrap';

export const FormControlExample = () => (
    <Form>
        {/* Input Text cơ bản */}
        <Form.Group className="mb-3">
            <Form.Label>Địa chỉ Email</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" size="lg" />
            <Form.Text className="text-muted">Chúng tôi cam kết bảo mật email của bạn.</Form.Text>
        </Form.Group>

        {/* Textarea (Ô nhập liệu to nhiều dòng) */}
        <Form.Group className="mb-3">
            <Form.Label>Nội dung chi tiết</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Ghi chú thêm..." />
        </Form.Group>
    </Form>
)
```

### 8. Select (Hộp thả xuống)
Tùy biến thẻ `<select>` mặc định.
```javascript
import { Form } from 'react-bootstrap';

export const SelectExample = () => (
    <Form.Select aria-label="Lựa chọn danh mục" size="sm">
        <option>Mở danh sách lựa chọn</option>
        <option value="1">Lựa chọn Một</option>
        <option value="2">Lựa chọn Hai</option>
    </Form.Select>
)
```

### 9. Checks and Radios (Hộp kiểm & Nút Radio)
```javascript
import { Form } from 'react-bootstrap';

export const CheckRadioExample = () => (
    <Form>
        {/* Checkbox (Có thể chọn nhiều cái cùng lúc) */}
        <Form.Check type="checkbox" id="check-1" label="Nhớ mật khẩu" />
        <Form.Check type="checkbox" id="check-2" label="Đăng ký nhận tin" defaultChecked />

        {/* Radio (Chỉ chọn được 1 trong 1 nhóm dùng chung thuộc tính 'name') */}
        <Form.Check type="radio" id="radio-1" name="gender" label="Nam" />
        <Form.Check type="radio" id="radio-2" name="gender" label="Nữ" />
        
        {/* Dạng Switch công tắc (Nhìn cực ngầu) */}
        <Form.Check type="switch" id="switch-1" label="Chế độ Dark Mode" />
    </Form>
)
```

#### 🔥 LỌC DANH SÁCH BẰNG RADIO BUTTON (Hay ra trong đề thi!)
Bấm Radio → lọc mảng → hiển thị lại danh sách đúng loại.

**Luồng hoạt động:**
```
Bấm Radio → onChange chạy → setFilter(value) → React re-render → filter() lọc mảng → hiển thị kết quả
```

```javascript
import { useState } from 'react';
import { Form, Card, Button, Row, Col } from 'react-bootstrap';

// ── BƯỚC 1: Chuẩn bị dữ liệu mẫu (thực tế thay bằng data từ API) ──
const danhSachSP = [
    { id: 1, name: 'iPhone 15',    loai: 'dienthoai', gia: 25000000 },
    { id: 2, name: 'Samsung S24',  loai: 'dienthoai', gia: 22000000 },
    { id: 3, name: 'MacBook Air',  loai: 'laptop',    gia: 32000000 },
    { id: 4, name: 'Dell XPS 13',  loai: 'laptop',    gia: 28000000 },
    { id: 5, name: 'iPad Pro',     loai: 'tablet',    gia: 20000000 },
];

export const LocBangRadio = () => {
    // ── BƯỚC 2: State lưu giá trị Radio đang được chọn ──
    // Giá trị ban đầu là 'all' → hiện tất cả
    const [filter, setFilter] = useState('all');

    // ── BƯỚC 3: Lọc mảng dựa theo filter đang chọn ──
    // Nếu filter = 'all' → trả về toàn bộ mảng gốc
    // Nếu filter = 'laptop' → chỉ lấy sp có loai === 'laptop'
    const danhSachDaLoc = filter === 'all'
        ? danhSachSP
        : danhSachSP.filter(sp => sp.loai === filter);

    return (
        <div>
            {/* ── BƯỚC 4: Vẽ các nút Radio để chọn bộ lọc ── */}
            <Form className="mb-3 d-flex gap-3">
                {/* value="all" → hiện tất cả */}
                <Form.Check
                    type="radio"
                    id="filter-all"
                    name="boLoc"              // QUAN TRỌNG: cùng name mới là 1 nhóm radio
                    label="Tất cả"
                    value="all"
                    defaultChecked            // Mặc định chọn cái này lúc đầu
                    onChange={e => setFilter(e.target.value)}  // Cập nhật state khi bấm
                />
                <Form.Check
                    type="radio"
                    id="filter-dienthoai"
                    name="boLoc"
                    label="Điện thoại"
                    value="dienthoai"
                    onChange={e => setFilter(e.target.value)}
                />
                <Form.Check
                    type="radio"
                    id="filter-laptop"
                    name="boLoc"
                    label="Laptop"
                    value="laptop"
                    onChange={e => setFilter(e.target.value)}
                />
                <Form.Check
                    type="radio"
                    id="filter-tablet"
                    name="boLoc"
                    label="Tablet"
                    value="tablet"
                    onChange={e => setFilter(e.target.value)}
                />
            </Form>

            {/* ── BƯỚC 5: Render danh sách đã lọc ra Card ── */}
            <Row>
                {danhSachDaLoc.map(sp => (
                    <Col key={sp.id} md={4} className="mb-3">
                        <Card className="shadow-sm h-100">
                            <Card.Body>
                                <Card.Title>{sp.name}</Card.Title>
                                <Card.Text>{sp.gia.toLocaleString('vi-VN')} đ</Card.Text>
                                <Button variant="primary" className="w-100">Mua ngay</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* ── BƯỚC 6 (Tùy chọn): Hiện số lượng kết quả ── */}
            <p className="text-muted">Tìm thấy <strong>{danhSachDaLoc.length}</strong> sản phẩm</p>
        </div>
    );
}
```

**💡 Tips quan trọng khi dùng Radio lọc:**

| Điểm cần nhớ | Giải thích |
|---|---|
| `name="boLoc"` phải giống nhau | Các radio cùng `name` mới thành 1 nhóm — chỉ chọn được 1 cái |
| `value` của radio = giá trị để so sánh | `value="laptop"` → filter sẽ bằng `"laptop"` → lọc ra `loai === 'laptop'` |
| `onChange={e => setFilter(e.target.value)}` | Lệnh bắt sự kiện bấm — **mỗi radio phải có dòng này** |
| `defaultChecked` | Đánh dấu radio nào được chọn sẵn lúc mới mở trang |
| Lọc với API | Thay `danhSachSP` bằng state từ `useState` sau khi gọi `axios.get()` |

### 10. Range (Thanh trượt)
```javascript
import { Form } from 'react-bootstrap';

export const RangeExample = () => (
    <Form>
        <Form.Label>Chỉnh mức độ:</Form.Label>
        <Form.Range min="0" max="100" step="10" />
    </Form>
)
```

### 11. Input Group (Nhóm Input)
Gắn icon hoặc chữ cố định vào đầu/cuối của ô nhập liệu.
```javascript
import { InputGroup, Form, Button } from 'react-bootstrap';

export const InputGroupExample = () => (
    <>
        {/* Gắn chữ @ ở đầu ô nhập Username */}
        <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <Form.Control placeholder="Username" />
        </InputGroup>

        {/* Khung tìm kiếm có gắn nút Tìm ở cuối */}
        <InputGroup className="mb-3">
            <Form.Control placeholder="Tìm kiếm phim..." />
            <Button variant="outline-secondary">Tìm Ngay</Button>
        </InputGroup>
    </>
)
```

### 12. Floating Labels (Nhãn trôi)
Hiệu ứng cực kì xịn xò: Chữ Label nằm chìm ở dưới, khi click chuột vào thì chữ bay lên trên nhỏ lại.
```javascript
import { FloatingLabel, Form } from 'react-bootstrap';

export const FloatingLabelExample = () => (
    <FloatingLabel controlId="floatingInput" label="Tài khoản Email" className="mb-3">
        <Form.Control type="email" placeholder="name@example.com" />
    </FloatingLabel>
)
```

### 13. XỬ LÝ SỰ KIỆN THƯỜNG GẶP (onChange, onSubmit, onClick)
Để lấy được dữ liệu từ đống Form xịn xò ở trên, bạn bắt buộc phải xài 3 loại sự kiện kinh điển này.

**A. `onChange` (Bắt sự kiện gõ phím)**
Dùng để "tóm" nội dung người dùng đang gõ vào ô input NGAY TẠI TRẬN.
```javascript
import { Form } from 'react-bootstrap';
import { useState } from 'react';

export const OnChangeExample = () => {
    const [name, setName] = useState("");

    // Hàm này sẽ tự động được gọi mỗi khi bạn gõ lạch cạch thêm 1 ký tự
    const xuLyGoPhim = (e) => {
        const giaTriDaGo = e.target.value; // Lệnh bùa ngải để moi giá trị ra
        setName(giaTriDaGo); // Cất vào state
    }

    return (
        <Form>
            <Form.Group>
                <Form.Label>Tên của bạn là: <strong className="text-danger">{name}</strong></Form.Label>
                <Form.Control type="text" onChange={xuLyGoPhim} placeholder="Gõ gì đó đi..." />
            </Form.Group>
        </Form>
    )
}
```

**B. `onSubmit` (Bắt sự kiện bấm nút Xác Nhận Form)**
🛑 LƯU Ý TỐI QUAN TRỌNG: Lệnh này luôn luôn đặt ở thẻ `<Form>`, KHÔNG BAO GIỜ đặt ở thẻ `<Button>`.
```javascript
import { Form, Button } from 'react-bootstrap';

export const OnSubmitExample = () => {
    const guiDuLieu = (e) => {
        // 🛑 Lệnh siêu quan trọng số 1: 
        // Chặn Form tự động tải lại toàn bộ trang web (Nếu quên lệnh này, dữ liệu sẽ bốc hơi sạch)
        e.preventDefault(); 
        
        // Lệnh siêu quan trọng số 2:
        // Lấy dữ liệu tốc độ ánh sáng mà không cần dùng useState:
        const email = e.target.txtEmail.value; // Phải có name="txtEmail" ở thẻ input
        alert("Đã nhận được email: " + email);
    }

    return (
        // Đặt onSubmit chễm chệ ngay tại thẻ Form này
        <Form onSubmit={guiDuLieu}>
            <Form.Group className="mb-3">
                <Form.Label>Email liên hệ</Form.Label>
                {/* Bí kíp: Đặt thuộc tính name="txtEmail" để trên hàm lấy được giá trị */}
                <Form.Control name="txtEmail" type="email" /> 
            </Form.Group>
            {/* Thuộc tính type="submit" sẽ tự động nổ súng kích hoạt cái onSubmit của thằng Form */}
            <Button type="submit" variant="success">Gửi Đi Ngay</Button>
        </Form>
    )
}
```

**C. `onClick` (Bắt sự kiện Bấm Chuột)**
Thường gắn vào các Nút (Button) đứng bơ vơ không nằm trong Form (như nút Xóa, nút Sửa, nút Thêm Giỏ Hàng).
```javascript
import { Button } from 'react-bootstrap';

export const OnClickExample = () => {
    // 1. Trường hợp 1: Hàm không cần tham số (Bấm là chạy)
    const bamBinhThuong = () => alert("Bạn vừa bấm tớ!");

    // 2. Trường hợp 2: Hàm CẦN truyền tham số (như truyền ID của sản phẩm để đem đi xóa)
    const xoaSanPham = (id) => alert("Chuẩn bị xóa sản phẩm số " + id);

    return (
        <div>
            {/* Gọi hàm KHÔNG THAM SỐ: Chỉ ghi tên hàm, KHÔNG CÓ ngoặc tròn () */}
            <Button variant="info" className="me-3" onClick={bamBinhThuong}>
                Bấm tớ đi
            </Button>

            {/* 🛑 Gọi hàm CÓ THAM SỐ: Bắt buộc phải dùng ()=> bọc lại. 
                 Nếu anh ghi chữ onClick={xoaSanPham(99)} thì trang web vừa bật lên nó tự xóa cmnl mà chả cần anh bấm! */}
            <Button variant="danger" onClick={() => xoaSanPham(99)}>
                Xóa Sản Phẩm số 99
            </Button>
        </div>
    )
}
```

---

## VII. CÁC THÀNH PHẦN (COMPONENTS)

### 14. Badge (Nhãn dán / Tem / Cục màu thông báo)
Dùng để làm các thẻ tag phân loại (Ví dụ: Thể loại phim, trạng thái Active/Inactive, nhãn Discount, đếm số lượng giỏ hàng...). Rất hay gặp khi hiển thị Master-Detail hoặc Card.

**Import:** `import { Badge } from 'react-bootstrap';`

**Các loại Badge (Dựa theo thuộc tính `bg` - background):**
- `<Badge bg="primary">`: Màu xanh dương
- `<Badge bg="secondary">`: Màu xám
- `<Badge bg="success">`: Màu xanh lá (Thường dùng cho "Active", "In Stock")
- `<Badge bg="danger">`: Màu đỏ (Thường dùng cho "Out of stock", "Error", "Hot", "Discount")
- `<Badge bg="warning" text="dark">`: Màu vàng chữ đen (Thường dùng cho "Pending", "Rating")
- `<Badge bg="info">`: Màu xanh lơ

**Ví dụ 1: Đính Badge vào trong Card để thể hiện Trạng thái (Status)**
```javascript
<Card>
    <Card.Body>
        <Card.Title>
            Iphone 15 Pro Max 
            {/* Nếu còn hàng thì hiện tem Xanh, hết hàng hiện tem Đỏ */}
            {product.stock > 0 
                ? <Badge bg="success" className="ms-2">In Stock ({product.stock})</Badge> 
                : <Badge bg="danger" className="ms-2">Out of Stock</Badge>
            }
        </Card.Title>
    </Card.Body>
</Card>
```

**Ví dụ 2: Dùng Badge để map ra danh sách Tags (Đề PE Trial)**
```javascript
<div>
    <strong>Tags: </strong>
    {/* Biến chuỗi tags "Salsa;Mexican" thành mảng và render từng cục Badge */}
    {recipe.tags.split(";").map((tag, index) => (
        <Badge key={index} bg="secondary" className="me-1">
            {tag.trim()}
        </Badge>
    ))}
</div>
```

**Ví dụ 3: Đính cục Badge Đỏ lên góc phải Button (Giống giỏ hàng Shopee)**
```javascript
<Button variant="primary">
    Giỏ hàng của bạn <Badge bg="danger">{listOrder.length}</Badge>
    <span className="visually-hidden">sản phẩm chưa đọc</span>
</Button>
```


### 15. Alerts (Hộp thông báo lớn)
Thay thế cho thẻ `alert()` popup của trình duyệt.
```javascript
import { Alert } from 'react-bootstrap';

export const AlertExample = () => (
    <>
        <Alert variant="success">🎉 Lưu dữ liệu thành công!</Alert>
        <Alert variant="danger" dismissible> {/* dismissible: Hiện ra dấu X ở góc để tự tắt */}
            <Alert.Heading>Lỗi hệ thống!</Alert.Heading>
            <p>Không thể kết nối đến server. Vui lòng thử lại sau vài giây.</p>
        </Alert>
    </>
)
```

### 16. Buttons (Nút bấm)
Thuộc tính `variant` quy định màu sắc và kiểu dáng của nút:
- **Màu nền (Solid):** `primary` (Xanh dương), `secondary` (Xám), `success` (Xanh lá), `danger` (Đỏ), `warning` (Vàng), `info` (Xanh lơ), `light` (Sáng), `dark` (Tối), `link` (Link).
- **Màu viền (Outline - di chuột vào mới đổi màu nền):** Thêm chữ `outline-` phía trước (Ví dụ: `outline-primary`, `outline-danger`...).

```javascript
import { Button } from 'react-bootstrap';

export const ButtonExample = () => (
    <>
        {/* Nút màu xanh dương, bự */}
        <Button variant="primary" size="lg">Lưu lại</Button>
        
        {/* Nút viền đỏ, hover vô mới thành nền đỏ */}
        <Button variant="outline-danger">Xóa bài</Button> 
        
        {/* Nút bị vô hiệu hóa (không bấm được) */}
        <Button variant="success" disabled>Đang xử lý...</Button> 
    </>
)
```

### 17. Cards (Thẻ nội dung)
Cực kì hay dùng để hiển thị 1 món hàng trong Danh sách Sản phẩm (Gồm Hình + Tên + Mô tả + Nút).
```javascript
import { Card, Button } from 'react-bootstrap';

export const CardExample = () => (
    <Card style={{ width: '18rem' }} className="shadow-sm">
        <Card.Img variant="top" src="https://via.placeholder.com/300x200" />
        <Card.Body>
            <Card.Title>Điện thoại iPhone 15</Card.Title>
            <Card.Text>
                Hàng chính hãng VN/A, bảo hành 12 tháng.
            </Card.Text>
            <Button variant="primary" className="w-100">Mua ngay</Button>
        </Card.Body>
    </Card>
)
```

#### 🔥 Card GỌI API — Hiển thị danh sách từ server (dùng `axios`)
Thay vì viết cứng nội dung, ta gọi API bằng `axios` rồi dùng `.map()` để render tự động từng Card.

> **Cài đặt trước:** `npm install axios`

**Luồng hoạt động:**
```
Component mount → useEffect chạy → axios.get() → .then(res) → setProducts(res.data) → React re-render → .map() → hiển thị Card
```

```javascript
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Spinner } from 'react-bootstrap';

export const ProductList = () => {
    const [products, setProducts] = useState([]);   // Luôn khởi tạo mảng rỗng []
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://your-api.com/products')  // Thay URL thật vào đây
            .then(res => {
                setProducts(res.data);              // axios tự parse JSON → lấy qua res.data
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []); // [] = chỉ chạy 1 lần khi component vừa mount

    if (loading) return <Spinner animation="border" />;

    return (
              <Col md={10} style={{ paddingRight: "100px" }}>
                        <Row>
                            {products.map((product) => (
                                <Col
                                    key={product.id}
                                    md={3}
                                    sm={6}
                                    xs={12}
                                    className="mb-4"
                                >
                                    <Card className="shadow-sm h-100">
                                        <div
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                            }}
                                        >
                                            <Card.Img
                                                variant="top"
                                                src={`./images/${product.image}`}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "contain"
                                                }}
                                            />
                                        </div>

                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title className="text-center">
                                                {product.title}
                                            </Card.Title>

                                            <Card.Text>
                                                <Card.Text style={{ margin: "20px 5px" }}>
                                                    Brand:{" "}
                                                    <strong>
                                                        {product.brandName}
                                                    </strong>
                                                    <br />

                                                    Category:{" "}
                                                    <strong>
                                                        {product.categoryName}
                                                    </strong>
                                                </Card.Text>
                                                <div style={{ display: "grid", justifyContent: "center" }}>
                                                    <p
                                                        style={{
                                                            color: "blue",
                                                            textDecoration:
                                                                "line-through"
                                                        }}
                                                    >
                                                        Price: ${product.price}
                                                    </p>
                                                    <p
                                                        style={{
                                                            color: "red",

                                                        }}
                                                    >
                                                        Discount: {product.discountPercentage}%
                                                    </p>
                                                    <p
                                                        style={{
                                                            color: "blue",

                                                        }}
                                                    >
                                                        New price: ${product.newPrice}
                                                    </p>


                                                </div>


                                            </Card.Text>
                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                                <Button style={{ backgroundColor: "green", color: "white", border: "none", width: "30%" }}>

                                                    View Details
                                                </Button>
                                            </div>


                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
    )
```

**💡 Tips hay gặp:**

| Vấn đề | Giải pháp |
|---|---|
| API trả về `{ data: [...] }` lồng bên trong | Dùng `res.data.data` thay vì `res.data` |
| Ảnh bị lỗi 404 | Thêm `onError={e => e.target.src = 'placeholder.png'}` vào `<Card.Img>` |
| Mảng rỗng lúc đầu gây lỗi `.map` | Luôn khởi tạo `useState([])` — **KHÔNG** để `useState(null)` |
| Card cao thấp không đều nhau | Thêm `h-100` vào `<Card>` và `d-flex flex-column` vào `<Row>` |

### 18. Dropdowns (Nút thả menu)
```javascript
import { Dropdown } from 'react-bootstrap';

export const DropdownExample = () => (
    <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
            Tùy chọn Mở rộng
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Xóa SP</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Sửa SP</Dropdown.Item>
            <Dropdown.Divider /> {/* Dòng kẻ ngang phân cách */}
            <Dropdown.Item href="#/action-3">Hủy bỏ</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
)
```

### 19. Navbar (Thanh điều hướng đỉnh đầu)
```javascript
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

export const NavbarExample = () => (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand href="#home">Logo App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Trang chủ</Nav.Link>
                    <Nav.Link href="#link">Liên hệ</Nav.Link>
                    <NavDropdown title="Danh mục Hàng" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Đồ điện tử</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Thời trang</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
)
```

### 20. Accordion (Danh sách sổ xuống)
Hay dùng để làm phần Câu hỏi thường gặp (FAQ), bấm vào tiêu đề thì nó mở rộng nội dung bên dưới ra.
```javascript
import { Accordion } from 'react-bootstrap';

export const AccordionExample = () => (
    // defaultActiveKey="0" nghĩa là mặc định sẽ mở sẵn cái đầu tiên (eventKey="0")
    <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
            <Accordion.Header>Câu hỏi 1: React Bootstrap là gì?</Accordion.Header>
            <Accordion.Body>
                Nó là thư viện giúp chúng ta viết code Bootstrap bằng các Component của React.
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
            <Accordion.Header>Câu hỏi 2: Có bắt buộc phải dùng không?</Accordion.Header>
            <Accordion.Body>
                Thường thì làm bài thi PE bắt buộc dùng, vì nó giúp làm web nhanh và chuẩn form responsive.
            </Accordion.Body>
        </Accordion.Item>
    </Accordion>
)
```

### 21. Danh sách truyền thống (ul li)
Nếu bạn không muốn dùng Component của Bootstrap mà chỉ muốn dùng thẻ HTML bình thường:
```javascript
export const BasicListExample = () => (
    <ul>
        <li>Mục số 1</li>
        <li>Mục số 2</li>
        <li>Mục số 3</li>
    </ul>
)
```

### 22. Typography (Các thẻ định dạng chữ HTML)
Đi thi chắc chắn bạn sẽ cần dùng các thẻ HTML cơ bản này để nhấn nhá chữ nghĩa:
- `<p>...</p>`: Đoạn văn bản (Paragraph). Tự động xuống dòng và có khoảng cách trên dưới.
- `<strong>...</strong>` hoặc `<b>...</b>`: **In đậm** chữ.
- `<em>...</em>` hoặc `<i>...</i>`: *In nghiêng* chữ.
- `<u>...</u>`: <u>Gạch chân</u> chữ.
- `<mark>...</mark>`: <mark>Bôi vàng</mark> (highlight) chữ.
- `<del>...</del>`: ~~Gạch ngang chữ~~ (hay dùng để làm giá tiền cũ).
- `<span>...</span>`: Chỉ gom một vài chữ lại để tô màu/đổi font riêng (không bị xuống dòng như thẻ `<p>`).
- `<h1>` đến `<h6>`: Tiêu đề từ bự chà bá (`h1`) đến nhỏ nhắn (`h6`).

---

## VIII. TIỆN ÍCH CSS (UTILITIES) - GHI THẲNG VÀO CLASSNAME

Bạn không cần tốn 1 giây nào để viết code CSS riêng, chỉ cần nhét các chuỗi này vào `className="..."` là tự ăn.

### 23. Display property (Chế độ hiển thị)
- `d-none`: Ẩn biến mất tiêu.
- `d-block`: Hiện dạng khối (Chiếm nguyên 1 dòng).
- `d-inline`: Hiện dạng nối tiếp nhau (Như chữ trên 1 hàng).
- `d-none d-md-block`: Ở điện thoại thì Ẩn, nhưng trên máy tính thì Hiện. (Hay dùng để giấu menu).

### 24. ĐƯA PHẦN TỬ VỀ CUỐI — KHÔNG CẦN FLEX 🎯

Khi **không dùng Flexbox**, có 3 cách phổ biến để đẩy một thứ sang phải / xuống cuối:

#### ① `text-align: 'end'` (hoặc `'right'`) — Căn chữ/nút về cuối hàng
> Dùng cho **chữ, nút inline, span** nằm bên trong một thẻ cha dạng block.  
> `'end'` là cú pháp hiện đại hơn, tương đương `'right'` trong tiếng Việt/Anh.

```javascript
// CSS Inline
<div style={{ textAlign: 'end' }}>
    <button style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px' }}>
        Xóa
    </button>
</div>

// Bootstrap class tương đương
<div className="text-end">
    <button className="btn btn-danger">Xóa</button>
</div>
```

#### ② `float: 'right'` — Thả nổi phần tử sang phải (kiểu cũ, vẫn hay gặp)
> Thường dùng để đẩy hình ảnh hoặc badge sang một bên mà không ảnh hưởng luồng chữ.

```javascript
// CSS Inline
<div style={{ overflow: 'hidden' }}> {/* overflow:hidden để bọc thằng float bên trong */}
    <span style={{ float: 'right', backgroundColor: '#0d6efd', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '12px' }}>
        Mới
    </span>
    <p style={{ margin: 0 }}>Tên sản phẩm ở đây</p>
</div>

// Bootstrap class tương đương
<div className="clearfix">
    <span className="float-end badge bg-primary">Mới</span>
    <p className="mb-0">Tên sản phẩm ở đây</p>
</div>
```

#### ③ `position: 'absolute', right: '0'` — Ghim cứng vào góc phải
> Dùng khi muốn **ghim cố định** một phần tử (nút X đóng, badge góc trên phải, icon...) bất kể nội dung xung quanh.
> ⚠️ **Bắt buộc** thẻ cha phải có `position: 'relative'`.

```javascript
// CSS Inline
<div style={{ position: 'relative', border: '1px solid #dee2e6', padding: '16px', borderRadius: '8px' }}>
    <h5>Tiêu đề card</h5>
    <p>Nội dung mô tả bên trong...</p>

    {/* Nút X ghim cứng góc trên bên phải */}
    <button style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        background: 'none',
        border: 'none',
        fontSize: '18px',
        cursor: 'pointer',
        color: '#6c757d'
    }}>✕</button>
</div>

// Bootstrap class tương đương
<div className="position-relative border rounded p-3">
    <h5>Tiêu đề card</h5>
    <button className="position-absolute top-0 end-0 btn btn-sm btn-light m-1">✕</button>
</div>
```

#### 📊 BẢNG SO SÁNH NHANH — Khi nào dùng cái gì?

| Tình huống thực tế | Dùng cái gì | CSS Inline | Bootstrap Class |
|---|---|---|---|
| Căn nút / chữ sang phải trong 1 dòng | `text-align: end` | `textAlign: 'end'` | `text-end` |
| Đẩy badge/hình nổi sang phải, chữ chảy vòng | `float: right` | `float: 'right'` | `float-end` |
| Ghim cứng 1 nút vào góc (nút X, badge số) | `position: absolute` | `position: 'absolute', right: '0'` | `position-absolute top-0 end-0` |
| Đẩy nút sang phải trong thanh ngang | `margin-left: auto` + flex | `marginLeft: 'auto'` | `ms-auto` (cần `d-flex`) |

### 25. Flex (Bố cục dàn trang linh hoạt)
Bắt buộc phải có `d-flex` đứng đầu.
- Căn ngang: `justify-content-start` (Trái), `justify-content-center` (Giữa), `justify-content-end` (Phải), `justify-content-between` (Cách đều 2 mép).
- Căn dọc: `align-items-start` (Trên), `align-items-center` (Giữa dọc), `align-items-end` (Dưới).
- Xếp theo dọc/ngang: `flex-column`, `flex-row`.

**🔥 BÍ KÍP "ĐƯA PHẦN TỬ VỀ CUỐI" (Đẩy ra tận cùng bên phải/dưới):**

Đây là kỹ thuật đỉnh nhất trong Flexbox: Dùng `marginLeft: 'auto'` để **ép** một phần tử văng tận sang phải, hoặc `marginTop: 'auto'` để đẩy xuống tận đáy.

| Tình huống | CSS Inline cần dùng | Class Bootstrap tương đương |
|---|---|---|
| Đẩy sang **phải** (cuối hàng ngang) | `style={{ marginLeft: 'auto' }}` | `ms-auto` |
| Đẩy sang **trái** (cuối hàng từ phải) | `style={{ marginRight: 'auto' }}` | `me-auto` |
| Đẩy xuống **đáy** (cuối cột dọc) | `style={{ marginTop: 'auto' }}` | `mt-auto` |
| Đẩy lên **đỉnh** | `style={{ marginBottom: 'auto' }}` | `mb-auto` |

```javascript
// 🎯 VÍ DỤ 1: Navbar - Logo bên trái, Nút Đăng nhập đẩy sang tận phải
export const NavbarTuyChon = () => (
    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#343a40', padding: '10px 20px' }}>
        <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>🛒 ShopApp</span>

        <nav style={{ display: 'flex', gap: '20px', marginLeft: '30px' }}>
            <a href="#" style={{ color: '#adb5bd', textDecoration: 'none' }}>Trang chủ</a>
            <a href="#" style={{ color: '#adb5bd', textDecoration: 'none' }}>Sản phẩm</a>
        </nav>

        {/* 🔑 marginLeft: 'auto' đẩy nút này sang tận cùng bên phải */}
        <button style={{ marginLeft: 'auto', backgroundColor: '#0d6efd', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px' }}>
            Đăng nhập
        </button>
    </div>
)

// 🎯 VÍ DỤ 2: Card sản phẩm - Nút Mua nằm tận đáy card dù mô tả ngắn hay dài
export const CardDayNutXuongDay = () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '200px', height: '300px', border: '1px solid #dee2e6', borderRadius: '8px', padding: '16px' }}>
        <h5 style={{ margin: '0 0 8px 0' }}>iPhone 15</h5>
        <p style={{ color: '#6c757d', fontSize: '14px' }}>Hàng chính hãng.</p>

        {/* 🔑 marginTop: 'auto' đẩy nút MUA NGAY xuống tận đáy card */}
        <button style={{ marginTop: 'auto', backgroundColor: '#198754', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer' }}>
            Mua ngay
        </button>
    </div>
)

// 🎯 VÍ DỤ 3: Dùng class Bootstrap ms-auto (tương đương marginLeft: auto)
export const NavBootstrapMsAuto = () => (
    // me-auto: Đẩy <Nav> sang trái → Để trống hết khoảng giữa → Nút Login dồn sang phải
    <div className="d-flex align-items-center bg-dark p-3">
        <span className="text-white fw-bold me-3">Logo</span>
        <nav className="d-flex gap-3 me-auto">
            <a href="#" className="text-secondary text-decoration-none">Trang chủ</a>
            <a href="#" className="text-secondary text-decoration-none">Về chúng tôi</a>
        </nav>
        {/* Vì me-auto đẩy thằng nav sang trái hết rồi, nên Login tự dồn sang phải */}
        <button className="btn btn-primary btn-sm">Login</button>
    </div>
)
```

**Mẹo kinh điển:** Căn một thẻ `<div/>` ra chính giữa tuyệt đối giữa màn hình (Dùng làm Form Login):
```html
<div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
   <h3>Form Login nằm gọn chính giữa</h3>
</div>
```

### 26. Text (Tùy biến Chữ nghĩa)
- Căn lề chữ: `text-start` (Trái), `text-center` (Giữa), `text-end` (Phải).
- Viết hoa/thường: `text-lowercase` (thường hết), `text-uppercase` (HOA HẾT), `text-capitalize` (Viết Hoa Chữ Đầu).
- Độ béo của chữ: `fw-bold` (Đậm), `fw-normal` (Thường), `fw-light` (Mỏng).
- Gạch ngang chữ (Ví dụ làm giá tiền giảm giá): `text-decoration-line-through`.
- Màu chữ: `text-primary` (Xanh biển), `text-success` (Xanh lá), `text-danger` (Đỏ), `text-warning` (Vàng), `text-muted` (Màu xám nhạt mờ mờ).

---

## IX. BÍ KÍP INLINE STYLING (CSS TRỰC TIẾP BẰNG JAVASCRIPT)

Đôi khi các Class của Bootstrap không đủ để đáp ứng yêu cầu của đề thi (Ví dụ: đề bắt ép chiều cao cụ thể 350px, hoặc bắt dùng một mã màu kỳ quặc). Lúc đó, bạn phải dùng tuyệt chiêu `style={{ ... }}`.

### 27. Nguyên tắc "Con Lạc Đà" (CamelCase)
Khác với HTML truyền thống, thuộc tính `style` trong React nhận vào một **Object Javascript**. Do đó, mọi thuộc tính có dấu gạch ngang (`-`) đều phải biến thành kiểu chữ Lạc Đà (viết hoa chữ cái đầu tiên của từ thứ hai).

- `background-color` ➔ Biến thành: `backgroundColor: 'red'`
- `font-size` ➔ Biến thành: `fontSize: '24px'`
- `border-radius` ➔ Biến thành: `borderRadius: '10px'`
- `margin-top` ➔ Biến thành: `marginTop: '20px'`

### 28. Ba cách viết Inline Style thường gặp nhất

**Cách 1: Viết đúp 2 dấu ngoặc nhọn thẳng vào thẻ (Thường dùng nhất)**
- Ngoặc nhọn ngoài cùng `{ }`: Báo cho React biết sắp nhúng code Javascript.
- Ngoặc nhọn bên trong `{ }`: Định nghĩa một Object chứa các cặp Key-Value CSS.
```javascript
export const InlineTrucTiep = () => (
    <div style={{ 
        backgroundColor: '#f8f9fa', 
        border: '2px solid #0d6efd',
        borderRadius: '15px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
    }}>
        <h3 style={{ color: '#ff0000', fontSize: '32px' }}>
            Chữ màu đỏ, font siêu bự
        </h3>
    </div>
)
```

**Cách 2: Tách ra thành một biến riêng (Giúp code gọn gàng, dễ nhìn)**
Nếu CSS quá dài, hãy bưng nó ra ngoài khai báo thành 1 biến Object.
```javascript
export const InlineTachBien = () => {
    // Định nghĩa biến chứa đống CSS
    const myKieuDang = {
        height: '350px',
        width: '100%',
        backgroundImage: 'url("https://via.placeholder.com/800x350")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    };

    return (
        <div style={myKieuDang}>
            <h1 style={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', padding: '10px' }}>
                Tiêu đề nằm trên hình nền
            </h1>
        </div>
    )
}
```

**Cách 3: Kết hợp Đỉnh Cao giữa Class Bootstrap và Inline Style**
Chiến thuật khôn ngoan nhất đi thi: Những gì Bootstrap hỗ trợ thì nhét vào `className`, những gì quá đặc thù thì nhét vào `style`.
```javascript
export const SuKetHopHoanHao = () => (
    <div 
        // Dùng Bootstrap để căn giữa, bo góc, tạo bóng, chữ trắng, nền đen
        className="d-flex justify-content-center align-items-center bg-dark text-white rounded shadow" 
        
        // Dùng Style để ép chiều cao và kẻ viền đứt nét màu vàng
        style={{ height: '100vh', border: '5px dashed yellow' }}
    >
        <h3>Vừa ăn class của Bootstrap, vừa ăn style tự chế!</h3>
    </div>
)
```


---

