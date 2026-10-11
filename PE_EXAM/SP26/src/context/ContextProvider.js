import { createContext, useEffect, useState } from "react";
import instance from "../utils";

export const BoxProvider = createContext();

export const ContextProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [workons, setWorkons] = useState([]);

  //Call API và lấy dữ liệu
  useEffect(() => {
    instance.get("/departments").then((res) => {
      setDepartments(res.data);
    });
    instance.get("/employees").then((res) => {
      setEmployees(res.data);
    });
    instance.get("/projects").then((res) => {
      setProjects(res.data);
    });
    instance.get("/workons").then((res) => {
      setWorkons(res.data);
    });
  }, []);
  return (
    <BoxProvider.Provider
      value={{
        departments: departments,
        setDepartments: setDepartments,
        employees: employees,
        setEmployees: setEmployees,
        projects: projects,
        setProjects: setProjects,
        workons: workons,
        setWorkons: setWorkons,
      }}
    >
      {children}
    </BoxProvider.Provider>
  );
};
