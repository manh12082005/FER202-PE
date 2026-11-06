//useEffect dùng để chạy một đoạn logic sau khi component render xong.
// Component render bao nhiêu lần thì useEffect chạy bấy nhiêu lần.
// Nó thường dùng cho:
// gọi API
// lấy dữ liệu từ JSON-Server
// cập nhật document title
// set timer / countdown
// lắng nghe event
// đồng bộ dữ liệu với localStorage
// Trường hợp 1: Không có dependency array
export default function Counter(){
    const[count,setCount]= useState(0)
    useEffect(()=>{
    console.log("chay sau khi render giao diện");
    
    });
    return(
        <div>
            <p>Count:</p>
            <button onClick={() => setCount(count+1)} >Decrease</button>
        </div>
    )
}
// Lần đầu mở trang:
// Render giao diện
// useEffect chạy

// Bấm nút tăng:
// setCount làm state thay đổi
// Component render lại
// useEffect chạy lại
// dễ gây ra vòng lặp