import { Component, OnInit, Input } from '@angular/core';
import { FormGeneratorService } from './../form-generator/form-generator.service'
import { FormPreviewElementService } from './form-preview-element.service'
@Component({
  selector: 'app-form-preview-element',
  templateUrl: './form-preview-element.component.html',
  styleUrls: ['./form-preview-element.component.scss']
})
export class FormPreviewElementComponent implements OnInit {
  @Input() elementData;

  public formElementModel = {
    question:'',
    type:'',
    number: '',
    condition: {
      active:'',
      type:'',
      value:''
    }
  }
  public answer='';
  public formElements;
  constructor(
    public formGeneratorService: FormGeneratorService,
    public formPreviewElementService: FormPreviewElementService
  ) { }

  ngOnInit() {
    this.formElementModel.question = this.elementData.question;
    this.formElementModel.type = this.elementData.type;
    this.formElementModel.condition = this.elementData.condition;
    this.formElementModel.number = this.elementData.number;

    this.formPreviewElementService.addAnswerToList({
      _id: this.elementData._id,
      parentId: this.elementData.parentId,
      number: this.elementData.number,
      answer: ''
    })
  }

  checkCondition() {
    if(this.formElementModel.condition.type === 'Equals' && this.formElementModel.condition.value === this.answer) {
      this.loadChildren();
    }else if(this.formElementModel.condition.type === 'GratherThan' && this.formElementModel.condition.value < this.answer) {
      this.loadChildren();
    }else if(this.formElementModel.condition.type === 'LessThan' && this.formElementModel.condition.value > this.answer) {
      this.loadChildren();
    }
    else {
      this.formElements=[];
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
      self.formElements = resoult;
      self.formElements.map((element, i) => {
        let number=i+1
        element.number = self.formElementModel.number +'.' +number.toString();
        element.parentId=self.elementData._id;
      })
    })
  }

  radioButtonChecked(val) {
    this.answer = val;
    this.checkCondition();
  }

  checkNumber(val) {
    return isNaN(val);
  }
}
