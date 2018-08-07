import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormPreviewElementService {
  public listOfAnswers = [];
  constructor() { }

  public addAnswerToList(answer){
    function findAnswer(element) {
      return element._id === answer._id;
    }
    let index=this.listOfAnswers.findIndex( findAnswer);

    this.listOfAnswers.push(answer);
  }

  public updateAnswer(answer){
    function findAnswer(element) {
      return element._id === answer._id;
    }
    let index=this.listOfAnswers.findIndex( findAnswer);
    if(index!==-1){
      this.listOfAnswers[index]=answer;
    }

  }
  public resetAnswerList(){
    this.listOfAnswers = [] ;
  }

  public saveAnswersToDb() {
    function compare(a,b){
      return a.number-b.number;
    }
    this.listOfAnswers.sort(compare);
    let self=this;
    let clearRequest=this.clearAnswersDb().then( () => {
      for(let answer of this.listOfAnswers ){
        self.addAnswerToDb(answer);
      }
    })
  }

  public ifValidSaveToDb(): boolean{
    let valid = true;
    for( let answer of this.listOfAnswers){
      if( !(typeof answer.question!== 'undefined' && 
      typeof answer.answer!== 'undefined' &&
      answer.question!=='' && answer.answer!=='')
      ){
        valid=false;
      }
    }
    
    if(valid){
      this.saveAnswersToDb();
      return true;
    }else{
      return false;
    }
  }

  public addAnswerToDb(answer){
        var requestDb = indexedDB.open("AnswerDatabase", 1);
    requestDb.onupgradeneeded = function() {
      var db = requestDb.result;
      var store = db.createObjectStore("AnswerStore", {keyPath: "_id"});
    };
      requestDb.onsuccess = function() {
        var db = requestDb.result;
        var tx = db.transaction("AnswerStore", "readwrite");
        var store = tx.objectStore("AnswerStore");
      
        store.put({
          _id: answer._id,
          number:answer.number,
          answer:answer.answer,
          question: answer.question
        });

        tx.oncomplete = function() {
          db.close
        }
        
      }
  }

  public clearAnswersDb(){
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
      
       let clearRequest=store.clear();
       resolve();

        tx.oncomplete = function() {
          db.close
        }
      }
    });
  }

}
