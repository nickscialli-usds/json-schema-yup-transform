import { JSONSchema7 } from "json-schema";
import { SchemaKeywords, DataTypes } from "../schema";
export declare const isConfigError: (errors: ConfigErrors | undefined) => errors is ConfigErrors;
export declare type SchemaItem = [string, JSONSchema7];
declare type NodeTypes = SchemaKeywords | DataTypes;
export declare type ConfigErrorTypes = {
    [key in NodeTypes]?: string;
};
export interface ConfigErrors {
    [key: string]: ConfigErrors | ConfigErrorTypes;
}
export interface Config {
    errors?: ConfigErrors;
}
export {};
