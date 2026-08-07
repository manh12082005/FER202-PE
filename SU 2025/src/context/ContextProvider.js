import { createContext, useEffect, useState } from "react"
import instance from "../utils";

export const BoxProvider = createContext();

export const ContextProvider = ({ children }) => {
    const [listMovie, setListMovie] = useState([]);
    const [listUsers, setListUsers] = useState([])
    //Call api va lay ra du lieu
    useEffect(() => {
        instance.get("/movies").then((res) => {
            setListMovie(res.data)
        })
        instance.get("/users").then((res) => {
            setListUsers(res.data)
        })
    }, [])

    return (
        <BoxProvider.Provider
            value={{
                listMovie: listMovie, setListMovie: setListMovie,
                listUsers: listUsers, setListUsers: setListUsers
            }}>
            {children}
        </BoxProvider.Provider>
    )
}