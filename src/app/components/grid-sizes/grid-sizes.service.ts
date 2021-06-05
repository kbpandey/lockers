import { Injectable } from '@angular/core';
import { LockerLayout, LockerStatus, BookLocker } from '../gridlayout/locker.model';

@Injectable({
  providedIn: 'root'
})
export class GridSizesService {

  constructor() { }

//   /api/services/app/KioskLockers/GetLockerLayout
  GetLockerLayout(kioskId:number) {
    // "isRail": // This denotes whether Rail. If false then it will be locker else Rail.
    return [
        {
          "lockerId": 1,
          "lockerNumber": "Kiosk",
          "hardwareNumber": "10000",
          "xCoordinate": 1,
          "yCoordinate": 2,
          "lockerSizeId": 3,
          "height": 10,
          "width": 1,
          "lockerStatusId": 1,
          "isRail": true
        },
        {
            "lockerId": 1,
            "lockerNumber": "10",
            "hardwareNumber": "20000",
            "xCoordinate": 1,
            "yCoordinate": 2,
            "lockerSizeId": 3,
            "height": 10,
            "width": 1,
            "lockerStatusId": 1,
            "isRail": true   //
          }
      ];
  }


  // /api/services/app/KioskLockers/CreateOrUpdateLockerLayout
  CreateOrUpdateLockerLayout(lockerLayout:LockerLayout){

  }

//   /api/services/app/KioskLockers/UpdateLockerStatus

   UpdateLockerStatus(lockerStatus:LockerStatus){
        
   }

   // /api/services/app/KioskLockers/ReserveLocker
   ReserveLocker(bookLocker:BookLocker) {
        
   }
}
