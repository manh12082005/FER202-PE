const EventOnSubmit = () => {
const handleOnSubmit = (event) =>{
    event.preventDefault();
    console.log(event.target.username.value);
    
} 
const handleOnChange=(event)=>{
console.log(event.target.value);

}
    return (
        <form onSubmit= {handleOnSubmit}>
            <input onChange={handleOnChange} type="text" name="username" placeholder="Nhap ho va ten..." />
            <br></br>
            <button >Gửi</button>
        </form>
    )
}
export default EventOnSubmit