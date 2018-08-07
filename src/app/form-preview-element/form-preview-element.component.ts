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

    if( (this.formElementModel.condition.type === 'Equals' && this.formElementModel.condition.value === this.answer) ||
        (this.formElementModel.condition.type === 'GratherThan' && this.formElementModel.condition.value < this.answer) ||
        (this.formElementModel.condition.type === 'LessThan' && this.formElementModel.condition.value > this.answer) 
    ){
      this.loadChildren();
    }
    else {
      this.formElements = [];
    }

    this.formPreviewElementService.updateAnswer({
      _id: this.elementData._id,
      parentId: this.elementData.parentId,
      number: this.elementData.number,
      answer: this.answer,
      question: this.formElementModel.question
    })
  }

  loadChildren() {
    let self=this;
    let response=this.formGeneratorService.getChildsForParentFromDb(this.elementData._id);
    response.then(function(resoult){
      self.formElements = resoult as Array<FormElementData>;
      self.formElements.map((element :FormElementData, i:number) => {
        let number:number =i+1
        element.number = self.formElementModel.number +'.' +number.toString();
        element.parentId=self.elementData._id;
      })
    })
  }

  radioButtonChecked(val:string) {
    this.answer = val;
    this.checkCondition();
  }

  checkNumber(val:any): boolean {
    return isNaN(val);
  }
}
