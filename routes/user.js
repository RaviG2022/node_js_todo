import express from "express";
import { getMyDetails, login, logout, register } from "../controller/user.js";
import { isAuthenticate } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", register);

router.post("/login", login);

router.get("/me", isAuthenticate, getMyDetails);

router.get("/logout", logout);

export default router;
