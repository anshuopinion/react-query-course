import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BlogResponseType } from "@/types";
import { getPaginatedBlogs } from "@/api";
import { BlogHandler } from "../blogs/BlogHandler";
import { BlogCard } from "../blogs/BlogCard";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export interface PaginatedBlogsProps {}

export function PaginatedBlogs(props: PaginatedBlogsProps) {
  const {} = props;
  const [page, setPage] = useState(1);
  const limit = 2;

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery<BlogResponseType>({
      queryKey: ["PAGINATED_BLOGS", page],
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

      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>

          {new Array(data.pagination.totalPages).fill("_").map((_, i) => (
            <PaginationItem>
              <PaginationLink
                onClick={() => setPage(i + 1)}
                isActive={page === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
