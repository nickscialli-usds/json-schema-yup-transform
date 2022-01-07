import { JSONSchema7 } from "json-schema";
import Yup from "../addMethods/";
import { SchemaItem } from "../types";
/**
 * Generate yup validation schema from properties within
 * the valid schema
 */
declare const createValidationSchema: ([key, value]: SchemaItem, jsonSchema: JSONSchema7) => Yup.MixedSchema<any> | Yup.Lazy;
export default createValidationSchema;
