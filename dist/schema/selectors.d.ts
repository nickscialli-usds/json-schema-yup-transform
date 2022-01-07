import { JSONSchema7, JSONSchema7Definition } from "json-schema";
import { CompositSchemaTypes } from "./types";
/**
 * Retrieve definitions property value
 */
export declare const getDefinitions: (schema: JSONSchema7) => {
    [key: string]: JSONSchema7Definition;
} | undefined;
/**
 * Retrieve definition object from given reference id
 */
export declare const getDefinitionItem: (schema: JSONSchema7, ref: string) => boolean | JSONSchema7 | undefined;
/**
 * Retrieve properties property value
 */
export declare const getProperties: (schema: JSONSchema7) => {
    [key: string]: JSONSchema7Definition;
} | undefined;
export declare const getPropertyType: (propertyItem: JSONSchema7) => "string" | "number" | "boolean" | "object" | "integer" | "array" | "null" | import("json-schema").JSONSchema7TypeName[] | undefined;
export declare const getCompositionType: (propertyItem: JSONSchema7) => false | CompositSchemaTypes | undefined;
/**
 * Retrieve required property value
 */
export declare const getRequired: (schema: JSONSchema7) => string[] | undefined;
/**
 * Returns an item from array items tuple
 */
export declare const getItemsArrayItem: (items: JSONSchema7Definition[], index: number) => boolean | JSONSchema7 | undefined;
