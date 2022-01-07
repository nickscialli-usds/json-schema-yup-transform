import Yup from "../../addMethods";
/**
 * Initializes a yup null schema. Allows fields to be optional.
 */
declare const createNullSchema: () => Yup.MixedSchema<any>;
export default createNullSchema;
