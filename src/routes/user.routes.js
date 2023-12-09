import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { signupSchema } from "../utils/auth-validator.js";

const router = Router();

router.route("/register").post(validate(signupSchema), registerUser);
router.route("/login").get(loginUser);

export default router;
