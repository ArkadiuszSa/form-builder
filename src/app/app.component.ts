import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recruitment-task';
  public actualRoute;
  constructor(
    private router: Router
  ) { }


  ngOnInit(){
    this.router.events.subscribe( (val) => {
    this.actualRoute = this.router.url;
        
    })
  }
}
