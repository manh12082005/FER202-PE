import { createContext, useEffect, useState } from "react"
import instance from "../utils";

export const BoxProvider = createContext();

export const ContextProvider = ({ children }) => {
    const [listProduct, setListProduct] = useState([]);
    const [listCart, setListCart] = useState([]);
    //Call api va lay ra du lieu
    useEffect(() => {
        instance.get("/products").then((res) => {
            setListProduct(res.data)
        })
        instance.get("/carts").then((res) => {
            setListCart(res.data)
        })
    }, [])

    return (
        <BoxProvider.Provider
            value={{
                listProduct: listProduct, setListProduct: setListProduct,
                listCart: listCart, setListCart: setListCart,
            }}>
            {children}
        </BoxProvider.Provider>
    )
}