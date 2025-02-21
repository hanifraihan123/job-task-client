import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import MainLayout from "../MainLayout/MainLayout";
import Login from "../Login/Login";
import AddTask from "../AddTask/AddTask";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'addTask',
          element: <AddTask></AddTask>
        }
      ]
    },
  ]);