import { Router } from "express";
import { blog } from "../../controllers/blog";
import { validate } from "../../validation";
import {
  createBlogSchema,
  getAllPaginationSchema,
  updateBlogSchema,
} from "../../validation/blog";

const router = Router();

router.get("/", blog.getAll);
router.get(
  "/pagination",
  validate(getAllPaginationSchema),
  blog.getAllPagination
);
router.post("/", validate(createBlogSchema), blog.create);
router.get("/:id", blog.getById);
router.put("/", validate(updateBlogSchema), blog.updateById);
router.delete("/:id", blog.deleteById);

export default router;
