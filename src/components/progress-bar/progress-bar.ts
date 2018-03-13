import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {

  @Input('progress') progress;
  @Input('label') label;

  constructor() {

  }

}
