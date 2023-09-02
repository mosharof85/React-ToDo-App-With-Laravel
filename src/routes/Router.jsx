import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Tasks from "../pages/tasks/Tasks";
import PrivateRoute from "../components/PrivateRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/tasks" element={<Tasks />}></Route>
      </Route>
    </Route>
  )
);

export default router;
