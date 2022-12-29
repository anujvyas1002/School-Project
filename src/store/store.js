import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./authenticationSlice";
import manageStudentsReducer from "./manageStudentsSlice";
import manageTeachersReducer from "./manageTeachersSlice";
import manageClassesReducer from "./manageClassesSlice";

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    manageStudents: manageStudentsReducer,
    manageClasses: manageClassesReducer,
    manageTeachers : manageTeachersReducer
  },
});

export default store;
