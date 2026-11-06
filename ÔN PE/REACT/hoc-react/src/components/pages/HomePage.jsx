import ProductItem from "../common/ProductItem";

const listProduct = [
    {
        id: 1,
        name: "Tai nghe Bluetooth",
        price: 590000,
        image:
            "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
    },
    {
        id: 2,
        name: "Eyeshadow Palette with Mirror",
        price: 1290000,
        image:
            "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
    },
    {
        id: 3,
        name: "Powder Canister",
        price: 750000,
        image:
            "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp",
    }
];
const HomePage = () => {
    return (
        <>
            <div>
                <h1 className="homepage">HomePage</h1>
                <div className="product-list">
                    {listProduct?.map((item) => {
                        return <ProductItem
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            image={item.image} />
                    })}



                </div>
            </div>

        </>
    )
}
export default HomePage