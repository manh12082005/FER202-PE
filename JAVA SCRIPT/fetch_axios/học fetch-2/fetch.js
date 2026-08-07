const { default: axios } = require("axios")

const listProduct = document.querySelector(".list-products")
const body = document.querySelector("tbody")

// Lưu id sản phẩm đang update
let currentUpdateId = null

axios.get("http://localhost:9999/products")
    .then((data) => {
        const arrayData = data?.map((item) => {
            return `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.title}</td>
                    <td>${item.price}</td>
                    <td>
                        <button class="btn-update" data-id="${item.id}">Update</button>
                        <button class="btn-delete" data-id="${item.id}">Delete</button>
                    </td>
                </tr>
            `
        })

        body.innerHTML = arrayData.join("")

        // update
        const butttonUpdateArray = document.querySelectorAll(".btn-update")

        // duyệt mảng buttonUpdateArray
        butttonUpdateArray?.forEach((item) => {
            item.addEventListener("click", () => {
                const updateProduct = document.querySelector(".update-product")
                const inputTitle = updateProduct.querySelector("input[name='title']")
                const inputPrice = updateProduct.querySelector("input[name='price']")

                updateProduct.style.display = "block"

                // lấy ra id của từng sản phẩm
                const id = item.dataset.id

                // gán id đang update vào biến global
                currentUpdateId = id

                // lấy dữ liệu cụ thể của từng sản phẩm
                fetch(`http://localhost:9999/products/${id}`)
                    .then((res) => res.json())
                    .then((data) => {
                        inputTitle.value = data.title
                        inputPrice.value = data.price
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
        })

        // create
        const form = document.querySelector("#form-create")

        form.addEventListener("submit", (event) => {
            event.preventDefault()

            const title = event.target.title.value
            const price = event.target.price.value

            const newObject = {
                title: title,
                price: price
            }

            fetch("http://localhost:9999/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newObject)
            })
                .then((res) => res.json())
                .then((data) => {
                    alert("Đã thêm sản phẩm thành công")
                    console.log(data)

                    // reset form
                    form.reset()

                    // load lại trang để cập nhật bảng
                    window.location.reload()
                })
                .catch((err) => {
                    console.log(err)
                })
        })

        // delete
        const butttonDeleteArray = document.querySelectorAll(".btn-delete")

        // duyệt mảng buttonDeleteArray
        butttonDeleteArray?.forEach((item) => {
            item.addEventListener("click", () => {
                // lấy ra id cần xóa
                const id = item.dataset.id

                const isConfirm = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")

                if (!isConfirm) {
                    return
                }

                // call api với method delete
                fetch(`http://localhost:9999/products/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(() => {
                        alert("Đã xóa sản phẩm thành công")

                        // load lại trang để cập nhật bảng
                        window.location.reload()
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
        })
    })

// lấy ra form update để bắt sự kiện
const formUpdate = document.querySelector("#form-update")

formUpdate.addEventListener("submit", (event) => {
    event.preventDefault()

    if (!currentUpdateId) {
        alert("Bạn chưa chọn sản phẩm để update")
        return
    }

    const newTitle = event.target.title.value
    const newPrice = event.target.price.value

    const updateObject = {
        title: newTitle,
        price: newPrice
    }

    fetch(`http://localhost:9999/products/${currentUpdateId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateObject)
    })
        .then((res) => res.json())
        .then((data) => {
            alert("Đã cập nhật sản phẩm thành công")
            console.log(data)

            formUpdate.reset()

            const updateProduct = document.querySelector(".update-product")
            updateProduct.style.display = "none"

            // load lại trang để cập nhật bảng
            window.location.reload()
        })
        .catch((err) => {
            console.log(err)
        })
})