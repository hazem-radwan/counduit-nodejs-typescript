import { Repository } from "typeorm";
import { User } from "../entities/User";
import { LoginDTO, StrObject, UserDTO } from "../types";

export const validateUserDto = (userDto: UserDTO) => {
  const errors: { [prop: string]: string } = {};
  let { username, email, password } = userDto;
  if (!username) errors.username = "this field is required";
  if (!email) errors.email = "this field is required";
  if (!password) errors.password = "this field is required";
  return errors;
};

export const validateNullDtos = (dto: StrObject) => {
  console.log(dto);
  let errors: StrObject = {};
  Object.keys(dto).forEach((prop) => {
    console.log(prop);
    if (!dto[prop]) errors[prop] = `${prop} field is required`;
  });
  return errors;
};

export const checkIfErrors = (errors: StrObject): boolean => {
  return Object.keys(errors).length > 0 ? true : false;
};

export const isRegisteredUser = async (
  userData: UserDTO,
  userRepo: Repository<User>
) => {
  const user = await userRepo.findOne({
    where: [
      { email: userData.email },
      { username: userData.username ? userData.username : null },
    ],
  });
  if (user) return user;
  return undefined;
};
