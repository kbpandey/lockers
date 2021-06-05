import { Injectable } from '@angular/core';
import { LockerSizes, LockerTemplates, LockerLayout,  } from '../gridlayout/locker.model';

@Injectable({
  providedIn: 'root'
})
export class BoxlayoutService {

  constructor() { }
  
  // /api/services/app/LockerSize/GetLockerSizes
  GetLockerSizes() : LockerSizes[]{
    return [
      {
        "id": 1,
        "lockerName": "Kiosk",
        "height": 100,
        "width": 18,
        "depth": 15.2,
        "lockerTypeId": 1
      },
      {
        "id": 2,
        "lockerName": "Rent Seller",
        "height": 100,
        "width": 10,
        "depth": 14.2,
        "lockerTypeId": 2
      },
      {
        "id": 3,
        "lockerName": "Small Locker",
        "height": 9.75,
        "width": 9.5,
        "depth": 10.2,
        "lockerTypeId": 0
      },
      {
        "id": 4,
        "lockerName": "Med Locker",
        "height": 15,
        "width": 10,
        "depth": 12.2,
        "lockerTypeId": 0
      },
      {
        "id": 5,
        "lockerName": "Large Locker",
        "height": 10,
        "width": 15,
        "depth": 11.2,
        "lockerTypeId": 0
      },
      {
        "id": 6,
        "lockerName": "XL Locker",
        "height": 15,
        "width": 20,
        "depth": 9.2,
        "lockerTypeId": 0
      }
    ];
  }

  // /api/services/app/Template/GetTemplates
  GetTemplates() : LockerTemplates[]{
    return [
      {
        "templateId": 1,
        "templateName": "Template 1",
        "lockersList": [
          {
            "lockerId": 1,
            "lockerNumber": 0,
            "hardwareNumber": 1,
            "xCoordinate": 1,
            "yCoordinate": 10,
            "lockerSizeId": 1,
            "height": 10,
            "width": 1,
            "lockerStatusId": 1,
            "isRail": true 
          },
          {
            "lockerId": 2,
            "lockerNumber": 0,
            "hardwareNumber": 200,
            "xCoordinate": 2,
            "yCoordinate": 1,
            "lockerSizeId": 3,
            "height": 1,
            "width": 1,
            "lockerStatusId": 1,
            "isRail": true 
          }
        ]
      },
      {
        "templateId": 2,
        "templateName": "Template 2",
        "lockersList": [
          {
            "lockerId": 1,
            "lockerNumber": 0,
            "hardwareNumber": 1000,
            "xCoordinate": 1,
            "yCoordinate": 10,
            "lockerSizeId": 1,
            "height": 10,
            "width": 1,
            "lockerStatusId": 2,
            "isRail": false 
          },
          {
            "lockerId": 2,
            "lockerNumber": 0,
            "hardwareNumber": 3000,
            "xCoordinate": 2,
            "yCoordinate": 1,
            "lockerSizeId": 3,
            "height": 1,
            "width": 1,
            "lockerStatusId": 2,
            "isRail": false 
          }
        ]
      }
    ];
  }
  LockersData = this.GetLockerSizes();
  templateData = this.GetTemplates();
  // /api/services/app/Template/UpdateTemplate
  SaveLockerTemplate(update: LockerTemplates){

  }

  // /api/services/app/Template/CreateTemplate
  CreateLockerTemplate(update: LockerTemplates){

  }
}