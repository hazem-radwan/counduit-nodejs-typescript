import { StrObject } from "../types";

export function feedDataIntoRecord(record: StrObject, data: StrObject) {
  Object.keys(data).forEach((prop) => (record[prop] = data[prop]));
  return record;
}
