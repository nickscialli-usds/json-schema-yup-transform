import { JSONSchema7 } from "json-schema";
import Yup from "../../addMethods";
import { SchemaItem } from "../../types";
/**
 * Initializes a yup boolean schema derived from a json boolean schema
 */
declare const createBooleanSchema: ([key, value]: SchemaItem, jsonSchema: JSONSchema7) => Yup.BooleanSchema<boolean>;
export default createBooleanSchema;
