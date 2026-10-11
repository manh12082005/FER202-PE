// ============================================
// MODULE 1 - Bài 11: Promises & Async/Await
// FER202 - Front-End with React
// ============================================

// ---- 1. PROMISE CƠ BẢN ----
console.log("=== 1. Promise cơ bản ===");

const myPromise = new Promise((resolve, reject) => {
  const success = true;
  setTimeout(() => {
    if (success) {
      resolve("✅ Dữ liệu đã tải xong!");
    } else {
      reject("❌ Lỗi khi tải dữ liệu!");
    }
  }, 1000);
});

myPromise
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

// ---- 2. PROMISE CHAINING ----
console.log("=== 2. Promise Chaining ===");

function buoc1() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Bước 1 xong"), 500);
  });
}

function buoc2(ketQua) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(ketQua + " → Bước 2 xong"), 500);
  });
}

buoc1()
  .then((res) => buoc2(res))
  .then((res) => console.log(res));

// ---- 3. PROMISE.ALL ----
console.log("=== 3. Promise.all ===");

const p1 = new Promise((resolve) => setTimeout(() => resolve("API 1"), 300));
const p2 = new Promise((resolve) => setTimeout(() => resolve("API 2"), 200));
const p3 = new Promise((resolve) => setTimeout(() => resolve("API 3"), 400));

Promise.all([p1, p2, p3]).then((results) => {
  console.log("Tất cả kết quả:", results);
});

// ---- 4. ASYNC/AWAIT CƠ BẢN ----
console.log("=== 4. Async/Await ===");

async function layDuLieu() {
  try {
    // Giả lập gọi API
    const response = await new Promise((resolve) =>
      setTimeout(() => resolve({ id: 1, name: "React Course" }), 500)
    );
    console.log("Dữ liệu nhận được:", response);
    return response;
  } catch (error) {
    console.error("Lỗi:", error);
  }
}

layDuLieu();

// ---- 5. ASYNC/AWAIT VỚI FETCH API (ví dụ thực tế) ----
console.log("=== 5. Fetch API với Async/Await ===");

async function layDanhSachMonHoc() {
  try {
    // Gọi API thực tế (ví dụ JSON Server đang chạy)
    // const response = await fetch("http://localhost:3001/subjects");
    // const data = await response.json();

    // Giả lập kết quả trả về
    const data = [
      { id: "fer202", code: "FER202", name: "Front-End with React" },
      { id: "prn212", code: "PRN212", name: "C# Programming" },
    ];

    console.log("Danh sách môn học:", data);
    return data;
  } catch (error) {
    console.error("Không thể tải dữ liệu:", error.message);
  }
}

layDanhSachMonHoc();

// ---- 6. ASYNC/AWAIT TUẦN TỰ VS SONG SONG ----
console.log("=== 6. Tuần tự vs Song song ===");

async function tuanTu() {
  console.time("Tuần tự");
  const a = await new Promise((r) => setTimeout(() => r("A"), 300));
  const b = await new Promise((r) => setTimeout(() => r("B"), 300));
  console.log("Tuần tự:", a, b);
  console.timeEnd("Tuần tự");
}

async function songSong() {
  console.time("Song song");
  const [a, b] = await Promise.all([
    new Promise((r) => setTimeout(() => r("A"), 300)),
    new Promise((r) => setTimeout(() => r("B"), 300)),
  ]);
  console.log("Song song:", a, b);
  console.timeEnd("Song song");
}

tuanTu();
songSong();
