import express from "express";
import cors from "cors";
import linkRoute from "./routes/link.js";
import { redirect } from "./controller/notes.js";
import contributorRoute from "./routes/contributors.js";

const app = express();
const port = 3000;
app.use(express.json());

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"], // Explicitly allow your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/links", linkRoute);
app.use("/contributors", contributorRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/r/:key", redirect);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
