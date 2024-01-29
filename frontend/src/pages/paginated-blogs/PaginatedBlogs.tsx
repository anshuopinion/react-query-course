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
  const limit = 2;
  const { currentPage } = useParams();
  const page = currentPage ? parseInt(currentPage) : 1;

  const navigate = useNavigate();
  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery<BlogResponseType>({
      queryKey: ["PAGINATED_BLOGS", currentPage],
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

  const nextPage = () => {
    if (data?.pagination.last) return;
    navigate(`/paginated/${page + 1}`);
  };
  const prevPage = () => {
    if (data?.pagination.first) return;
    navigate(`/paginated/${page - 1}`);
  };

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
              onClick={prevPage}
              className={`
            ${data.pagination.first ? "cursor-not-allowed  text-gray-300" : ""}
            `}
            />
          </PaginationItem>

          {new Array(data.pagination.totalPages).fill("_").map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => {
                  navigate(`/paginated/${i + 1}`);
                }}
                isActive={page === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={nextPage}
              className={`
            ${data.pagination.last ? "cursor-not-allowed  text-gray-300" : ""}
            `}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className="flex justify-center mt-8">
        {isFetching && <div>Fetching...</div>}
        {isPlaceholderData && <div>Loading...</div>}
      </div>
    </div>
  );
}
