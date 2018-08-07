import { Component, OnInit } from '@angular/core';
import { FormGeneratorService } from './../form-generator/form-generator.service'
import { FormPreviewElementService } from './../form-preview-element/form-preview-element.service'

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.scss']
})
export class FormPreviewComponent implements OnInit {

  public formElements;
  constructor(
    public formGeneratorService: FormGeneratorService,
    public formPreviewElementService: FormPreviewElementService

  ) { }

  ngOnInit() {
    this.reloadRootFormElements();
    this.formPreviewElementService.resetAnswerList();
    this.formPreviewElementService.getAll();
  }

  reloadRootFormElements() {
    let self=this;
    let response=this.formGeneratorService.getChildsForParentFromDb('root');
    response.then(function(resoult){
      self.formElements = resoult;

      self.formElements.map((element, i) => {
        let number=i+1
        element.number=number.toString();
        element.parentId='root';
      })
    })
  }

  saveAnswers(){
    this.formPreviewElementService.saveAnswersToDb();
  }

  public getAll() {
   
    var requestDb = indexedDB.open("FormBuilderDatabase", 1);
    let response = [];
    requestDb.onupgradeneeded = function() {
      var db = requestDb.result;
      var store = db.createObjectStore("FormStore", {keyPath: "_id"});
      let index = store.createIndex("parentIdIndex", ["parentId"])
    };
    
      requestDb.onsuccess = function() {
        var db = requestDb.result;
        var tx = db.transaction("FormStore", "readwrite");
        var store = tx.objectStore("FormStore");
        var index = store.index("parentIdIndex");
  
        let getChildren = index.getAll()
  
        getChildren.onsuccess = () => {
          response = getChildren.result;
        }
  
        tx.oncomplete = function() {
          db.close;
        }
      }
    
  }

}
