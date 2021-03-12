import { ValidationError } from "../../common/error/validation.error";

const VALID_COLLECTION_NAME_REGEX = /^[A-Za-z-_]{4,}$/;

export function validateName(name: string) {
  if (!VALID_COLLECTION_NAME_REGEX.test(name)) {
    throw new ValidationError("invalid collection name");
  }
}
