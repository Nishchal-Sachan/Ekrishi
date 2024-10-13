import express from "express";
import { shouldBeAdmin, shouldBeLoggedIn } from "../controllers/test.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/should-be-loggedin", verifyToken, shouldBeLoggedIn);
router.get("/should-be-admin", shouldBeAdmin);

export default router;
