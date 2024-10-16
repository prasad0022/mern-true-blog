import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar.tsx";
import Home from "./Pages/Home.tsx";
import CreateBlog from "./Pages/CreateBlog.tsx";
import ShowBlog from "./Pages/ShowBlog.tsx";
import EditBlog from "./Pages/EditBlog.tsx";
import Category from "./Pages/Category.tsx";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/create" element={<CreateBlog />} />
        <Route path="/blog/details/:id" element={<ShowBlog />} />
        <Route path="/blog/edit/:id" element={<EditBlog />} />
        <Route path="/blog/category/:categoryName" element={<Category />} />
      </Routes>
    </>
  );
};

export default App;
