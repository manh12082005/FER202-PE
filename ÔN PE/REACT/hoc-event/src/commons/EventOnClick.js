const EventOnClick = () => {
    const functionOnClick = () => {
       const menuItem = document.querySelector(".menu")
        if (menuItem.getAttribute("show") === "") {
            menuItem.setAttribute("show", "show")
        } else {
            menuItem.setAttribute("show", "")
        }
    }
    return (
        <>
            <button onClick={functionOnClick}>Menu</button>
            <ul className="menu" show="">
                <li>Menu1</li>
                <li>Menu2</li>
                <li>Menu3</li>
            </ul>
        </>
    )

}
export default EventOnClick