import { NextFunction, Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { book, quantity, dueDate } = req.body;

    const foundBook = await Book.findById(book);
    if (!foundBook) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    if (foundBook.copies < quantity) {
      res.status(400).json({
        success: false,
        message: "Not enough copies available",
        error: "Insufficient stock",
      });
      return;
    }

    foundBook.copies -= quantity;
    foundBook.updateAvailability();

    if (foundBook.copies === 0) foundBook.available = false;
    await foundBook.save();

    const borrowRecord = await Borrow.create({ book, quantity, dueDate });
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowRecord,
    });
  } catch (error) {
    next(error);
  }
};

export const getBorrowSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
          dueDate: { $first: "$dueDate" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $project: {
          title: "$book.title",
          isbn: "$book.isbn",
          totalQuantity: 1,
          dueDate: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    res.json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Summary failed", error });
  }
};
