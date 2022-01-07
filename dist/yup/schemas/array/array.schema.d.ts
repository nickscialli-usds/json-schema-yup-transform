import { JSONSchema7 } from "json-schema";
import Yup from "../../addMethods";
import { SchemaItem } from "../../types";
/**
 * Initializes a yup array schema derived from a json boolean schema
 */
declare const createArraySchema: ([key, value]: SchemaItem, jsonSchema: JSONSchema7) => Yup.ArraySchema<unknown>;
export default createArraySchema;
