import { Component, OnInit } from '@angular/core';
import { FormGeneratorService } from './../form-generator/form-generator.service'
import { FormPreviewElementService } from './../form-preview-element/form-preview-element.service'
import { FormElementData} from './form-element-data.model'
@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.scss']
})
export class FormPreviewComponent implements OnInit {

  public formElements:Array<FormElementData>;
  public saveState = {
    dirty: false,
    valid: true
  }
  constructor(
    public formGeneratorService: FormGeneratorService,
    public formPreviewElementService: FormPreviewElementService

  ) { }

  ngOnInit() {
    this.reloadRootFormElements();
    this.formPreviewElementService.resetAnswerList();
  }

  reloadRootFormElements() {
    let self=this;
    let response = this.formGeneratorService.getChildsForParentFromDb('root');
    response.then(function(resoult){
      self.formElements = resoult as Array<FormElementData>;
      self.formElements.map((element :FormElementData, i: number) => {
        let number:number = i+1
        element.number=number.toString();
        element.parentId='root';
      })
    })
  }

  saveAnswers(){
    let result = this.formPreviewElementService.ifValidSaveToDb();
    this.saveState.dirty = true;
    if(result){
      console.log('weszlo')
      this.saveState.valid = true;
    }else{
      console.log('nieweszlo')

      this.saveState.valid = false;    
    }
  }
}
