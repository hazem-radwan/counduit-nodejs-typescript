import { getRepository, Repository } from "typeorm";
import { User } from "../../entities/User";
import {
  checkIfErrors,
  isRegisteredUser,
  validateUserDto,
} from "../../helpers/validation";
import { LoginDTO, StrObject, UserDTO } from "../../types";
import { getDecodedPassword, hashPassword } from "../../helpers/sanitization";
import { feedDataIntoRecord } from "../../helpers/feeder";
import { stringifyErrorObject } from "../../helpers/errorHandler";

export async function createUser(userData: UserDTO) {
  try {
    // validation phase
    const errors = validateUserDto(userData);
    const hasErrors = checkIfErrors(errors);
    if (hasErrors) throw new Error(stringifyErrorObject(errors).toString());

    // user repo
    const userRepo = getRepository(User);

    // user exsistance check  ;
    const isUser = await isRegisteredUser(userData, userRepo);
    if (isUser) throw new Error("this user is alreadty registered...");

    // creating new user  ;
    const user = new User();
    const userRecord = feedDataIntoRecord(user, {
      ...userData,
      password: await hashPassword(userData.password),
    });
    return await userRepo.save(userRecord);
  } catch (err) {
    // catching errors
    throw err;
  }
}

export const login = async (loginData: LoginDTO) => {
  try {
    const userRepo = getRepository(User);
    // check if user does exist ;
    const isUser = await isRegisteredUser(loginData, userRepo);
    if (!isUser) throw new Error("username is not correct");
    //chaeck if password is corerct ;
    const isValidPassword = await getDecodedPassword(
      isUser.password,
      loginData.password
    );
    if (!isValidPassword) throw new Error("password is not correct");
    return isUser;
  } catch (err) {
    throw err;
  }
};
// helper functio
