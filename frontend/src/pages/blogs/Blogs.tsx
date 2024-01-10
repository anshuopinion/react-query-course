import { BlogHandler } from "./BlogHandler";
import { BlogCard } from "./BlogCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export interface BlogsProps {}

const baseUrl = "http://localhost:400/api";

const getBlogs = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/blogs`);
    return data;
  } catch (error) {
    throw new Error("This is our message");
  }
};

export function Blogs(props: BlogsProps) {
  const {} = props;

  const blogsQuery = useQuery({
    queryKey: ["BLOGS"],
    queryFn: getBlogs,
  });

  console.log("Blogs", blogsQuery?.data);

  const blogs = [
    {
      _id: "1",
      title: "Blog 1",
      content: "Blog 1 content",
    },
    {
      _id: "2",
      title: "Blog 2",
      content: "Blog 2 content",
    },
  ];

  return (
    <div className="max-w-md mx-auto">
      <div className="flex  w-full justify-end mt-4">
        <BlogHandler />
      </div>
      {blogs.length === 0 ? (
        <div>Currently no blogs is Present</div>
      ) : (
        <div className="flex justify-center w-full  flex-col items-center  gap-7 mt-8">
          {blogs?.map((blog) => (
            <BlogCard blog={blog} key={blog._id} />
          ))}
        </div>
      )}
    </div>
  );
}
