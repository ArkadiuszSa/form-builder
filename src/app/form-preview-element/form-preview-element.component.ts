import { Component, OnInit, Input } from '@angular/core';
import { FormGeneratorService } from './../form-generator/form-generator.service'
import { FormPreviewElementService } from './form-preview-element.service'
import { FormElement } from './form-element.model'
import { FormElementData } from './form-element-data.model'
@Component({
  selector: 'app-form-preview-element',
  templateUrl: './form-preview-element.component.html',
  styleUrls: ['./form-preview-element.component.scss']
})
export class FormPreviewElementComponent implements OnInit {
  @Input() elementData: FormElementData;

  public formElementModel:FormElement = {
    question:'',
    type:'',
    number: '',
    condition: {
      active: '',
      type:'',
      value:''
    }
  }
  public answer: string = '';
  public formElements: Array<FormElementData>;
  constructor(
    public formGeneratorService: FormGeneratorService,
    public formPreviewElementService: FormPreviewElementService
  ) { }

  ngOnInit() {
    console.log(this.elementData)
    this.formElementModel.question = this.elementData.question;
    this.formElementModel.type = this.elementData.type;
    this.formElementModel.condition.type = this.elementData.condition.type;
    this.formElementModel.condition.value = this.elementData.condition.value;
    this.formElementModel.number = this.elementData.number;

    this.formPreviewElementService.addAnswerToList({
      _id: this.elementData._id,
      parentId: this.elementData.parentId,
      number: this.elementData.number,
      answer: ''
    })
  }

  checkCondition() {
    console.log('odpalam')
    console.log(this.formElementModel.condition.type)
    console.log(this.formElementModel.condition.value)
    console.log(this.answer)
    if( (this.formElementModel.condition.type === 'Equals' && this.formElementModel.condition.value === this.answer) ||
        (this.formElementModel.condition.type === 'GratherThan' && this.formElementModel.condition.value < this.answer) ||
        (this.formElementModel.condition.type === 'LessThan' && this.formElementModel.condition.value > this.answer) 
    ){
      console.log('ładuje dzieci')
      this.loadChildren();
    }
    else {
      this.formPreviewElementService.removeChildsFromList(this.elementData)
      this.formElements = [];
    }

    this.formPreviewElementService.updateAnswer({
      _id: this.elementData._id,
      parentId: this.elementData.parentId,
      number: this.elementData.number,
      answer: this.answer,
      type: this.formElementModel.type,
      question: this.formElementModel.question
    })
  }

  loadChildren() {
    let self=this;
    let response=this.formGeneratorService.getChildsForParentFromDb(this.elementData._id);
    response.then(function(result){
      if(Array.isArray(result)){
        console.log(result)
        self.formElements = self.filterForBlankQuestions(result);
        console.log(self.formElements)
      }
      self.formElements.map((element :FormElementData, i:number) => {
        let number:number =i+1
        element.number = self.formElementModel.number +'.' +number.toString();
        element.parentId=self.elementData._id;
      })
    })
  }

  filterForBlankQuestions(list:Array<FormElementData>) {
    let filtredList = list.filter( (element)=>{
      return typeof element.question!=='undefined'&& element.question!==''
    })
    return filtredList;
  }

  radioButtonChecked(val:string) {
    this.answer = val;
    this.checkCondition();
  }

  checkNumber(val:any): boolean {
    return isNaN(val);
  }
}
