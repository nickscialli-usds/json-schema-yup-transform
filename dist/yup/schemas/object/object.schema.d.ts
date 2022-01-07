import { JSONSchema7 } from "json-schema";
import { SchemaItem } from "../../types";
import Yup from "../../addMethods";
/**
 * Initializes a yup object schema derived from a json object schema
 */
declare const createObjectSchema: ([key, value]: SchemaItem, jsonSchema: JSONSchema7) => Yup.ObjectSchema<object>;
export default createObjectSchema;
