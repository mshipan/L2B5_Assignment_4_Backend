import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      enum: [
        "fiction",
        "non_fiction",
        "science",
        "history",
        "biography",
        "fantasy",
      ],
      required: true,
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number"],
    },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

bookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0;
};

bookSchema.pre<IBook>("save", function (next) {
  this.updateAvailability();
  next();
});

export const Book = model<IBook>("Book", bookSchema);
