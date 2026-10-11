import { Button, Col, Container, Form, Row, Table } from "react-bootstrap"
import { BoxProvider } from "../context/ContextProvider"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Recipes = () => {
    const { listRecipes } = useContext(BoxProvider)
    const navigate = useNavigate();
    //lay ra name recipe
    const arrRecipe = Array.from(new Set(listRecipes?.map((item) => item.name)))
    //tao biến use state để lọc 
    const [nameState, setNameState] = useState("");
    const [selectedCuisines, setSelectedCuisines] = useState([]);
    const [selectedMealTypes, setSelectedMealTypes] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    //bước lọc
    const listRecipesFinal = listRecipes.filter((item) => {
        const nameMatch = (item.name || "").toLowerCase().includes(nameState.toLowerCase());

        const cuisineMatch = selectedCuisines.length === 0 || selectedCuisines.some(c => String(item.cuisine || "").toLowerCase().includes(String(c).toLowerCase()));

        const mealMatch = selectedMealTypes.length === 0 || selectedMealTypes.some(m => String(item.mealType || "").toLowerCase().includes(String(m).toLowerCase()));

        const tagsMatch = selectedTags.length === 0 || selectedTags.some(t => String(item.tags || "").toLowerCase().includes(String(t).toLowerCase()));

        return nameMatch && cuisineMatch && mealMatch && tagsMatch;
    })

    const toggleItem = (item, setItemState) => {
        setItemState(function(oldArray) {
            // Đề phòng trường hợp oldArray bị undefined
            const currentArray = Array.isArray(oldArray) ? oldArray : [];

            // Nếu trong mảng cũ ĐÃ CÓ cái item người dùng vừa click (tức là họ muốn Bỏ chọn)
            if (currentArray.includes(item) === true) {
                // Lọc và loại bỏ cái item đó đi
                const newArray = currentArray.filter(i => i !== item);
                return newArray;
            } 
            // Ngược lại, nếu mảng cũ CHƯA CÓ (tức là họ muốn Chọn thêm)
            else {
                // Giữ nguyên mảng cũ và thêm item mới vào cuối
                const newArray = [...currentArray, item];
                return newArray;
            }
        });
    };

    return (
        <>
            {/* header */}
            <div>
                <h1 style={{ textAlign: "center", marginBottom: "30px" }}>RECIPES FORUM</h1>
            </div>
            {/* body */}
            <Container fluid >
                <Row >
                    {/* phan 1 */}
                    <Col xs={2} style={{ borderRight: "2px solid #cccc" }} >
                        {/* cuisine */}
                        <div>
                            <h3>Cuisine</h3>
                            <Form >
                                <Form.Check
                                    type="checkbox"
                                    id="cuisine-mexican"
                                    label="Mexican"
                                    checked={selectedCuisines.includes("Mexican")}
                                    onChange={() => toggleItem("Mexican", setSelectedCuisines)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="cuisine-american"
                                    label="American"
                                    checked={selectedCuisines.includes("American")}
                                    onChange={() => toggleItem("American", setSelectedCuisines)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="cuisine-italian"
                                    label="Italian"
                                    checked={selectedCuisines.includes("Italian")}
                                    onChange={() => toggleItem("Italian", setSelectedCuisines)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="cuisine-asian"
                                    label="Asian"
                                    checked={selectedCuisines.includes("Asian")}
                                    onChange={() => toggleItem("Asian", setSelectedCuisines)}
                                />
                            </Form>
                        </div>
                        {/* meal type */}
                        <div>
                            <h3>Meal Type</h3>
                            <Form>
                                {/* Checkbox (Có thể chọn nhiều cái cùng lúc) */}
                                <Form.Check
                                    type="checkbox"
                                    id="meal-dinner"
                                    label="Dinner"
                                    checked={selectedMealTypes.includes("Dinner")}
                                    onChange={() => toggleItem("Dinner", setSelectedMealTypes)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="meal-snack"
                                    label="Snack"
                                    checked={selectedMealTypes.includes("Snack")}
                                    onChange={() => toggleItem("Snack", setSelectedMealTypes)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="meal-dessert"
                                    label="Dessert"
                                    checked={selectedMealTypes.includes("Dessert")}
                                    onChange={() => toggleItem("Dessert", setSelectedMealTypes)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="meal-lunch"
                                    label="Lunch"
                                    checked={selectedMealTypes.includes("Lunch")}
                                    onChange={() => toggleItem("Lunch", setSelectedMealTypes)}
                                />
                            </Form>
                        </div>
                    </Col>
                    {/* content */}
                    <Col xs={8} >
                        {/* search */}
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                            <Form.Control onChange={(e) => setNameState(e.target.value)} defaultValue={nameState} type="text" placeholder="Enter Recipe Name to search..." style={{ width: "50%", alignItems: "center" }} />
                        </div>
                        {/* button */}
                        <div style={{ display: "flex", justifyContent: "end", margin: "10px" }}>
                            <Button onClick={() => navigate('/recipe/create')} type="button" style={{ width: "10%", alignItems: 'end' }}>Create Recipe</Button>
                        </div>
                        {/* table */}
                        <Table striped bordered hover responsive variant="light">
                            <thead className="table-white">
                                <tr>
                                    <th>Image</th>
                                    <th>Recipes</th>
                                    <th>Cuisine</th>
                                    <th>MealType</th>
                                    <th>Tags</th>
                                    <th>Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listRecipesFinal?.map((recipe, index) => (
                                    <tr key={index}>
                                        <td style={{ textAlign: "center", verticalAlign: "middle", width: "160px" }}>{
                                            (
                                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "150px", height: "150px" }}>
                                                    <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={`./images/${recipe.image}`} />
                                                </div>
                                            )}</td>
                                        <td>{(
                                            <div>
                                                <h1>{recipe.name}</h1>
                                                <p>PreparationTime: {recipe.prepTimeMinutes}</p>
                                                <p>Cook Time: {recipe.cookTimeMinutes}</p>
                                            </div>

                                        )}</td>

                                        <td>{recipe.cuisine}</td>
                                        <td>{recipe.mealType}</td>
                                        <td>{recipe.tags}</td>
                                        <td>{recipe.rating}</td>
                                    </tr>
                                ))

                                }
                            </tbody>
                        </Table>
                    </Col>
                    {/* Tags */}
                    <Col xs={2} >
                        <div>
                            <h3>Tags</h3>
                            <Form>
                                {/* Checkbox (Có thể chọn nhiều cái cùng lúc) */}
                                <Form.Check
                                    type="checkbox"
                                    id="tag-chicken"
                                    label="Chicken"
                                    checked={selectedTags.includes("Chicken")}
                                    onChange={() => toggleItem("Chicken", setSelectedTags)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="tag-salsa"
                                    label="Salsa"
                                    checked={selectedTags.includes("Salsa")}
                                    onChange={() => toggleItem("Salsa", setSelectedTags)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="tag-cookies"
                                    label="Cookies"
                                    checked={selectedTags.includes("Cookies")}
                                    onChange={() => toggleItem("Cookies", setSelectedTags)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="tag-dessert"
                                    label="Dessert"
                                    checked={selectedTags.includes("Dessert")}
                                    onChange={() => toggleItem("Dessert", setSelectedTags)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="tag-baking"
                                    label="Baking"
                                    checked={selectedTags.includes("Baking")}
                                    onChange={() => toggleItem("Baking", setSelectedTags)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="tag-pasta"
                                    label="Pasta"
                                    checked={selectedTags.includes("Pasta")}
                                    onChange={() => toggleItem("Pasta", setSelectedTags)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="tag-vegetarian"
                                    label="Vegetarian"
                                    checked={selectedTags.includes("Vegetarian")}
                                    onChange={() => toggleItem("Vegetarian", setSelectedTags)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="tag-stir-fry"
                                    label="Stir-fry"
                                    checked={selectedTags.includes("Stir-fry")}
                                    onChange={() => toggleItem("Stir-fry", setSelectedTags)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="tag-asian"
                                    label="Asian"
                                    checked={selectedTags.includes("Asian")}
                                    onChange={() => toggleItem("Asian", setSelectedTags)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="tag-pizza"
                                    label="Pizza"
                                    checked={selectedTags.includes("Pizza")}
                                    onChange={() => toggleItem("Pizza", setSelectedTags)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="tag-italian"
                                    label="Italian"
                                    checked={selectedTags.includes("Italian")}
                                    onChange={() => toggleItem("Italian", setSelectedTags)}
                                />

                            </Form>
                        </div>
                    </Col>

                </Row>
            </Container>
        </>
    )
}