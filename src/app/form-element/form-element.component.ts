import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGeneratorService } from './../form-generator/form-generator.service'
import { FormElement } from './form-element.model'
import { FormElementData } from './form-element-data.model'
@Component({
  selector: 'app-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.scss']
})

export class FormElementComponent implements OnInit {
  @Input() formElementData: FormElementData;
  @Output() removeElement:EventEmitter<any> = new EventEmitter<any>();

  public formElementModel: FormElement = {
    question: '',
    type: 'Text',
    number: '',
    condition: {
      active: false,
      type: 'Equals',
      value: ''
    }
  }
  
  public subInputList: Array<FormElementData> = [];
  private lastType: string;
  constructor(
    public formGeneratorService: FormGeneratorService

  ) { }

  ngOnInit() {
    this.reloadChilds();
    this.formElementModel.question = this.formElementData.question;
    this.formElementModel.type = this.formElementData.type;
    this.formElementModel.condition.type = this.formElementData.condition.type;
    this.formElementModel.condition.value = this.formElementData.condition.value;
    this.formElementModel.number = this.formElementData.number;
    this.lastType = this.formElementData.type;
  }

  addSubInput(){
    let self = this;
    let response = this.formGeneratorService.addElementToDatabase(this.formElementData._id);
    response.then( (res) => {
     self.reloadChilds();
    })
  }

  deleteOnClick() {
    this.removeElement.emit(this.formElementData);
    this.formGeneratorService.deleteElementWithAllChildsFromDb(this.formElementData._id);
  }

  removeChild($event){
    let index= this.subInputList.indexOf($event);
    this.subInputList.splice(index,1);
   
    if(this.subInputList.length===0){
      this.formElementModel.condition.active = false;
    }else {
      this.formElementModel.condition.active = true;
    }
  }

  reloadChilds(){
    let self=this;
    let response=this.formGeneratorService.getChildsForParentFromDb(this.formElementData._id);
    response.then(function(resoult){
      if(Array.isArray(resoult))
      self.subInputList = resoult;
      self.subInputList.map((element, i) => {
        let number=i+1
        element.number = self.formElementModel.number +'.' +number.toString();
      })

      if(self.subInputList.length===0){
        self.formElementModel.condition.active = false;
      }else {
        self.formElementModel.condition.active = true;
      }
    })
  }

  typeChange(){
    if(this.formElementModel.type!=="Number"){
      this.formElementModel.condition.type="Equals"
    }
  }

  modelChange(){
    if(this.formElementModel.type === "Number" && this.lastType!=="Number" && this.checkNumber(this.formElementModel.condition.value) ){
      this.formElementModel.condition.value = '';
    }
    this.lastType=this.formElementModel.type;
    this.formGeneratorService.updateFormElement({
      _id: this.formElementData._id,
      parentId: this.formElementData.parentId,
      question: this.formElementModel.question,
      type: this.formElementModel.type,
      condition: {
        type: this.formElementModel.condition.type,
        value: this.formElementModel.condition.value
      }
    })
  }

  radioButtonChecked(val){
    this.formElementModel.condition.value=val;
    this.modelChange();
  }

  checkNumber(val){
    return isNaN(val);
  }

}
