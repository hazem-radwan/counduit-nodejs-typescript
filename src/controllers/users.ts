import { Response, Request } from "express";
import { generateJSONSErrorObject } from "../helpers/errorHandler";
import { generateToken, sanitizeUser } from "../helpers/sanitization";
import { createUser, login } from "../services/users/user";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const user = await createUser(body);
    console.log(user);
    return res.status(201).json({
      message: "user has been created successfully...",
      user: sanitizeUser(user),
    });
  } catch (err) {
    return res.status(422).json({
      erorrs: {
        body: generateJSONSErrorObject(err.message),
      },
    });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const user = await login(body);

    //generate JWT
    const token = generateToken(
      { email: user.email, username: user.username },
      process.env.JWT_SECRET ? process.env.JWT_SECRET : ""
    );

    return res.status(201).json({
      message: "user has been created successfully...",
      user: sanitizeUser(user),
      token,
    });
  } catch (err) {
    return res.status(422).json({
      erorrs: {
        body: generateJSONSErrorObject(err.message),
      },
    });
  }
};
