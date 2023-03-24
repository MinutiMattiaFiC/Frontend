import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom";
import PostPage from "../src/pages/Post";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SinglePost from "./pages/SinglePost";
import NewPostPage from "./pages/NewPost";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import MyAccount from "./pages/MyAccount";

    const route = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<App/>}>
        <Route path={"/posts"} element={<PostPage/>} />
        <Route path={""} element={<PostPage/>} />
        <Route path="/posts/:post_id" element={<SinglePost />} />
        <Route path={"/auth/register"} element={<Register/>} />
        <Route path={"/auth/login"} element={<Login/>} />
        <Route path={"/myAccount"} element={
            <ProtectedRoute>
                <MyAccount/>
            </ProtectedRoute>
        } />
        <Route path={"/posts/new"} element={
            <ProtectedRoute>
                <NewPostPage/>
            </ProtectedRoute>
        } />
    </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={route}/>
  </React.StrictMode>,
)
