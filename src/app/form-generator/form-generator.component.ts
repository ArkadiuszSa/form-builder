import { Component, OnInit } from '@angular/core';
import { FormGeneratorService } from './form-generator.service'
@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.scss']
})
export class FormGeneratorComponent implements OnInit {

  public formElements;
  constructor(
    public formGeneratorService: FormGeneratorService
  ){ }

  ngOnInit() {
    this.reloadRootFormElements();
  }

  addInputOnClick(){
    let self=this;
    let response = this.formGeneratorService.addElementToDatabase('root');
    response.then( (res)=>{
     self.reloadRootFormElements();
    })
  }

  reloadRootFormElements() {
    let self=this;
    let response=this.formGeneratorService.getChildsForParentFromDb('root');
    response.then(function(resoult){
      self.formElements = resoult;

      self.formElements.map((element, i) => {
        let number=i+1
        element.number=number.toString();
      })
    })
  }

  removeChild($event){
    let index= this.formElements.indexOf($event);
    this.formElements.splice(index,1);    
  }
}
