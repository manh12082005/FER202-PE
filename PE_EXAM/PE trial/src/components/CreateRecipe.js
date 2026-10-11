import { Button, Container, Form } from "react-bootstrap";
import { useState, useContext } from "react";
import { BoxProvider } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import instance from "../utils";

export const CreateRecipe = () => {
    const navigate = useNavigate();
    const { setListRecipes } = useContext(BoxProvider);

    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [prepTimeMinutes, setPrepTimeMinutes] = useState("");
    const [cookTimeMinutes, setCookTimeMinutes] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [tags, setTags] = useState("");
    const [mealTypes, setMealTypes] = useState("");
    const [error, setError] = useState("");

    const handleSave = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setError("Recipe Name is required");
            return;
        }
        setError("");

        const payload = {
            name: name,
            ingredients: ingredients,
            instructions: instructions,
            prepTimeMinutes: Number(prepTimeMinutes) || 0,
            cookTimeMinutes: Number(cookTimeMinutes) || 0,
            cuisine: cuisine,
            difficulty: difficulty,
            tags: tags,
            mealType: mealTypes,
            image: "default.jpg",
            rating: 0
        };

        try {
            const newItem = { id: String(Date.now()), ...payload };

            // Gọi API
            const res = await instance.post("/recipes", newItem);

            // Cập nhật listRecipes trên client với dữ liệu do server trả về
            if (setListRecipes) {
                setListRecipes(function(oldList) {
                    const newList = [...oldList, res.data];
                    return newList;
                });
            }

            alert("Recipe saved successfully");
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Error saving recipe");
        }
    };

    return (
        <Container style={{ maxWidth: 800, marginTop: 20 }}>
            <h2>Create Recipe</h2>
            <Form onSubmit={handleSave}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Recipe Name *</Form.Label>
                    <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
                    {error && <div style={{ color: "red" }}>{error}</div>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="ingredients">
                    <Form.Label>Ingredients (separate with ;)</Form.Label>
                    <Form.Control value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="instructions">
                    <Form.Label>Instructions (separate with ;)</Form.Label>
                    <Form.Control value={instructions} onChange={(e) => setInstructions(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="prep">
                    <Form.Label>Preparation Time Minutes</Form.Label>
                    <Form.Control type="number" value={prepTimeMinutes} onChange={(e) => setPrepTimeMinutes(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="cook">
                    <Form.Label>Cook Time Minutes</Form.Label>
                    <Form.Control type="number" value={cookTimeMinutes} onChange={(e) => setCookTimeMinutes(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="cuisine">
                    <Form.Label>Cuisine</Form.Label>
                    <Form.Control value={cuisine} onChange={(e) => setCuisine(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="difficulty">
                    <Form.Label>Difficulty</Form.Label>
                    <Form.Control value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="tags">
                    <Form.Label>Tags (separate with ;)</Form.Label>
                    <Form.Control value={tags} onChange={(e) => setTags(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="mealTypes">
                    <Form.Label>Meal Types (separate with ;)</Form.Label>
                    <Form.Control value={mealTypes} onChange={(e) => setMealTypes(e.target.value)} />
                </Form.Group>

                <div style={{ display: "flex", gap: 10 }}>
                    <Button type="submit" variant="primary">Save</Button>
                    <Button type="button" variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
                </div>
            </Form>
        </Container>
    )
}

export default CreateRecipe;
