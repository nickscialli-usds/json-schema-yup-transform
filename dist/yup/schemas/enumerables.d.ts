import Yup from "../addMethods";
import { SchemaItem } from "../types";
/**
 * Add enum yup method when schema enum is declared
 */
export declare const createEnumerableSchema: <T extends Yup.Schema<any>>(Schema: T, [key, value]: SchemaItem) => T;
