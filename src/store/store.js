import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./authenticationSlice";
import manageStudentsReducer from "./manageStudentsSlice";
import manageRolesReducer from "./manageRolesSlice";
import manageSkillsReducer from "./manageSkillsSlice";
import manageTeachersReducer from "./manageTeachersSlice";
import manageClassesReducer from "./manageClassesSlice";

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    manageStudents: manageStudentsReducer,
    manageClasses: manageClassesReducer,
    manageRoles: manageRolesReducer,
    manageSkills: manageSkillsReducer,
    manageTeachers : manageTeachersReducer
  },
});

export default store;
