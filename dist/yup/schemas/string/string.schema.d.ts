import Yup from "../../addMethods";
import { JSONSchema7Extended } from "../../../schema";
/**
 * Initializes a yup string schema derived from a json string schema
 */
declare const createStringSchema: ([key, value]: [string, JSONSchema7Extended], jsonSchema: JSONSchema7Extended) => Yup.StringSchema<string>;
export declare const stringSchemaFormat: ([key, value]: [string, JSONSchema7Extended], Schema: Yup.StringSchema<string>) => Yup.StringSchema<string>;
export default createStringSchema;
