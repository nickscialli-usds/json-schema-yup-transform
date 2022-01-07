import { JSONSchema7 } from "json-schema";
import Yup from "../../addMethods";
import { SchemaItem } from "../../types";
/**
 * Initializes a yup integer schema derived from a json humber schema
 */
declare const createIntegerSchema: ([key, value]: SchemaItem, jsonSchema: JSONSchema7) => Yup.NumberSchema<number>;
export default createIntegerSchema;
