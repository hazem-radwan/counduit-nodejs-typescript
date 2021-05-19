import { StrObject } from "../types";

export function stringifyErrorObject(err: string | StrObject): string {
  //Logic
  // return error object  ;
  // error types : string  and object
  // if string : return  body : {error  : error-message}
  // if object  : return body  : {...errors}
  let errors: StrObject = {};
  if (typeof err === "string") {
    errors.error = err;
  }
  if (typeof err === "object") errors = { ...errors, ...err };
  console.log(errors);
  return JSON.stringify(errors);
}

export const generateJSONSErrorObject = (strError: string): StrObject => {
  let errors: StrObject = {};
  try {
    errors = JSON.parse(strError);
  } catch (e) {
    errors.error = strError;
  }
  return errors;
};
