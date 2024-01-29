import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BlogResponseType } from "@/types";
import { getPaginatedBlogs } from "@/api";
import { BlogHandler } from "../blogs/BlogHandler";
import { BlogCard } from "../blogs/BlogCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
export interface PaginatedBlogsProps {}

export function PaginatedBlogs(props: PaginatedBlogsProps) {
  const {} = props;
  const [page, setPage] = useState(1);
  const limit = 4;

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery<BlogResponseType>({
      queryKey: ["PAGINATED_BLOGS"],
      queryFn: () => getPaginatedBlogs({ page, limit }),
      placeholderData: keepPreviousData,
    });

  const blogs = data?.data;

  if (isPending)
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
      <>
        {isFetching && <div>Fetching...</div>}
        {isPlaceholderData && <div>Loading...</div>}
      </>
      <div className="mt-8 flex justify-between ">
        <Button>Prev</Button>
        <div className="flex gap-4">
          {new Array(5).fill(0).map((_, i) => (
            <div
              key={i}
              className={`${
                i + 1 === page ? "bg-gray-300" : "bg-gray-100"
              } px-4 py-2 rounded-md`}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <Button>Next</Button>
      </div>
    </div>
  );
}
