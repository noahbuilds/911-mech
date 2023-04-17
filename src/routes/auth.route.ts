import { Router } from "express";
const router: Router = Router();
import { AuthController } from "../controllers";
import { container } from "tsyringe";

const authController = container.resolve(AuthController);
router.post("/register", authController.createUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);
router.post("/login-passwordless", authController.loginWithAccessCode);
router.post("/verify-access-code", authController.verifyAccessCode);

export { router as authRouter };
