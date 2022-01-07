import { JSONSchema7 } from "json-schema";
import Yup from "../../addMethods";
import { SchemaItem } from "../../types";
/**
 * Initializes a yup number schema derived from a json number schema
 */
declare const createNumberSchema: ([key, value]: SchemaItem, jsonSchema: JSONSchema7) => Yup.NumberSchema<number>;
/**
 * Generates a yup number schema instance that is used for both number and integer schema
 */
export declare const createBaseNumberSchema: (Schema: Yup.NumberSchema<number>, [key, value]: SchemaItem, jsonSchema: JSONSchema7) => Yup.NumberSchema<number>;
export default createNumberSchema;
