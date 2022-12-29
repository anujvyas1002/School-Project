import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

import { Login } from "./pages/Authentication/Login";
import { Registration } from "./pages/Authentication/Registration";
import { HomeLayout } from "./components/HomeLayout";
import { SchoolLayout } from "./components/SchoolLayout";
import { StudentTable } from "./pages/ManageStudents/StudentTable";
import { NotFound } from "./components/NotFound";
import Main from "./pages/dashboard/Main";
import { TeacherTable } from "./pages/ManageTeachers/TeacherTable";
import { ClassTable } from "./pages/ManageClasses/ClassTable";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Route>

          <Route element={<SchoolLayout />}>
          <Route path="/manageTeachers" index element={<TeacherTable/>}/>
            <Route path="/manageClasses" index element={<ClassTable/>}/>
            <Route path="/manageStudents" index element={<StudentTable />} />
            <Route path="/dashboard" element={<Main />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;

