import { Input, ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, EventEmitter, Output  } from '@angular/core';

import { DisplayGrid, GridsterConfig, GridsterItem, GridType } from 'angular-gridster2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-grid-sizes',
  templateUrl: './grid-sizes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GridSizesComponent implements OnInit {
  @Input()  parentSubject!: Subject<any>;
  @Output() savetTemplateClick = new EventEmitter<any>();
  standardSizes:number = 10
  templateName:string = '';
  templates:[] = [];
  savedTemplates:any = []
  tempStatus:string = 'b-green';
  tempLockerNumber:number = 0
  hardwareNumber:number = 0
  dashboard: Array<GridsterItem> = [];
  minColums: number = 10;
  maxColumns: number = 10;
  minRows: number = 10;
  maxRows: number = 10;
  selectedItem: any = []
  options: GridsterConfig = {
  };
  constructor(private modalService: NgbModal) { }
  ngOnInit(): void {
    this.options = {
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
      maxItemCols: this.maxColumns,
      minItemCols: 1,
      maxItemRows: this.maxColumns,
      minItemRows: 1,
      maxItemArea: 1000,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      margin: 10,
      outerMargin: false,
      disablePushOnDrag: true
    };
    this.dashboard = [

    ];
    let templateDataS: any = sessionStorage.getItem('savedTemplate') !== null ? sessionStorage.getItem('savedTemplate') : [];
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
    debugger;
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
  
  onLockerNumber(data: any) {
    this.tempLockerNumber = data.target.value
  }

  onHardWareNumber(data: any) {
    this.hardwareNumber = data.target.value
  }

  saveKeyUp(data: any) {
    this.templateName = data.target.value;
  }
  deleteButton(item: any) {
    console.log(item)
    this.selectedItem = item;
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }
  editButton(item: any, content: any) {
    debugger;
    this.selectedItem = item
    this.tempLockerNumber = item.lockerNumber
    this.hardwareNumber = item.hardwareNumber
    this.modalService.open(content, { size: 'sm' });
  }
  closeEditPanel(selectedData: any) {
    debugger;
    console.log('seletedData', selectedData, this.dashboard)

    this.selectedItem.status = this.tempStatus;
    this.selectedItem.lockerNumber = this.tempLockerNumber
    this.selectedItem.hardwareNumber = this.hardwareNumber
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
  saveDashboard(data: any, content: any) {
    console.log(data)
    this.modalService.open(content);
  }
  saveTemplateData() {
    console.log(this.dashboard)
    let PreviousTemplate: any = sessionStorage.getItem('savedTemplate') !== null ? sessionStorage.getItem('savedTemplate') : [];
    PreviousTemplate = PreviousTemplate.length > 0 ? JSON.parse(PreviousTemplate) : []
    let tempTemplateData: any = {}
    tempTemplateData.templateName = this.templateName;
    tempTemplateData.lockersList = this.convertToDbData(this.dashboard);
    tempTemplateData.railClass = this.returnRails()
    if (PreviousTemplate === null) {
      let allTemplates = [];
      allTemplates.push(tempTemplateData)
      sessionStorage.setItem('savedTemplate', JSON.stringify(allTemplates))
      // PreviousTemplate.templates.push(this.dashboard)
    } else {
      PreviousTemplate.push(tempTemplateData);
      sessionStorage.setItem('savedTemplate', JSON.stringify(PreviousTemplate))
    }
    this.savetTemplateClick.emit();
    this.modalService.dismissAll()
  }
  convertToDbData(data: any) {
    let result: any = []
    this.dashboard.forEach(lockers => {
      result.push({
        xCoordinate: lockers.x,
        yCoordinate: lockers.y,
        width: lockers.cols,
        height: lockers.rows,
        layoutClass: lockers.layoutClass,
        lockerNumber: lockers.lockerNumber,
        hardwareNumber: lockers.hardwareNumber,
        isRail: lockers.isRail,
        lockerStatusId: lockers.status ? this.convertToDbStatus(lockers.status) : undefined,
        lockerSizeId: lockers.lockerSizeId,
        lockerId: lockers.lockerId,
        typeId: lockers.lockerTypeId
      })
    });
    return result
  }
  convertToDbStatus(data: any) {
    const statusArray = ['b-green', 'b-yellow', 'b-red', 'b-grey'];
    const statusIndex = statusArray.indexOf(data);
    return statusIndex > -1 ? statusIndex : 0
  }
  returnRails() {
    let counter = 0;
    let clsName = 'singleRail'
    this.dashboard.forEach((lockers) => {
      if (lockers.layoutClass === 'kioskBlock gridSterBlock' || lockers.layoutClass === 'rentSellerBlock gridSterBlock') {
        counter = counter + 1
      }
    })
    if(counter <=1){
      clsName = '../../../assets/singlerail.jpeg'
    } else if(counter ===2){
      clsName = '../../../assets/dualrail.jpeg'
    } else {
      clsName = '../../../assets/triplerail.jpeg'
    }
    return clsName;
  }
  covertedToGridCompat(data: any) {
    let result: any = []
    data.forEach((lockers: any) => {
      result.push({
        x: lockers.xCoordinate,
        y: lockers.yCoordinate,
        cols: lockers.width,
        rows: lockers.height,
        layoutClass: this.getLayoutClass(lockers),
        cssHeight: this.getHeight(lockers),
        lockerNumber: lockers.lockerNumber ? lockers.lockerNumber : 0,
        hardwareNumber: lockers.hardwareNumber ? lockers.hardwareNumber : 0,
        isRail: lockers.isRail ? true : false,
        status: this.getLockerStatus(lockers.lockerStatusId),
        lockerSizeId: lockers.lockerSizeId ? lockers.lockerSizeId : 1,
        lockerId: lockers.lockerId ? lockers.lockerId : 1,
        typeId: lockers.typeId
      })
    });
    return result;
  }
  getLayoutClass(lockers: any) {
    let layoutClass = ''
    switch (lockers.typeId) {
      case 1:
        layoutClass = 'kioskBlock gridSterBlock';
        break;
      case 2:
        layoutClass = 'rentSellerBlock gridSterBlock';
        break;
      case 0:
        layoutClass = 'lockerBlock gridSterBlock';
      break
    }
    return layoutClass;
  }

  getHeight(rows:any) {
    let baseheight = 100
    const extraHeight = (rows.height / 10) * 20;
    const finalHeight = baseheight + extraHeight;
    return finalHeight;
  }

  getLockerStatus(status: any) {
    const statusArray = ['b-green', 'b-yellow', 'b-red', 'b-grey']
    return statusArray[status]
  }
  newWidgetCallback(event: any, item: any): any {
    // do stuff / save to server / etc
    let datas: any;
    let deviceType = sessionStorage.getItem('box')
    datas = sessionStorage.getItem('contentData')
    if (deviceType === 'templates') {
      console.log('parsewda', JSON.parse(datas))
      this.dashboard = this.covertedToGridCompat(JSON.parse(datas))
    }  else {
      datas = JSON.parse(datas);
    }

    switch (deviceType) {
      case 'kisosk':
        this.dashboard.push({ x: item.x, y: 0, cols: 1, rows: this.maxRows, layoutClass: 'kioskBlock gridSterBlock', lockerTypeId:1});
        break;
      case 'rentSeller':
        this.dashboard.push({ x: item.x, y: 0, cols: 1, rows: this.maxRows, layoutClass: 'rentSellerBlock gridSterBlock', lockerTypeId:2 });
        break;
      case 'locker':
         let width = 1
         const lockerWidth = datas.width / this.standardSizes;
         width = Math.round(( lockerWidth > width) ? lockerWidth : width);
         const lockerHeight = Math.round((datas.height / this.standardSizes) * 2);
         this.dashboard.push({ x: item.x, y: item.y, cols: width, rows: lockerHeight, layoutClass: 'lockerBlock gridSterBlock', status: 'b-white', lockerTypeId:0 });
        break;
    }
    console.log(this.dashboard);
  }
}

function Inputsasa() {
  throw new Error('Function not implemented.');
}
