import { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

export const getAllBooks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    if (books.length === 0) {
      res.status(404).json({
        success: false,
        message: " No books are found.",
        data: [],
      });
      return;
    }

    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch books",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    if (data.copies === 0) {
      data.available = false;
    }

    const result = await Book.create(data);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create book",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (typeof data.copies === "number") {
      data.available = data.copies > 0;
    }

    const result = await Book.findByIdAndUpdate(id, data, { new: true });

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update book",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const deleteBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
      return;
    }

    await Borrow.deleteMany({ book: id });

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: deletedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete book",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getSingleBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve book",
      error: error instanceof Error ? error.message : error,
    });
  }
};
