import { Component } from '@angular/core';

@Component({
  selector: 'bottom-navigation',
  templateUrl: 'bottom-navigation.html'
})
export class BottomNavigationComponent {

  text: string;

  constructor() {
    console.log('Hello BottomNavigationComponent Component');
    this.text = 'Hello World';
  }

}
