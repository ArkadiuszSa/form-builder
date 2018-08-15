export interface FormElementData {
    _id: string,
    parentId: string,
    question: string,
    type: string,
    number: string,
    show: boolean,
    required: boolean,
    condition: {
        type: string, 
        value: string
    }
    
}
