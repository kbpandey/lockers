export class LockerSizes {
    id: number | undefined;
    height: number | undefined;
    width: number| undefined;
    lockerName: string| undefined;
    depth: number | undefined;
    lockerTypeId: number | undefined;  // This denotes whether Locker or Rail. If 0 locker else Rail.
}

export class LockerTemplates {
    templateId: number | undefined;
    templateName: string | undefined;
    lockersList: Array<LockersList> | undefined;
}

export class LockerLayout{
    kioskId: number | undefined;
    lockersList: Array<LockersList> | undefined;
}

export class LockersList {
   lockerId: number | undefined;
   lockerNumber: number | undefined;
   hardwareNumber: number | undefined;
   xCoordinate: number | undefined;
   yCoordinate: number | undefined;
   lockerSizeId: number | undefined;
   height: number | undefined;
   width: number | undefined;
   lockerStatusId: number | undefined;
   isRail: boolean | undefined;
}

export class LockerStatus{
    id: number | undefined;
    lockerStatusId: number | undefined;
}

export enum LockerStatusType {
    Available,
    Reserved,
    InUse,
    Disabled
}

export class BookLocker{
  lockerId: number | undefined;
  passcode: string | undefined;
  lockerStatusId: number | undefined;
}