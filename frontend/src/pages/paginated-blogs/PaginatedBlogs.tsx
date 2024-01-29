import { useQuery } from "@tanstack/react-query";
import { BlogResponseType } from "@/types";
import { getBlogs } from "@/api";
import { BlogHandler } from "../blogs/BlogHandler";
import { BlogCard } from "../blogs/BlogCard";
export interface BlogsProps {}

export function Blogs(props: BlogsProps) {
  const {} = props;

  const { isLoading, data, error, isError } = useQuery<BlogResponseType>({
    queryKey: ["BLOGS"],
    queryFn: getBlogs,
  });

  const blogs = data?.data;

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
          {blogs
            ?.map((blog) => <BlogCard blog={blog} key={blog._id} />)
            .reverse()}
        </div>
      )}
    </div>
  );
}
