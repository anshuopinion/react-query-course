import { BlogType } from "@/types";

import { BlogHandler } from "./BlogHandler";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export interface BlogCardProps {
  blog: BlogType;
}

export function BlogCard(props: BlogCardProps) {
  const { blog } = props;

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
            <Button size={"sm"} className="bg-red-500 text-white">
              Delete
            </Button>
            <div>
              <Link to={`/blog/${blog._id}`}>
                <Button>View</Button>
              </Link>
            </div>
          </div>
          <div>
            <BlogHandler blog={blog} isUpdate={true} />
          </div>
        </div>
      </div>
    </>
  );
}
