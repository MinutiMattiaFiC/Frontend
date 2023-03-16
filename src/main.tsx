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

const route = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<App/>}>
        <Route path={"/Posts"} element={<Post/>} />
        <Route path={"/auth/register"} element={<Register/>} />
    </Route>
    )

)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={route}/>
  </React.StrictMode>,
)
