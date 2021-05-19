import { Router } from "express";
import { createUserController, loginController } from "../controllers/users";
const router = Router();

//login path ;

router.post("/login", loginController);
router.post("/register", createUserController);

export const userRouter = router;
