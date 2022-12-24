import React, { useEffect } from "react";
import { useDispatch ,useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AddBlog from "./componenets/AddBlog";
import Auth from "./componenets/Auth";
import BlogDetail from "./componenets/BlogDetail";
import Blogs from "./componenets/Blogs";
import Navbar from "./componenets/Navbar";
import UserBlogs from "./componenets/UserBlogs";
import { authActions } from "./store";


function App() {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => {
    if(localStorage.getItem('userId')){
      dispatch(authActions.login());
    }

  },[dispatch]);

  return (
    <React.Fragment>
      
      <header>
        <Navbar />
      </header>

      <main>
      <Routes>
       {!isLoggedIn ?(  
       
         <Route path="/auth" element={<Auth />} /> 
       ):(
          <>
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/myblogs" element={<UserBlogs/>} />
          <Route path="/blogs/add" element={<AddBlog />} />
          <Route path="/myBlogs/:id" element={<BlogDetail/>} />
          </>
       )}
        </Routes>
      </main>

    </React.Fragment>
  )
}

export default App;
