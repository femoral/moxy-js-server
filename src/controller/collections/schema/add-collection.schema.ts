import Ajv from "ajv";
import { JTDDataType } from "ajv/dist/types/jtd-schema";

const ajv = new Ajv();

export const addCollectionRequestSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      pattern: "^[A-Za-z0-9-_]{4,}$",
    },
  },
  required: ["name"],
  additionalProperties: true,
};

export type CreateCollectionRequest = JTDDataType<
  typeof addCollectionRequestSchema
>;

export const addCollectionValidator = ajv.compile<CreateCollectionRequest>(
  addCollectionRequestSchema
);
