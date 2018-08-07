import { Injectable } from '@angular/core';
import {  OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultFormService implements OnInit {

  constructor() {
    console.log('heheszki')
   }


  ngOnInit(){

  }

  public getAll() {
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

  public sortList(list){
    function compare(a,b){
      return a.number-b.number;
    }
    return list.sort(compare);
  }
  
}
