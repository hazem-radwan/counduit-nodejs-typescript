import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { getTokenPayload } from "../helpers/sanitization";
import { isRegisteredUser } from "../helpers/validation";
import { UserDTO } from "../types";

export const isAuthorized = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = <string>req.header("x-auth-token");
    const { email, username } = getTokenPayload(token);
    const userRepo = getRepository(User);
    const user = await isRegisteredUser(<UserDTO>{ email, username }, userRepo);
    if (!user)
      return res.status(401).json({
        message: "unauthorized",
      });
    (req as any).user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      errors: {
        message: err.message,
      },
    });
  }
};
