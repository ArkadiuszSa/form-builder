export interface FormElement {
    question: string,
    type: string,
    number: string,
    required: boolean,
    condition: {
        active: string,
        type: string, 
        value: string
    }
}
