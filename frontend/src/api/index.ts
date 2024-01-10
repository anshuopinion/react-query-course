import { Axios } from "./axios";

export const getBlogs = async () => {
  try {
    const { data } = await Axios.get(`/blogs`);
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const createBlog = async ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  try {
    const { data } = await Axios.post(`/blogs`, { title, content });
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};
