import { createContext, useEffect, useState } from "react"
import instance from "../utils";

export const BoxProvider = createContext();

export const ContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    //Call api va lay ra du lieu
    useEffect(() => {
        instance.get("/products").then((res) => {
            setProducts(res.data)
        })
        instance.get("/orders").then((res) => {
            setOrders(res.data)
        })
    }, [])

    return (
        <BoxProvider.Provider
            value={{
                products: products, setProducts: setProducts,
                orders: orders, setOrders: setOrders
            }}>
            {children}
        </BoxProvider.Provider>
    )
}