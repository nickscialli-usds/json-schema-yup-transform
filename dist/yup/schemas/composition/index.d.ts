import { JSONSchema7 } from "json-schema";
import Yup from "../../addMethods";
import type { AnyOfSchema7, AllOfSchema7, OneOfSchema7, NotSchema7 } from "../../../schema/types";
/**
 * To validate against anyOf, the given data must be valid against any (one or more) of the given subschemas.
 */
export declare const createAnyOfSchema: ([key, value]: [string, AnyOfSchema7], jsonSchema: JSONSchema7) => Yup.MixedSchema<string>;
/**
 * To validate against allOf, the given data must be valid against all of the given subschemas.
 */
export declare const createAllOfSchema: ([key, value]: [string, AllOfSchema7], jsonSchema: JSONSchema7) => Yup.MixedSchema<string>;
/**
 * To validate against oneOf, the given data must be valid against exactly one of the given subschemas.
 */
export declare const createOneOfSchema: ([key, value]: [string, OneOfSchema7], jsonSchema: JSONSchema7) => Yup.MixedSchema<string>;
/**
 * The not keyword declares that an instance validates if it doesn’t validate against the given subschema.
 */
export declare const createNotSchema: ([key, value]: [string, NotSchema7], jsonSchema: JSONSchema7) => Yup.MixedSchema<string>;
