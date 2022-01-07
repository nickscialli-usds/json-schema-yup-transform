import { JSONSchema7 } from "json-schema";
import Yup from "../addMethods";
import { SchemaItem } from "../types";
/**
 * Add required schema should subschema is required
 */
export declare const createRequiredSchema: <T extends Yup.Schema<any>>(Schema: T, jsonSchema: JSONSchema7, [key, value]: SchemaItem) => T;
