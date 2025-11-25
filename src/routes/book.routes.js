import { Router } from "express";
import {
  createBook,
  getBooksByUser,
  updateBook,
  deleteBook
} from "../controllers/book.controller.js";

const router = Router();

router.post("/", createBook);

router.get("/user/:userId", getBooksByUser);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

export default router;