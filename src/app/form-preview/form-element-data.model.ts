export interface FormElementData {
    _id: string,
    parentId: string,
    question: string,
    type: string,
    number: string,
    condition: {
        type: string, 
        value: string
    }
    
}
