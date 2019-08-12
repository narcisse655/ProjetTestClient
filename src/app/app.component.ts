import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'new angular app';

  constructor(){}

  ngOnInit(): void {
    console.log('AppComponent is create');
  }
  

}
