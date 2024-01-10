import { useParams } from "react-router-dom";

export interface EachBlogProps {}

export function EachBlog(props: EachBlogProps) {
  const {} = props;
  const { id } = useParams();

  return <>{id}</>;
}
