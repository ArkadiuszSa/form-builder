import { Component, OnInit } from '@angular/core';
import { ResultFormService } from './result-form.service'
@Component({
  selector: 'app-result-form',
  templateUrl: './result-form.component.html',
  styleUrls: ['./result-form.component.scss']
})
export class ResultFormComponent implements OnInit {
  public answersList=[];
  constructor(
    public resultFormService: ResultFormService
  ) { }

  ngOnInit() {
    this.answersList.push('')
    this.answersList.push('')
    let self=this;
    this.resultFormService.getAll().then((res)=>{
      if(Array.isArray(res)){
        self.answersList=res;
        console.log(res)
      }
    });
  }

}
