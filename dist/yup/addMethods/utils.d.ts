import { JSONSchema7Definition } from "json-schema";
/**
 * Checks if input is one of enum
 */
export declare const isValueEnum: (enums: import("json-schema").JSONSchema7Type[] | undefined, value: any) => boolean;
/**
 * Validates the value from the schema items property. In addition,
 * validates const and enums for string, number and integers
 */
export declare const validateItemsArray: (items: JSONSchema7Definition[]) => (item: string | number, index: number) => boolean;
/**
 * Check if each array values is unique
 */
export declare const isUnique: (arr: unknown[]) => boolean;
