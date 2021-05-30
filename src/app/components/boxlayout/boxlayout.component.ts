import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-boxlayout',
  templateUrl: './boxlayout.component.html',
  styleUrls: ['./boxlayout.component.scss']
})
export class BoxlayoutComponent implements OnInit {
  displayTemplates: string = 'lockers';
  @Output() templateData = new EventEmitter<any>();
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
  loadTemplate() {
    let  dataStores =[{ x: 0, y: 0, cols: 1, rows: 10, layoutClass: 'kisoskBlock gridSterBlock' },
    { x: 1, y: 0, cols: 1, rows: 2, layoutClass: 'smLockerBlock gridSterBlock', status: 'b-yellow' },
    { x: 1, y: 2, cols: 1, rows: 2, layoutClass: 'smLockerBlock gridSterBlock', status: 'b-yellow' },
    { x: 1, y: 4, cols: 1, rows: 2, layoutClass: 'smLockerBlock gridSterBlock', status: 'b-yellow' },
    { x: 1, y: 6, cols: 1, rows: 2, layoutClass: 'smLockerBlock gridSterBlock', status: 'b-yellow' },
    { x: 1, y: 8, cols: 1, rows: 2, layoutClass: 'smLockerBlock gridSterBlock', status: 'b-yellow' },
    { x: 2, y: 0, cols: 1, rows: 2, layoutClass: 'smLockerBlock gridSterBlock', status: 'b-yellow' },
    { x: 2, y: 2, cols: 1, rows: 3, layoutClass: 'mdLockerBlock gridSterBlock', status: 'b-red' },
    { x: 2, y: 5, cols: 1, rows: 3, layoutClass: 'mdLockerBlock gridSterBlock', status: 'b-red' },
    { x: 2, y: 8, cols: 1, rows: 3, layoutClass: 'mdLockerBlock gridSterBlock', status: 'b-red' },
    { x: 3, y: 0, cols: 1, rows: 3, layoutClass: 'mdLockerBlock gridSterBlock', status: 'b-red' },
    { x: 3, y: 3, cols: 1, rows: 3, layoutClass: 'mdLockerBlock gridSterBlock', status: 'b-red' },
    { x: 3, y: 6, cols: 1, rows: 3, layoutClass: 'mdLockerBlock gridSterBlock', status: 'b-red' },
    { x: 4, y: 0, cols: 1, rows: 10, layoutClass: 'rentSellerBlock gridSterBlock' },
    { x: 5, y: 0, cols: 1, rows: 4, layoutClass: 'lgLockerBlock gridSterBlock', status: 'b-green' },
    { x: 5, y: 4, cols: 1, rows: 4, layoutClass: 'lgLockerBlock gridSterBlock', status: 'b-green' },
    { x: 5, y: 8, cols: 1, rows: 2, layoutClass: 'smLockerBlock gridSterBlock', status: 'b-yellow' },
    { x: 6, y: 0, cols: 1, rows: 4, layoutClass: 'lgLockerBlock gridSterBlock', status: 'b-green' },
    { x: 6, y: 4, cols: 1, rows: 2, layoutClass: 'smLockerBlock gridSterBlock', status: 'b-yellow' },
    { x: 6, y: 8, cols: 1, rows: 4, layoutClass: 'lgLockerBlock gridSterBlock', status: 'b-green' },
    { x: 7, y: 0, cols: 1, rows: 10, layoutClass: 'kisoskBlock gridSterBlock' }]
    console.log(dataStores.length)
    this.templateData.emit(dataStores)
  }


}
