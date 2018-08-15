export interface FormElementData {
    _id: string,
    parentId: string,
    question: string,
    type: string,
    number: string,
    required: boolean,
    condition: {
        active: boolean,
        type: string, 
        value: string
    }
    
}
