import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BoxlayoutService } from './boxlayout.service'
@Component({
  selector: 'app-boxlayout',
  templateUrl: './boxlayout.component.html',
  styleUrls: ['./boxlayout.component.scss']
})
export class BoxlayoutComponent implements OnInit {
  displayTemplates: string = 'lockers';
  @Output() templateData = new EventEmitter<any>();
  lockersLists: any = []
  savedTemplates: any = []
  constructor() { }

  ngOnInit(): void {
    const lockersData = new BoxlayoutService()
    this.lockersLists = lockersData.GetLockerSizes();
    let testdata = lockersData.GetTemplates();
    let convertedLockersData = this.convertData(testdata);
    let templateDataS: any = sessionStorage.getItem('savedTemplate') !== null ? sessionStorage.getItem('savedTemplate') : [];
    this.savedTemplates = templateDataS.length > 0 ? JSON.parse(templateDataS) : []
    
    this.lockersLists.forEach((lockers: any) => {
      lockers.layoutClass = this.getLayoutClass(lockers.lockerName)
      let baseheight = 100
      const extraHeight = (lockers.rows - 1) * 25
      const finalHeight = baseheight + extraHeight;
      lockers.cssHeight = finalHeight + 'px'
      lockers.status = 'b-green';
    });

  }
  getLayoutClass(lockerName: any) {
    let layoutClass = ''
    switch (lockerName) {
      case 'Kiosk':
        layoutClass = 'kisoskBlock gridSterBlock';
        break;
      case 'Rent Seller':
        layoutClass = 'rentSellerBlock gridSterBlock';
        break;
      case 'Small Locker':
        layoutClass = 'smLockerBlock gridSterBlock';
        break;
      case 'Med Locker':
        layoutClass = 'mdLockerBlock gridSterBlock';
        break;
      case '"Large Locker':
        layoutClass = 'lgLockerBlock gridSterBlock';
        break;
      case 'XL Locker':
        layoutClass = 'xlLockerBlock gridSterBlock';
        break;
    }
    return layoutClass;
  }
  convertData(data: any) {
    let result: any = []
    data.forEach((element: { lockersList: any[]; }) => {
      element.lockersList.forEach((lockers: any) => {
        result.push({
          x: lockers.xCoordinate, y: lockers.yCoordinate, cols: lockers.width,
          rows: lockers.height, layoutClass: this.getLayoutClass(lockers.lockerNumber),
          lockerNumber: lockers.lockerNumber, isRail: lockers.isRail,
          lockerStatusId: lockers.lockerStatusId, lockerSizeId: lockers.lockerSizeId,
          lockerId: lockers.lockerId,
          lockerName: lockers.lockerName
        })
      });
    });
  }
  drag(_esa: any, itemName: string, item: any): void {
    sessionStorage.setItem('box', itemName)
    if (itemName === 'templates')
    console.log('draggerd',item.lockersList)
      sessionStorage.setItem('contentData', JSON.stringify(item.lockersList))
    console.log('dragged', _esa)

  }
  displayTemplateLockers(displayType: string) {
    this.displayTemplates = displayType
  }
  loadTemplate() {
    let dataStores = [{ x: 0, y: 0, cols: 1, rows: 10, layoutClass: 'kisoskBlock gridSterBlock' },
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
