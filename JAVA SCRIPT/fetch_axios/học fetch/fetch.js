const listProduct = document.querySelector(".list-products")



fetch("https://dummyjson.com/products")
.then((res) => res.json ()) //res là json nên phải trả về dạng js
.then((data) =>{
    const arrayData = data.products
    const arrayData2 = arrayData?.map((item) =>{
        return `
         <div class="list-item">
            <div class="item-image">
                <img src="${item.thumbnail}" alt="">
            </div>
            <div class="item-name">${item.title}</div>
            <div class="item-price">${item.price}</div>
        </div>
        
        `
    })
    listProduct.innerHTML = arrayData2.join("")
})