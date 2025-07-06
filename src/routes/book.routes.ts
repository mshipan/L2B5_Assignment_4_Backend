import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getSingleBook,
  updateBook,
} from "../controllers/book.controller";

const router = express.Router();

router.post("/", createBook);
router.get("/", getAllBooks);
router.get("/:id", getSingleBook);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

export const bookRoutes = router;
