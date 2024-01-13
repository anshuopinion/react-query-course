import { BlogType } from "@/types";

import { BlogHandler } from "./BlogHandler";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBlog } from "@/api";
export interface BlogCardProps {
  blog: BlogType;
}

export function BlogCard(props: BlogCardProps) {
  const { blog } = props;
  const { toast } = useToast();
  const cache = useQueryClient();

  const deleteBlogMutation = useMutation({
    mutationKey: ["DELETE_BLOG"],
    mutationFn: deleteBlog,
    onSuccess: () => {
      toast({
        title: "Deleted Successfully",
        description: "Blog deleted successfully",
        variant: "success",
      });
      cache.invalidateQueries({
        queryKey: ["BLOGS"],
      });
    },
    onError: (err) => {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    },
  });
  return (
    <>
      <div
        key={blog._id}
        className="w-full rounded  shadow-sm shadow-stone-400 p-4  items-center  "
      >
        <h1 className="font-bold text-lg">{blog.title}</h1>
        <p className="text-md">{blog.content}</p>
        <div className="flex justify-end gap-4">
          <div>
            <Button
              onClick={() =>
                deleteBlogMutation.mutate({
                  id: blog._id,
                })
              }
              size={"sm"}
              className="bg-red-500 text-white"
            >
              {deleteBlogMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
          <div>
            <BlogHandler blog={blog} isUpdate={true} />
          </div>
          <div>
            <Link to={`/blog/${blog._id}`}>
              <Button size="sm">View</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
