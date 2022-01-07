import { JSONSchema7 } from "json-schema";
import Yup from "../addMethods/";
/**
 * Iterates through a valid JSON Schema and generates yup field level
 * and object level schema
 */
export declare const build: (jsonSchema: JSONSchema7) => Yup.ObjectSchema<object> | undefined;
export default build;
