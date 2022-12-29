/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/dashboard";

  const login = async (data) => {
    if(data.userName === "anujvyas3407@gmail.com" &&  data.password === "P@ssw0rd"){
    setUser(data);
    console.log("Admin")
    let menuItems = [
    { label: "DashBoard", path: "/dashboard" },
    { label: "Class", path: "/manageClasses" },
    { label: "Teacher", path: "/manageTeachers" },
    { label: "Student", path: "/manageStudents" },
    { label: "Skills", path: "/manageSkills" },
    { label: "Roles", path: "/manageRoles" }
  ];
    localStorage.setItem('menu',JSON.stringify(menuItems));
    localStorage.setItem('role','Admin');
    setTimeout(function() { 
      alert("Admin successfully login");
},);
    }
    else if(data.userName === "student@gmail.com" &&  data.password === "P@ssw0rd"){
      setUser(data);
      let menuItems = [
        { label: "DashBoard", path: "/dashboard" },
        { label: "Student", path: "/manageStudents" },
      ];
      localStorage.setItem('menu',JSON.stringify(menuItems));
      localStorage.setItem('role','Student')
     
      setTimeout(function() { 
        alert("student successfully login");
  },);
    }
    else if(data.userName === "teacher@gmail.com" &&  data.password === "P@ssw0rd"){
      setUser(data);
      let menuItems = [
        { label: "DashBoard", path: "/dashboard" },
        // { label: "Teacher", path: "/manageTeachers" },
        { label: "Student", path: "/manageStudents" }
      ];
        localStorage.setItem('menu',JSON.stringify(menuItems));
        localStorage.setItem('role','Teacher')
        setTimeout(function() { 
          alert("teacher successfully login");
    },);
    }
  else{
    setUser(null);
    localStorage.clear();
    alert("not user");
  }
    navigate(from, { replace: true });
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
