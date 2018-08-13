import { Component, OnInit } from '@angular/core';
import { ResultFormService } from './result-form.service'
import { Answer } from './answer.model'
@Component({
  selector: 'app-result-form',
  templateUrl: './result-form.component.html',
  styleUrls: ['./result-form.component.scss']
})
export class ResultFormComponent implements OnInit {
  public answersList:Array<Answer>=[];
  constructor(
    public resultFormService: ResultFormService
  ) { }

  ngOnInit() {
    let self=this;
    this.resultFormService.getAnswersFromDb().then((res:Array<Answer>) => {
      if(Array.isArray(res)){
        self.answersList = res;
      }
    });

    // this.resultFormService.testDb1();
    this.resultFormService.testDb2();
  }

}
