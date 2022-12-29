import { Navigate, useOutlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Navbar } from "./Navbar";

export const SchoolLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();
  let location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }



  return (
    <div>
      {/* <Navbar
        pages={[
          { label: "DashBoard", path: "/dashboard" },
          { label: "Class", path: "/manageClasses" },
          { label: "Teacher", path: "/manageTeachers" },
          { label: "Student", path: "/manageStudents" },
          { label: "Skills", path: "/manageSkills" },
          { label: "Roles", path: "/manageRoles" },
        ]}
      /> */}
      <Navbar/>
      {outlet}
    </div>
  );
};
