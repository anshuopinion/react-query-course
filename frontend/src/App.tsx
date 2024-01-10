import { Blogs } from "./components/blogs/Blogs";
import { Toaster } from "./components/ui/toaster";
import { Route, Routes } from "react-router-dom";
import { EachBlog } from "./pages/each-blog/EachBlog";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blog/:id" element={<EachBlog />} />
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
