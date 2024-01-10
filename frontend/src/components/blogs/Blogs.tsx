import { BlogHandler } from "./BlogHandler";
import { BlogCard } from "./BlogCard";
export interface BlogsProps {}

export function Blogs(props: BlogsProps) {
  const {} = props;
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

      <div className="flex justify-center w-full  flex-col items-center  gap-7 mt-8">
        {blogs?.map((blog) => (
          <BlogCard blog={blog} key={blog._id} />
        ))}
      </div>
    </div>
  );
}
