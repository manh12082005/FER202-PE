import { createContext, useEffect, useState } from "react"
import instance from "../utils";

export const BoxProvider = createContext();

export const ContextProvider = ({ children }) => {
    const [listSubjects, setListSubjects] = useState([]);
    const [listStudents, setListStudents] = useState([]);
    const [listClasses, setListClasses] = useState([]);
    const [listAttendances, setListAttendances] = useState([]);
    const [listAttendanceSummaries, setAttendanceSummaries] = useState([]);
    //Call api va lay ra du lieu
    useEffect(() => {
        instance.get("/subjects").then((res) => {
            setListSubjects(res.data)
        })
        instance.get("/students").then((res) => {
            setListStudents(res.data)
        })
        instance.get("/classes").then((res) => {
            setListClasses(res.data)
        })
        instance.get("/attendances").then((res) => {
            setListAttendances(res.data)
        })
        instance.get("/attendanceSummaries").then((res) => {
            setAttendanceSummaries(res.data)
        })

    }, [])

    return (
        <BoxProvider.Provider
            value={{
                listSubjects: listSubjects, setListSubjects: setListSubjects,
                listStudents: listStudents, setListStudents: setListStudents,
                listClasses: listClasses, setListClasses: setListClasses,
                listAttendances: listAttendances, setListAttendances: setListAttendances,
                listAttendanceSummaries: listAttendanceSummaries, setAttendanceSummaries: setAttendanceSummaries,
            }}>
            {children}
        </BoxProvider.Provider>
    )
}