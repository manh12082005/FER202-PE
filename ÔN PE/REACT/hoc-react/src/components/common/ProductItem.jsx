const ProductItem = (props) => {
    const { id, name, price, image } = props;
    return (
        <>
            <div className="product-item">
                <figure>
                    <img src={`${image}`} alt="" />
                </figure>
                <div>
                    <strong>Name: </strong>
                    <span>{name}</span>
                </div>
                <div>
                    <strong>Price: </strong>
                    <span>{price}</span>
                </div>

            </div>
        </>
    )
}
export default ProductItem