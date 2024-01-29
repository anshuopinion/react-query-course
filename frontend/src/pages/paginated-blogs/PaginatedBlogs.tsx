import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BlogResponseType } from "@/types";
import { getPaginatedBlogs } from "@/api";
import { BlogHandler } from "../blogs/BlogHandler";
import { BlogCard } from "../blogs/BlogCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate, useParams } from "react-router-dom";
export interface PaginatedBlogsProps {}

export function PaginatedBlogs(props: PaginatedBlogsProps) {
  const {} = props;

  const { currentPage } = useParams();
  const navigate = useNavigate();
  const page = currentPage ? parseInt(currentPage) : 1;

  const { isPending, data, error, isError, isFetching } =
    useQuery<BlogResponseType>({
      queryKey: ["PaginatedBlogs", page],
      queryFn: () => getPaginatedBlogs({ page, limit: 2 }),
      placeholderData: keepPreviousData,
    });

  const blogs = data?.data;

  const totalPages = data?.pagination.totalPages;

  const nextPage = () => {
    if (data?.pagination.last) return;
    navigate(`/paginated/${page + 1}`);
  };

  const prevPage = () => {
    if (data?.pagination.first) return;
    navigate(`/paginated/${page - 1}`);
  };

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

      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={`
            
            ${data?.pagination.first ? "opacity-50 cursor-not-allowed" : ""}
            `}
              onClick={prevPage}
            />
          </PaginationItem>
          {new Array(totalPages).fill("_").map((_, i) => (
            <PaginationItem>
              <PaginationLink
                isActive={i + 1 === page}
                onClick={() => {
                  navigate(`/paginated/${i + 1}`);
                }}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              className={`
            
            ${data?.pagination.last ? "opacity-50 cursor-not-allowed" : ""}
            `}
              onClick={nextPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className="flex justify-center">
        {isFetching && <div>Fetching...</div>}
      </div>
    </div>
  );
}
