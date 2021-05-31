import { Input, ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation  } from '@angular/core';

import { DisplayGrid, GridsterConfig, GridsterItem, GridType } from 'angular-gridster2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-grid-sizes',
  templateUrl: './grid-sizes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GridSizesComponent implements OnInit {
  @Input()  parentSubject!: Subject<any>;
  templateName:string = '';
  templates:[] = [];
  savedTemplates:any = []
  tempStatus:string = '';
  tempLockerNumber:number = 0
  dashboard: Array<GridsterItem> = [];
  minColums: number = 10;
  maxColumns: number = 10;
  minRows: number = 10;
  maxRows: number = 10;
  selectedItem: any = []
  options: GridsterConfig = {
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
    minCols: this.minColums,
    maxCols: this.maxColumns,
    minRows: this.minRows,
    maxRows: this.maxRows,
    maxItemCols: 10,
    minItemCols: 1,
    maxItemRows: 10,
    minItemRows: 1,
    maxItemArea: 10,
    minItemArea: 1,
    defaultItemCols: 1,
    defaultItemRows: 1,
    margin: 10,
    outerMargin: false,
    disablePushOnDrag: true,
  };
  constructor(private modalService: NgbModal) { }
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
      minCols: this.minColums,
      maxCols: this.maxColumns,
      minRows: this.minRows,
      maxRows: this.maxRows,
      maxItemCols: 10,
      minItemCols: 1,
      maxItemRows: 10,
      minItemRows: 1,
      maxItemArea: 10,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      margin: 10,
      outerMargin: false,
      disablePushOnDrag: true,
    };
    this.dashboard = [

    ];
    let templateDataS:any = sessionStorage.getItem('savedTemplate')!==null? sessionStorage.getItem('savedTemplate') : [];
    this.savedTemplates = templateDataS.length > 0 ? JSON.parse(templateDataS) : []
    var self = this
    this.parentSubject.subscribe(event => {
      self.dashboard = event;
      console.log(event)
    });
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
  onChange(data: any) {
    switch (data.target.value) {
      case 'Available':
        console.log(data.target.value)
        this.tempStatus = 'b-green';
        break
      case 'In Use':
        console.log(data.target.value)
        this.tempStatus = 'b-yellow';
        break
      case 'Reserved':
        console.log(data.target.value)
        this.tempStatus = 'b-red';
        break
      case 'Disabled':
        console.log(data.target.value)
        this.tempStatus = 'b-grey';
        break
    }
     
  }
  onKeyup(data: any) {

    this.tempLockerNumber = data.target.value
  }
  saveKeyUp(data:any) {
    this.templateName = data.target.value;  
  }
  deleteButton(item: any) {
    console.log(item)
    this.selectedItem = item;
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }
  editButton(item: any, content: any) {
    this.selectedItem = item
    this.modalService.open(content, { size: 'sm' });
  }
  closeEditPanel(selectedData: any) {
    console.log('seletedData', selectedData, this.dashboard)
    this.selectedItem.status = this.tempStatus;
    this.selectedItem.lockerNumber = this.tempLockerNumber
    this.dashboard.forEach((element: GridsterItem, index) => {
      console.log(element)
      if (selectedData.x === element.x && selectedData.y === element.y) {
        this.dashboard[index] = selectedData;
      }
    });
    this.modalService.dismissAll()
  }
  addItem(): void {
    this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1 });
  }
  checkItem(item: any): void {
    console.log(item)
  }
  loadTemplate(item: any) {
    console.log('load template', this)
    item.forEach((element: GridsterItem) => {
      this.dashboard.push(element)
    });
    console.log(this.dashboard)
  }
  saveDashboard(data:any, content: any) {
    console.log(data)
    this.modalService.open(content);
  }
  saveTemplateData() {
    console.log(this.dashboard)
    let PreviousTemplate:any = sessionStorage.getItem('savedTemplate')!==null? sessionStorage.getItem('savedTemplate'): [] ;
    PreviousTemplate =PreviousTemplate.length >0? JSON.parse(PreviousTemplate):[]
    let  tempTemplateData:any = {}
      tempTemplateData.templateName = this.templateName;
      tempTemplateData.lockersList = this.dashboard;
      tempTemplateData.railClass = this.returnRails()
      
    if(PreviousTemplate===null) {
      let  allTemplates = [];
      allTemplates.push(tempTemplateData)
      sessionStorage.setItem('savedTemplate', JSON.stringify(allTemplates))
     // PreviousTemplate.templates.push(this.dashboard)
    } else {
      PreviousTemplate.push(tempTemplateData);
      sessionStorage.setItem('savedTemplate', JSON.stringify(PreviousTemplate))
    }
    this.modalService.dismissAll()
  }
  returnRails() {
    let counter = 0;
    let clsName = 'singleRail'
    this.dashboard.forEach((lockers)=>{
      if(lockers.layoutClass==='kisoskBlock gridSterBlock'||lockers.layoutClass==='rentSellerBlock gridSterBlock') {
        counter = counter+1
      }
    })
    if(counter <=1){
      clsName = '../../../assets/singleRail.jpeg'
    } else if(counter ===2){
      clsName = '../../../assets/dualRail.jpeg'
    } else {
      clsName = '../../../assets/tripleRail.jpeg'
    }
    return clsName;
  }
  newWidgetCallback(event: any, item: any): any {
    // do stuff / save to server / etc
    let deviceType = sessionStorage.getItem('box')
    if(deviceType==='templates') {
      let  datas:any = sessionStorage.getItem('contentData')
      console.log(JSON.parse(datas))
      this.dashboard = JSON.parse(datas)
    }
    switch (deviceType) {
      case 'kisosk':
        this.dashboard.push({ x: item.x, y: 0, cols: 1, rows: 10, layoutClass: 'kisoskBlock gridSterBlock' });
        break;
      case 'rentSeller':
        this.dashboard.push({ x: item.x, y: 0, cols: 1, rows: 10, layoutClass: 'rentSellerBlock gridSterBlock' });
        break;
      case 'smlocker':
        this.dashboard.push({ x: item.x, y: item.y, cols: 1, rows: 2, layoutClass: 'smLockerBlock gridSterBlock', status: 'b-yellow' });
        break;
      case 'mdLocker':
        this.dashboard.push({ x: item.x, y: item.y, cols: 1, rows: 3, layoutClass: 'mdLockerBlock gridSterBlock', status: 'b-red' });
        break;
      case 'lgLocker':
        this.dashboard.push({ x: item.x, y: item.y, cols: 1, rows: 4, layoutClass: 'lgLockerBlock gridSterBlock', status: 'b-green' });
        break;
      case 'xlLocker':
        this.dashboard.push({ x: item.x, y: item.y, cols: 1, rows: 5, layoutClass: 'xlLockerBlock gridSterBlock', status: 'b-yellow' });
        break;
      case 'sampleTemplate1':
        this.dashboard =[{x:7,y:4,cols:1,rows:4,layoutClass: 'lgLockerBlock gridSterBlock',status: 'b-green'}
          ,{x:6,y:2,cols:1,rows:4,layoutClass: 'lgLockerBlock gridSterBlock',status: 'b-green'}
          ,{x:5,y:5,cols:1,rows:2,layoutClass: 'smLockerBlock gridSterBlock',status: 'b-yellow'}
          ,{x:5,y:3,cols:1,rows:2,layoutClass: 'smLockerBlock gridSterBlock',status: 'b-yellow'},
          {x:7,y:0,cols:1,rows:4,layoutClass: 'lgLockerBlock gridSterBlock',status: 'b-green'},
          {x:1,y:0,cols:1,rows:10,layoutClass: 'kisoskBlock gridSterBlock'},
          {x:4,y:0,cols:1,rows:10,layoutClass: 'rentSellerBlock gridSterBlock'},
          {x:3,y:0,cols:1,rows:3,layoutClass: 'mdLockerBlock gridSterBlock',status: 'b-red'},
          {x:9,y:5,cols:1,rows:5,layoutClass: 'xlLockerBlock gridSterBlock',status: 'b-yellow'},
          {x:9,y:0,cols:1,rows:5,layoutClass: 'xlLockerBlock gridSterBlock',status: 'b-yellow'},
          {x:8,y:0,cols:1,rows:5,layoutClass: 'xlLockerBlock gridSterBlock',status: 'b-yellow'},
          {x:6,y:0,cols:1,rows:2,layoutClass: 'smLockerBlock gridSterBlock',status: 'b-yellow'},
          {x:8,y:5,cols:1,rows:5,layoutClass: 'xlLockerBlock gridSterBlock',status: 'b-yellow'},
          {x:7,y:8,cols:1,rows:2,layoutClass: 'smLockerBlock gridSterBlock',status: 'b-yellow'},
          {x:5,y:0,cols:1,rows:3,layoutClass: 'mdLockerBlock gridSterBlock',status: 'b-red'},
          {x:6,y:6,cols:1,rows:4,layoutClass: 'lgLockerBlock gridSterBlock',status: 'b-green'},
          {x:5,y:7,cols:1,rows:3,layoutClass: 'mdLockerBlock gridSterBlock',status: 'b-red'},
          {x:2,y:0,cols:1,rows:5,layoutClass: 'xlLockerBlock gridSterBlock',status: 'b-yellow'},
          {x:2,y:5,cols:1,rows:5,layoutClass: 'xlLockerBlock gridSterBlock',status: 'b-yellow'},
          {x:3,y:5,cols:1,rows:5,layoutClass: 'xlLockerBlock gridSterBlock',status: 'b-yellow'},
          {x:3,y:3,cols:1,rows:2,layoutClass: 'smLockerBlock gridSterBlock',status: 'b-yellow'},
          {x:0,y:5,cols:1,rows:5,layoutClass: 'xlLockerBlock gridSterBlock',status: 'b-yellow'},
          {x:0,y:0,cols:1,rows:5,layoutClass: 'xlLockerBlock gridSterBlock', status: 'b-yellow'}]
        break;
      case 'sampleTemplate2':
        this.dashboard = []
        this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 10, layoutClass: 'kisoskBlock gridSterBlock' });
        this.dashboard.push({ x: 1, y: 0, cols: 1, rows: 2, layoutClass: 'smLockerBlock gridSterBlock', status: 'b-yellow' });
        this.dashboard.push({ x: 1, y: 2, cols: 1, rows: 2, layoutClass: 'smLockerBlock gridSterBlock', status: 'b-yellow' });
        this.dashboard.push({ x: 1, y: 4, cols: 1, rows: 2, layoutClass: 'smLockerBlock gridSterBlock', status: 'b-yellow' });
        this.dashboard.push({ x: 1, y: 6, cols: 1, rows: 2, layoutClass: 'smLockerBlock gridSterBlock', status: 'b-yellow' });
        this.dashboard.push({ x: 1, y: 8, cols: 1, rows: 2, layoutClass: 'smLockerBlock gridSterBlock', status: 'b-yellow' });
        this.dashboard.push({ x: 2, y: 0, cols: 1, rows: 2, layoutClass: 'smLockerBlock gridSterBlock', status: 'b-yellow' });
        this.dashboard.push({ x: 2, y: 2, cols: 1, rows: 3, layoutClass: 'mdLockerBlock gridSterBlock', status: 'b-red' });
        this.dashboard.push({ x: 2, y: 5, cols: 1, rows: 3, layoutClass: 'mdLockerBlock gridSterBlock', status: 'b-red' });
        this.dashboard.push({ x: 2, y: 8, cols: 1, rows: 3, layoutClass: 'mdLockerBlock gridSterBlock', status: 'b-red' });
        this.dashboard.push({ x: 3, y: 0, cols: 1, rows: 3, layoutClass: 'mdLockerBlock gridSterBlock', status: 'b-red' });
        this.dashboard.push({ x: 3, y: 3, cols: 1, rows: 3, layoutClass: 'mdLockerBlock gridSterBlock', status: 'b-red' });
        this.dashboard.push({ x: 3, y: 6, cols: 1, rows: 3, layoutClass: 'mdLockerBlock gridSterBlock', status: 'b-red' });
        this.dashboard.push({ x: 4, y: 0, cols: 1, rows: 10, layoutClass: 'rentSellerBlock gridSterBlock' });
        this.dashboard.push({ x: 5, y: 0, cols: 1, rows: 4, layoutClass: 'lgLockerBlock gridSterBlock', status: 'b-green' });
        this.dashboard.push({ x: 5, y: 4, cols: 1, rows: 4, layoutClass: 'lgLockerBlock gridSterBlock', status: 'b-green' });
        this.dashboard.push({ x: 5, y: 8, cols: 1, rows: 2, layoutClass: 'smLockerBlock gridSterBlock', status: 'b-yellow' });
        this.dashboard.push({ x: 6, y: 0, cols: 1, rows: 4, layoutClass: 'lgLockerBlock gridSterBlock', status: 'b-green' });
        this.dashboard.push({ x: 6, y: 4, cols: 1, rows: 2, layoutClass: 'smLockerBlock gridSterBlock', status: 'b-yellow' });
        this.dashboard.push({ x: 6, y: 8, cols: 1, rows: 4, layoutClass: 'lgLockerBlock gridSterBlock', status: 'b-green' });
        this.dashboard.push({ x: 7, y: 0, cols: 1, rows: 10, layoutClass: 'kisoskBlock gridSterBlock' });
        break;
    }
    console.log(this.dashboard);
  }
}

function Inputsasa() {
  throw new Error('Function not implemented.');
}
