import { RequestHandler } from "express";
import Blog from "../../models/blog";
import { InternalServerError, Conflict, NotFound } from "http-errors";
import {
  CreateBlogType,
  DeleteByIdType,
  GetByIdType,
  UpdateBlogType,
} from "../../validation/blog";

import { validateObjectId } from "../../utils/validateObjectId";

const getAll: RequestHandler = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  try {
    const blogs = await Blog.find().skip(skip).limit(Number(limit));
    const totalBlogs = await Blog.countDocuments();
    if (blogs.length === 0) next(NotFound("No blogs found"));

    const totalPages = Math.ceil(totalBlogs / Number(limit));
    const isLastPage = Number(page) === totalPages;
    const isFirstPage = Number(page) === 1;

    return res.json({
      data: blogs,
      pagination: {
        totalPages,
        first: isFirstPage,
        last: isLastPage,
      },
    });
  } catch (error) {
    next(InternalServerError());
  }
};

const create: RequestHandler<{}, any, CreateBlogType["body"]> = async (
  req,
  res,
  next
) => {
  try {
    const { title, content } = req.body;
    const exisitingBlog = await Blog.findOne({ title });
    if (exisitingBlog) next(Conflict("Blog already exists"));
    const blog = await Blog.create({ title, content });
    res.json(blog);
  } catch (error) {
    next(InternalServerError());
  }
};

const getById: RequestHandler<GetByIdType["params"]> = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;
    validateObjectId(id, next);
    const blog = await Blog.findById(id);
    if (!blog) next(NotFound("Blog not found"));
    return res.json(blog);
  } catch (error) {
    next(InternalServerError());
  }
};

const updateById: RequestHandler<{}, any, UpdateBlogType["body"]> = async (
  req,
  res,
  next
) => {
  try {
    const { title, content, id } = req.body;
    validateObjectId(id, next);
    const exisitingBlog = await Blog.findById(id);

    if (!exisitingBlog) next(NotFound("Blog not found"));

    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.json(blog);
  } catch (error) {
    next(InternalServerError());
  }
};

const deleteById: RequestHandler<DeleteByIdType["params"]> = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;
    validateObjectId(id, next);
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) next(NotFound("Blog not found"));
    res.json(blog);
  } catch (error) {
    next(InternalServerError());
  }
};

export const blog = { getAll, create, getById, updateById, deleteById };
