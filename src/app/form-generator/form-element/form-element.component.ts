import { 
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter 
} from '@angular/core';
import { FormGeneratorService } from './../form-generator.service'
import { FormElement } from './form-element.model'
import { FormElementData } from './form-element-data.model'
@Component({
  selector: 'app-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.scss']
})

export class FormElementComponent implements OnInit, OnChanges {
  @Input() formElementData: FormElementData;
  @Input() reciveParentType;
  @Output() removeElement:EventEmitter<any> = new EventEmitter<any>();

  public formElementModel: FormElement = {
    question: '',
    type: 'Text',
    number: '',
    condition: {
      active: false,
      type: 'Equals',
      value: ''
    },
    required: false
  }
  
  public subInputList: Array<FormElementData> = [];
  private lastType: string;
  public parentType: string;
  public sendParentType;
  constructor(
    public formGeneratorService: FormGeneratorService

  ) { }

  ngOnInit() {
    this.reloadChilds();
    this.loadModelFromParent();
  }

  ngOnChanges(){
    this.parentTypeChange();
  }

  loadModelFromParent(){
    this.formElementModel.question = this.formElementData.question;
    this.formElementModel.type = this.formElementData.type;
    this.formElementModel.condition.type = this.formElementData.condition.type;
    this.formElementModel.condition.value = this.formElementData.condition.value;
    this.formElementModel.number = this.formElementData.number;
    this.formElementModel.required = this.formElementData.required;
    this.lastType = this.formElementData.type;
    this.sendParentType=this.formElementModel.type;
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
    this.modelChange();
  }

  parentTypeChange(){
    if(this.reciveParentType === "Number" && this.lastType!=="Number" && this.checkNumber(this.formElementModel.condition.value) ){
      this.formElementModel.condition.value = '';
    }

    if(this.reciveParentType !== "Yes/No" && this.lastType==="Yes/No"){
      this.formElementModel.condition.value = '';
    } 
    this.lastType = this.reciveParentType;
    this.modelChange();
  }

  modelChange(){
    this.sendParentType=this.formElementModel.type;

    this.formGeneratorService.updateFormElement({
      _id: this.formElementData._id,
      parentId: this.formElementData.parentId,
      question: this.formElementModel.question,
      type: this.formElementModel.type,
      required: this.formElementModel.required,
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
