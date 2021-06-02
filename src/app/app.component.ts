import { Component } from '@angular/core';
import { GridSizesComponent } from './components/grid-sizes/grid-sizes.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'locker-dashboard';
  modalService!: NgbModal;
  parentSubject:Subject<any> = new Subject();

  gridComponent: GridSizesComponent = new GridSizesComponent(this.modalService);
  updatedValue: string = "";
  
  loadTemplate(datastore: any) {
    console.log('sasadad', datastore)
    console.log(datastore.length)
    this.parentSubject.next(datastore);
  }

  saveTemplateClicked(){
    this.updatedValue = "template"
  }
}
