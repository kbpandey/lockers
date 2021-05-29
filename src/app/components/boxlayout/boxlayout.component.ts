import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boxlayout',
  templateUrl: './boxlayout.component.html',
  styleUrls: ['./boxlayout.component.scss']
})
export class BoxlayoutComponent implements OnInit {
  displayTemplates: string = 'lockers';

  constructor() { }

  ngOnInit(): void {
  }
  drag(_esa: any, itemName:string):void {
    sessionStorage.setItem('box',itemName)
    console.log('dragged',_esa)
    
  }
  displayTemplateLockers(displayType:string) {
    this.displayTemplates = displayType
  }
  

}
