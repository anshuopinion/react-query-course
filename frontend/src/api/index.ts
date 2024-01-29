import { Axios } from "./axios";

export const getBlogs = async () => {
  try {
    const { data } = await Axios.get(`/blogs`);
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getPaginatedBlogs = async () => {
  try {
    const { data } = await Axios.get(`/blogs/pagination`);
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
export const updateBlog = async ({
  title,
  content,
  id,
}: {
  title: string;
  content: string;
  id: string;
}) => {
  try {
    const { data } = await Axios.put(`/blogs`, { title, content, id });
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const deleteBlog = async ({ id }: { id: string }) => {
  try {
    const { data } = await Axios.delete(`/blogs/${id}`);
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getBlog = async ({ id }: { id: string }) => {
  try {
    const { data } = await Axios.get(`/blogs/${id}`);
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};
