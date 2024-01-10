import { Blogs } from "./components/blogs/Blogs";
import { Toaster } from "./components/ui/toaster";
import { Route, Routes } from "react-router-dom";
import { EachBlog } from "./pages/each-blog/EachBlog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// Create a client
const queryClient = new QueryClient({
  defaultOptions: {},
});
const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blog/:id" element={<EachBlog />} />
        </Routes>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
