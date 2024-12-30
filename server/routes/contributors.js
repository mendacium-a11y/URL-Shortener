import express from "express";
import allContributors from "../controller/contributors.js";

const router = express.Router();

router.get("/allContributors", allContributors);

export default router;