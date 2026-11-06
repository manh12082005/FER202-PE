const EventOnChange = () => {
    const handleOnChange = (event) => {
        console.log(event.target.value);

    }
    return (
        <select className="color" onChange={(event) => handleOnChange(event)}>
            <option value="yewlow">Màu vàng</option>
            <option value="green">Màu xanh</option>
            <option value="red">Màu đỏ</option>
            <option value="purple">Màu tím</option>
        </select>
    )
}
export default EventOnChange