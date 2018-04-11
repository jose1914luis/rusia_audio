import {Component, Input} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'custom-header',
  templateUrl: 'custom-header.html'
})
export class CustomHeaderComponent {


  @Input() title: string;
  @Input() events: any;
  toggleSearch: boolean = false;

  constructor() {
  }

  toggleSearchEvent() {
    this.toggleSearch = !this.toggleSearch;
  }

  getItems(ev) {
    /*   let val = ev.target.value;
       if (!val || !val.trim()) {
         this.currentItems = [];
         return;
       }
       this.currentItems = this.items.query({
         name: val
       });*/
  }

  onEvent(event: string, item: any, e: any) {
    if (this.events[event]) {
      this.events[event](item, e);
    }
  }

}
