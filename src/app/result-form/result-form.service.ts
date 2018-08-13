import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultFormService  {
  public requestDb;
  constructor(){
    this.requestDb = indexedDB.open("AnswerDatabase", 1);
    this.requestDb.onupgradeneeded = function() {
      var db = this.requestDb.result;
      var store = db.createObjectStore("AnswerStore", {keyPath: "_id"});
    };
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

  public testDb1(){
    let self=this;
    console.log(this.requestDb)
    this.requestDb.onsuccess = function() {
      var db = this.requestDb.result;
      var tx = db.transaction("AnswerStore", "readwrite");
      var store = tx.objectStore("AnswerStore");  
      let getChildren = store.getAll()

      getChildren.onsuccess = () => {
        console.log(self.sortList(getChildren.result)); 
      }
      tx.oncomplete = function() {
        db.close;
      }
    }
  }
  public testDb2(){
    let self=this;
    let request = indexedDB.open("AnswerDatabase", 1);
    let requestDb=request;
    console.log(requestDb)
    // requestDb.onupgradeneeded = function() {
    //   var db = requestDb.result;
    //   var store = db.createObjectStore("AnswerStore", {keyPath: "_id"});
    // };
    requestDb.onsuccess = function() {
      var db = requestDb.result;
      var tx = db.transaction("AnswerStore", "readwrite");
      var store = tx.objectStore("AnswerStore");  
      let getChildren = store.getAll()

      getChildren.onsuccess = () => {
        console.log(self.sortList(getChildren.result)); 
      }
      tx.oncomplete = function() {
        db.close;
      }
    }
  }

  public sortList(list){
    function compare(a,b){
      return a.number-b.number;
    }
    return list.sort(compare);
  }
  
}
