import { JSONSchema7 } from "json-schema";
import { DataTypes } from "./types";
/**
 * Returns a boolean if ID is a required field
 */
export declare const isRequiredField: (schema: JSONSchema7, id: string) => boolean;
/**
 * Hash table to determine field values are
 * the expected data type. Primarily used in Yup Lazy
 * to ensure the field value type are supported
 */
export declare const isTypeOfValue: {
    string: (value?: any) => value is string;
    number: (value?: any) => value is number;
    boolean: (value?: any) => value is boolean;
    object: (value?: any) => boolean;
    null: (value: any) => value is null;
    array: {
        (value?: any): value is any[];
        <T>(value?: any): value is any[];
    };
    integer: (value?: any) => boolean;
};
