import Yup from "../addMethods";
import { SchemaItem } from "../types";
/**
 * Add constant yup method when schema constant is declared
 */
export declare const createConstantSchema: <T extends Yup.Schema<any>>(Schema: T, [key, value]: SchemaItem) => T;
