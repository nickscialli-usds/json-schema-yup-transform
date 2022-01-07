import * as Yup from "yup";
import { JSONSchema7Definition } from "json-schema";
/**
 * Validates that array length is more or equal to that
 * of the schema minimumItems property
 */
export declare function minimumItems(this: Yup.ArraySchema<unknown>, count: number, message: string): Yup.ArraySchema<unknown>;
/**
 * Validates that array length is less or equal to that
 * of the schema maximumItems property
 */
export declare function maximumItems(this: Yup.ArraySchema<unknown>, count: number, message: string): Yup.ArraySchema<unknown>;
/**
 * Validates the `contains` schema has one or more items in the array
 * equates to the data type of the schema type property
 */
export declare function contains(this: Yup.ArraySchema<unknown>, value: string, message: string): Yup.ArraySchema<unknown>;
/**
 * Validates the items schema property as a tuple. The array is a collection
 * of items where each has a different schema and the ordinal index of
 * each item is meaningful
 */
export declare function tuple(this: Yup.ArraySchema<unknown>, items: JSONSchema7Definition[], message: string): Yup.ArraySchema<unknown>;
/**
 * Validates the given array values are unique
 */
export declare function uniqueItems(this: Yup.ArraySchema<unknown>, enable: boolean, message: string): Yup.ArraySchema<unknown>;
