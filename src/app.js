import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import bookRoutes from "./routes/book.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/books", bookRoutes);

export default app;