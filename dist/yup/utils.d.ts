import { JSONSchema7 } from "json-schema";
/**
 * Concatenates the schema field path and schema key in order to retrieve error message
 * from configuration
 */
export declare const joinPath: (description: string | undefined, schemaKey: string) => string | false;
/** Retrieves the first item in an object */
export declare const getObjectHead: <T>(obj: T) => false | [string, T[keyof T]];
/** Recursively removes any empty objects */
export declare const removeEmptyObjects: (schema: JSONSchema7) => JSONSchema7;
/** Replace all $ref instances with their definition */
export declare const transformRefs: (schema: JSONSchema7) => JSONSchema7;
/**
 * Add type property to all if schema's using the id of that schema
 * to lookup the type in the properties schema
 * */
export declare const applyIfTypes: (schema: JSONSchema7) => JSONSchema7;
/**
 * Iterate through schema and adds description property with the associated node path
 * This will remove any existing description values!
 */
export declare const applyPaths: (schema: JSONSchema7) => JSONSchema7;
/**
 * Normalizes schema to the required shape. Removes empty objects,
 * replaces $ref values with the related definition and adds
 * missing type properties to if schemas
 */
export declare const normalize: (schema: JSONSchema7) => JSONSchema7;
