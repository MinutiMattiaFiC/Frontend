import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
    BrowserRouter as Router,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom";
import Post from "../src/pages/Post";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SinglePost from "./pages/SinglePost";

const route = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<App/>}>
        <Route path={"/Posts"} element={<Post/>} />
        <Route path={"/Posts/"} element={<SinglePost/>} />
        <Route path={"/auth/register"} element={<Register/>} />
        <Route path={"/auth/login"} element={<Login/>} />
    </Route>
    )

)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={route}/>
  </React.StrictMode>,
)
