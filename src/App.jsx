import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import CreateTask from "./Components/Tasks/CreateTask";
import Show from "./Components/Tasks/Show";
import EditTask from "./Components/Tasks/EditTask";
let routers = createBrowserRouter([
  {
    path: "/",element: <Layout />,children: [
      { path: "/home", element: <Home /> },
      { path: "/tasks/:id", element: <Show /> },
      { path: "/tasks/:id/edit", element: <EditTask /> },
      { path: "/tasks/create", element: <CreateTask /> },
    ]
  },
  { path: "/register", element: <Register /> },
  { index: true, element: <Login /> },
]);
function App() {

  return <RouterProvider router={routers} />
}

export default App;
