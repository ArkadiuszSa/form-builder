import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultFormService  {
  public requestDb;
  constructor(){
  }

  public getAnswersFromDb() {
   let self=this;
    var requestDb = indexedDB.open("AnswerDatabase", 1);
    requestDb.onupgradeneeded = function() {
      var db = requestDb.result;
      var store = db.createObjectStore("AnswerStore", {keyPath: "_id"});
    };
    return new Promise((resolve, reject)=>{
      requestDb.onsuccess = function() {
        var db = requestDb.result;
        var tx = db.transaction("AnswerStore", "readwrite");
        var store = tx.objectStore("AnswerStore");  
        let getChildren = store.getAll()
  
        getChildren.onsuccess = () => {
          resolve(self.sortList(getChildren.result)); 
        }
        tx.oncomplete = function() {
          db.close;
        }
      }
    });
  }

  public sortList(answersList){

    let compare = (a,b)=>{
      return a.number.replace(/\./g,'') > b.number.replace(/\./g,'');
    }
    return answersList.sort(compare);
  }
  
}
