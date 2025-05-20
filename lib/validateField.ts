import { baseSchema, } from "./signupSchema";

type SchemaFields = keyof typeof baseSchema.shape;

export function ValidateField(fieldName: SchemaFields, value: string) {
    const result = baseSchema.shape[fieldName].safeParse(value);
    console.log('result', result);
    return result;

}