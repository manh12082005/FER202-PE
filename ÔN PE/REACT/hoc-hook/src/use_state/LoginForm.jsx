//use state dùng để lưu dữ liệu có thể thay đổi trong component
//useState giúp cập nhật lại giá trị của 1 biến khi mà nó phát hiện giá trị của biến thay đổi 
// nó sẽ render lại toàn bộ component theo giá trị mới

import { useState } from "react"

export function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);

    }

    return (
        <form onSubmit={handleOnSubmit}>
            <div>
                <label>Email: </label>
                <input type="text" value={email} placeholder="Enter email..." onChange={(e) => setEmail(e.target.value)} />
            </div>
            <br />
            <br />
            <div>
                <label>Password: </label>
                <input type="password" value={password} placeholder="Enter password..." onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button type="submit">Login</button>
        </form>
    )


}