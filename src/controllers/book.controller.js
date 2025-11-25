import Book from "../models/book.model.js";
import User from "../models/user.model.js";

export const createBook = async (req, res) => {
  try {
    const { userId, title, author } = req.body;

    if (!userId || !title || !author) {
      return res.status(400).json({ error: "userId, title and author are required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const existing = await Book.findOne({ title, userId });
    if (existing) {
      return res.status(409).json({ error: "This user already has this book." });
    }

    const book = await Book.create({ userId, title, author });
    res.status(201).json(book);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBooksByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Existe el usuario
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const books = await Book.find({ userId }).sort({ createdAt: -1 });
    res.json(books);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author } = req.body;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    // Validar duplicado si se cambia título
    if (title && title !== book.title) {
      const duplicate = await Book.findOne({ title, userId: book.userId });
      if (duplicate) {
        return res.status(409).json({ error: "This user already has a book with this title." });
      }
    }

    book.title = title ?? book.title;
    book.author = author ?? book.author;

    await book.save();

    res.json(book);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Book.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Book not found." });
    }

    res.json({ message: "Book deleted successfully." });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
