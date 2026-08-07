import { createContext, useEffect, useState } from "react"
import instance from "../utils";

export const BoxProvider = createContext();

export const ContextProvider = ({ children }) => {
    const [listDepartment, setListDepartment] = useState([]);
    const [listEmployee, setListEmployee] = useState([]);
    const [listProject, setListProject] = useState([]);

    //Call api va lay ra du lieu
    useEffect(() => {
        instance.get("/departments").then((res) => {
            setListDepartment(res.data)
        })
          instance.get("/employees").then((res) => {
            setListEmployee(res.data)
        })
          instance.get("/projects").then((res) => {
            setListProject(res.data)
        })
    }, [])

    return (
        <BoxProvider.Provider
            value={{
                listDepartment: listDepartment, setListDepartment: setListDepartment,
                listEmployee: listEmployee, setListEmployee: setListEmployee,
                listProject: listProject, setListProject: setListProject,
            }}>
            {children}
        </BoxProvider.Provider>
    )
}