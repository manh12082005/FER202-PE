import { createContext, useEffect, useState } from "react"
import instance from "../utils";


export const BoxProvider = createContext();

export const ContextProvider = ({ children }) => {
    const [listRecipes, setListRecipes] = useState([]);

    //Call api va lay ra du lieu
    useEffect(() => {
        instance.get("/recipes").then((res) => {
            setListRecipes(res.data)
        })

    }, [])

    return (
        <BoxProvider.Provider
            value={{
                listRecipes: listRecipes, setListRecipes: setListRecipes,
            }}>
            {children}
        </BoxProvider.Provider>
    )
}