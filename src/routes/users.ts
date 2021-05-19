import { Router } from "express";
const router = Router();

router.get("/", async (req, res) => {
  return res.status(200).json({
    message: "all users have been retrieved",
  });
});

export const usersRouter = router;
