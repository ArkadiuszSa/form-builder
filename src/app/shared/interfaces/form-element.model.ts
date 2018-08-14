export interface FormElement {
    question: string,
    type: string,
    number: string,
    condition: {
        active: boolean,
        type: string, 
        value: string
    }
}
