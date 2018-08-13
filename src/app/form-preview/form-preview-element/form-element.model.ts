export interface FormElement {
    question: string,
    type: string,
    number: string,
    condition: {
        active: string,
        type: string, 
        value: string
    }
}
