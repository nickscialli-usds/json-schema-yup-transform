import * as Yup from "yup";
import { JSONSchema7 } from "json-schema";
/**
 * Validates whether input value matches const
 */
export declare function constant(this: Yup.MixedSchema, value: JSONSchema7["const"], message: string): Yup.MixedSchema;
/**
 * Validates whetherinput value is an enum
 */
export declare function enums(this: Yup.MixedSchema, value: JSONSchema7["enum"], message: string): Yup.MixedSchema;
