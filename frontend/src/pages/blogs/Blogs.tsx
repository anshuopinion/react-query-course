import { BlogHandler } from "./BlogHandler";
import { BlogCard } from "./BlogCard";
import { useQuery } from "@tanstack/react-query";
import { BlogType } from "@/types";
import { getBlogs } from "@/api";
export interface BlogsProps {}

export function Blogs(props: BlogsProps) {
  const {} = props;

  const {
    isLoading,
    data: blogs,
    error,
    isError,
  } = useQuery<BlogType[]>({
    queryKey: ["BLOGS"],
    queryFn: getBlogs,
  });

  if (isLoading)
    return (
      <div className="flex justify-center w-full  flex-col items-center  gap-7 mt-8">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center w-full  flex-col items-center  gap-7 mt-8 text-red-500">
        {error.message}
      </div>
    );

  return (
    <div className="max-w-md mx-auto">
      <div className="flex  w-full justify-end mt-4">
        <BlogHandler />
      </div>
      {blogs?.length === 0 ? (
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
