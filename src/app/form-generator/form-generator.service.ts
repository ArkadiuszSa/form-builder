import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormGeneratorService {
  public formList = [];
  constructor() { }


  private deleteElement(element) {
    let index= this.formList.indexOf(element);
    this.formList.splice(index,1);
  }

  public deleteElementWithAllChilds(element){
    let childs = this.getChildsForParent(element._id);
    this.deleteElement(element);
    for(let child of childs) {
      this.deleteElementWithAllChilds(child);
    }
  }

  public addElement( parentId ) {
    let _id = new Date().valueOf();
    this.formList.push(
      {
        _id: _id,
        parentId: parentId,
        question: '',
        type: '',
        condition: {
          type: '',
          value: ''
        }

      }
    )
    return _id;
  }

  public getChildsForParent(parentId) {
    return this.formList.filter((element) => {
      if(element.parentId===parentId) {
        return true;
      } else {
        return false;
      }
    })
  }

  public getChildsForParentFromDb(parentId) {
   
    var requestDb = indexedDB.open("FormBuilderDatabase", 1);
    let response = [];
    requestDb.onupgradeneeded = function() {
      var db = requestDb.result;
      var store = db.createObjectStore("FormStore", {keyPath: "_id"});
      let index = store.createIndex("parentIdIndex", ["parentId"])
    };
    return new Promise((resolve, reject)=>{
      requestDb.onsuccess = function() {
        var db = requestDb.result;
        var tx = db.transaction("FormStore", "readwrite");
        var store = tx.objectStore("FormStore");
        var index = store.index("parentIdIndex");
  
        let getChildren = index.getAll([parentId])
  
        getChildren.onsuccess = () => {
          response = getChildren.result;
          resolve(getChildren.result);
        }
  
        tx.oncomplete = function() {
          db.close;
        }
      }
    })
  }


  public updateFormElement(formElement) {
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
  
        let updateFormElement = store.put(formElement)
  
        updateFormElement.onsuccess = () => {
          response = updateFormElement.result;
        }
  
        tx.oncomplete = function() {
          db.close;
        }
      }
  }
  
  public deleteElementWithAllChildsFromDb(elementId) {
    let self=this;
    let response = this.getChildsForParentFromDb(elementId)
    response.then(function(childs){
      self.deleteElementFromDb(elementId)
      if(Array.isArray(childs))
       for(let child of childs) {
          self.deleteElementWithAllChildsFromDb(child._id);
       }
    })
  }

  private deleteElementFromDb(elementId) {
    var requestDb = indexedDB.open("FormBuilderDatabase", 1);

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

      let removeElement = store.delete(elementId)

      removeElement.onsuccess = () => {
      }

      tx.oncomplete = function() {
        db.close
      }
    }
  }

  addElementToDatabase(parentId) {
    var requestDb = indexedDB.open("FormBuilderDatabase", 1);
    let _id = new Date().valueOf();
    requestDb.onupgradeneeded = function() {
      var db = requestDb.result;
      var store = db.createObjectStore("FormStore", {keyPath: "_id"});
      let index = store.createIndex("parentIdIndex", ["parentId"])
    };
    return new Promise((resolve, reject)=>{
      requestDb.onsuccess = function() {
        var db = requestDb.result;
        var tx = db.transaction("FormStore", "readwrite");
        var store = tx.objectStore("FormStore");
      

        store.put({
          _id: _id,
          parentId: parentId,
          question: '',
          type: 'Text',
          condition: {
            type: 'Equals',
            value: ''
          }
        });

        tx.oncomplete = function() {
          db.close
          resolve(_id);
        }
        
      }
    });
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
