import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

import { DisplayGrid, GridsterConfig, GridsterItem, GridType } from 'angular-gridster2';

@Component({
  selector: 'app-grid-sizes',
  templateUrl: './grid-sizes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GridSizesComponent implements OnInit {
  options!: GridsterConfig;
  dashboard: Array<GridsterItem> = [];

  ngOnInit(): void {
    this.options = {
      gridType: GridType.Fit,
      displayGrid: DisplayGrid.Always,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: true,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellDropCallback: this.emptyCellClick.bind(this),
      emptyCellClickCallback: this.emptyCellClick.bind(this),
      emptyCellContextMenuCallback: this.emptyCellClick.bind(this),
      emptyCellDragCallback: this.emptyCellClick.bind(this),
      pushItems: true,
      draggable: {
        enabled: true
      },
      resizable: {
        enabled: false
      },
      minCols: 10,
      maxCols: 10,
      minRows: 10,
      maxRows: 10,
      maxItemCols: 10,
      minItemCols: 1,
      maxItemRows: 10,
      minItemRows: 1,
      maxItemArea: 10,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      margin:10,
      outerMargin:false,
      disablePushOnDrag: true,
    };

    this.dashboard = [

    ];
    this.options.emptyCellDropCallback = this.newWidgetCallback.bind(this);

  }
  dropStart(rest: any): void {
    console.log('dragged', rest)
  }
  allowDrop(rest: any): void {
    console.log('dragged', rest)
  }
  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  emptyCellClick(event: MouseEvent, item: GridsterItem): void {
    // tslint:disable-next-line:no-console
    console.info('empty cell click', event, item);
    this.dashboard.push(item);
  }
  removeItem($event: MouseEvent | TouchEvent, item: GridsterItem): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem(): void {
    this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1 });
  }
  checkItem(item:any):void {
    console.log(item)
  }
  newWidgetCallback(event: any, item: any): any {
    // do stuff / save to server / etc
    let deviceType = sessionStorage.getItem('box')
    switch (deviceType) {
      case 'kisosk':
        this.dashboard.push({ x: item.x, y: item.y, cols: 1, rows: 10, layoutClass:'kisoskBlock gridSterBlock' });
        break;
      case 'rentSeller':
        this.dashboard.push({  x: item.x, y: item.y, cols: 1, rows: 10, layoutClass:'rentSellerBlock gridSterBlock'});  
      break;
      case 'smlocker':
        this.dashboard.push({  x: item.x, y: item.y, cols: 1, rows: 2, layoutClass:'smLockerBlock gridSterBlock', status: 'b-yellow' });  
      break;
      case 'mdLocker': 
        this.dashboard.push({  x: item.x, y: item.y, cols: 1, rows: 3, layoutClass:'mdLockerBlock gridSterBlock', status: 'b-red' });  
      break;
      case 'lgLocker':
        this.dashboard.push({  x: item.x, y: item.y, cols: 1, rows: 4, layoutClass:'lgLockerBlock gridSterBlock', status: 'b-green' });  
      break;
      case 'xlLocker':
        this.dashboard.push({  x: item.x, y: item.y, cols: 1, rows: 5, layoutClass:'xlLockerBlock gridSterBlock' , status: 'b-yellow' });  
      break;
      case 'sampleTemplate1':
        this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 10, layoutClass:'kisoskBlock gridSterBlock' });
        this.dashboard.push({  x: 1, y: 0, cols: 1, rows: 2, layoutClass:'smLockerBlock gridSterBlock', status: 'b-yellow' }); 
        this.dashboard.push({  x: 1, y: 2, cols: 1, rows: 2, layoutClass:'smLockerBlock gridSterBlock', status: 'b-yellow' }); 
        this.dashboard.push({  x: 1, y: 4, cols: 1, rows: 2, layoutClass:'smLockerBlock gridSterBlock', status: 'b-yellow' }); 
        this.dashboard.push({  x: 1, y: 6, cols: 1, rows: 2, layoutClass:'smLockerBlock gridSterBlock', status: 'b-yellow' });
        this.dashboard.push({  x: 1, y: 8, cols: 1, rows: 2, layoutClass:'smLockerBlock gridSterBlock', status: 'b-yellow' }); 
        this.dashboard.push({  x: 2, y: 0, cols: 1, rows: 2, layoutClass:'smLockerBlock gridSterBlock', status: 'b-yellow' });
        this.dashboard.push({  x: 2, y: 2, cols: 1, rows: 3, layoutClass:'mdLockerBlock gridSterBlock', status: 'b-red' });
        this.dashboard.push({  x: 2, y: 5, cols: 1, rows: 3, layoutClass:'mdLockerBlock gridSterBlock', status: 'b-red' }); 
        this.dashboard.push({  x: 2, y: 8, cols: 1, rows: 3, layoutClass:'mdLockerBlock gridSterBlock', status: 'b-red' });
        this.dashboard.push({  x: 3, y: 0, cols: 1, rows: 3, layoutClass:'mdLockerBlock gridSterBlock', status: 'b-red' }); 
        this.dashboard.push({  x: 3, y: 3, cols: 1, rows: 3, layoutClass:'mdLockerBlock gridSterBlock', status: 'b-red' });
        this.dashboard.push({  x: 3, y: 6, cols: 1, rows: 3, layoutClass:'mdLockerBlock gridSterBlock', status: 'b-red' }); 
        this.dashboard.push({  x: 4, y: 0, cols: 1, rows: 10, layoutClass:'rentSellerBlock gridSterBlock'});
        this.dashboard.push({  x: 5, y: 0, cols: 1, rows: 4, layoutClass:'lgLockerBlock gridSterBlock', status: 'b-green' }); 
        this.dashboard.push({  x: 5, y: 4, cols: 1, rows: 4, layoutClass:'lgLockerBlock gridSterBlock', status: 'b-green' });
        this.dashboard.push({  x: 5, y: 8, cols: 1, rows: 2, layoutClass:'smLockerBlock gridSterBlock', status: 'b-yellow' });      
        this.dashboard.push({  x: 6, y: 0, cols: 1, rows: 4, layoutClass:'lgLockerBlock gridSterBlock', status: 'b-green' }); 
        this.dashboard.push({  x: 6, y: 4, cols: 1, rows: 2, layoutClass:'smLockerBlock gridSterBlock', status: 'b-yellow' });
        this.dashboard.push({  x: 6, y: 8, cols: 1, rows: 4, layoutClass:'lgLockerBlock gridSterBlock', status: 'b-green' });
        this.dashboard.push({ x: 7, y: 0, cols: 1, rows: 10, layoutClass:'kisoskBlock gridSterBlock' });
      break;
      case 'sampleTemplate2':
        this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 10, layoutClass:'kisoskBlock gridSterBlock' });
        this.dashboard.push({  x: 1, y: 0, cols: 1, rows: 2, layoutClass:'smLockerBlock gridSterBlock', status: 'b-yellow' }); 
        this.dashboard.push({  x: 1, y: 2, cols: 1, rows: 2, layoutClass:'smLockerBlock gridSterBlock', status: 'b-yellow' }); 
        this.dashboard.push({  x: 1, y: 4, cols: 1, rows: 2, layoutClass:'smLockerBlock gridSterBlock', status: 'b-yellow' }); 
        this.dashboard.push({  x: 1, y: 6, cols: 1, rows: 2, layoutClass:'smLockerBlock gridSterBlock', status: 'b-yellow' });
        this.dashboard.push({  x: 1, y: 8, cols: 1, rows: 2, layoutClass:'smLockerBlock gridSterBlock', status: 'b-yellow' }); 
        this.dashboard.push({  x: 2, y: 0, cols: 1, rows: 2, layoutClass:'smLockerBlock gridSterBlock', status: 'b-yellow' });
        this.dashboard.push({  x: 2, y: 2, cols: 1, rows: 3, layoutClass:'mdLockerBlock gridSterBlock', status: 'b-red' });
        this.dashboard.push({  x: 2, y: 5, cols: 1, rows: 3, layoutClass:'mdLockerBlock gridSterBlock', status: 'b-red' }); 
        this.dashboard.push({  x: 2, y: 8, cols: 1, rows: 3, layoutClass:'mdLockerBlock gridSterBlock', status: 'b-red' });
        this.dashboard.push({  x: 3, y: 0, cols: 1, rows: 3, layoutClass:'mdLockerBlock gridSterBlock', status: 'b-red' }); 
        this.dashboard.push({  x: 3, y: 3, cols: 1, rows: 3, layoutClass:'mdLockerBlock gridSterBlock', status: 'b-red' });
        this.dashboard.push({  x: 3, y: 6, cols: 1, rows: 3, layoutClass:'mdLockerBlock gridSterBlock', status: 'b-red' }); 
        this.dashboard.push({  x: 4, y: 0, cols: 1, rows: 10, layoutClass:'rentSellerBlock gridSterBlock'});
        this.dashboard.push({  x: 5, y: 0, cols: 1, rows: 4, layoutClass:'lgLockerBlock gridSterBlock', status: 'b-green' }); 
        this.dashboard.push({  x: 5, y: 4, cols: 1, rows: 4, layoutClass:'lgLockerBlock gridSterBlock', status: 'b-green' });
        this.dashboard.push({  x: 5, y: 8, cols: 1, rows: 2, layoutClass:'smLockerBlock gridSterBlock', status: 'b-yellow' });      
        this.dashboard.push({  x: 6, y: 0, cols: 1, rows: 4, layoutClass:'lgLockerBlock gridSterBlock', status: 'b-green' }); 
        this.dashboard.push({  x: 6, y: 4, cols: 1, rows: 2, layoutClass:'smLockerBlock gridSterBlock', status: 'b-yellow' });
        this.dashboard.push({  x: 6, y: 8, cols: 1, rows: 4, layoutClass:'lgLockerBlock gridSterBlock', status: 'b-green' });
        this.dashboard.push({ x: 7, y: 0, cols: 1, rows: 10, layoutClass:'kisoskBlock gridSterBlock' });
      break;
    }
    console.log(item);
  }
}