import { JSONSchema7 } from "json-schema";
import Yup from "./yup/addMethods";
import * as yupTransformer from "./yup";
/**
 * Converts a valid schema to a yup schema
 */
declare const convertToYup: (schema: JSONSchema7, config?: yupTransformer.Config | undefined) => Yup.ObjectSchema<object> | undefined;
export declare type Config = yupTransformer.Config;
export default convertToYup;
