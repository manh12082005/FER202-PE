import { createContext, useEffect, useState } from "react"
import instance from "../utils";

export const BoxProvider = createContext();

export const ContextProvider = ({ children }) => {
    const [listProduct, setListProduct] = useState([]);
    const [listBrand, setListBrand] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    //Call api va lay ra du lieu
    useEffect(() => {
        instance.get("/product").then((res) => {
            setListProduct(res.data)
        })
              instance.get("/brand").then((res) => {
            setListBrand(res.data)
        })
              instance.get("/category").then((res) => {
            setListCategory(res.data)
        })

    }, [])

    return (
        <BoxProvider.Provider
            value={{
                listProduct: listProduct, setListProduct: setListProduct,
                 listBrand: listBrand, setListBrand: setListBrand,
                  listCategory: listCategory, setListCategory: setListCategory,
            }}>
            {children}
        </BoxProvider.Provider>
    )
}