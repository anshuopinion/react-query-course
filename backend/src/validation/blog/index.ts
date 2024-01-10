import { z } from "zod";

export const getByIdSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "id is required",
    }),
  }),
});

export const deleteByIdSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "id is required",
    }),
  }),
});

export const createBlogSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    content: z.string({
      required_error: "Content is required",
    }),
  }),
});

export const updateBlogSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: "id is required",
    }),
    title: z.string().optional(),
    content: z.string().optional(),
  }),
});

// Generate TypeScript types from Zod schemas
export type CreateBlogType = z.infer<typeof createBlogSchema>;
export type UpdateBlogType = z.infer<typeof updateBlogSchema>;
export type GetByIdType = z.infer<typeof getByIdSchema>;
export type DeleteByIdType = z.infer<typeof deleteByIdSchema>;
