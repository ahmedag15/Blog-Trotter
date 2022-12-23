import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AddBlog from "./componenets/AddBlog";
import Auth from "./componenets/Auth";
import BlogDetail from "./componenets/BlogDetail";
import Blogs from "./componenets/Blogs";
import Navbar from "./componenets/Navbar";
import UserBlogs from "./componenets/UserBlogs";


function App() {

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);
  
  return (
    <React.Fragment>
      
      <header>
        <Navbar />
      </header>

      <main>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/myblogs" element={<UserBlogs/>} />
          <Route path="/myblogs/:id" element={<BlogDetail/>} />
          <Route path="/blogs/add" element={<AddBlog />} />

        </Routes>
      </main>

    </React.Fragment>
  )
}

export default App;
