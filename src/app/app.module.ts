import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GridsterModule } from 'angular-gridster2';
import { GridlayoutComponent } from './components/gridlayout/gridlayout.component';
import { BoxlayoutComponent } from './components/boxlayout/boxlayout.component';
import { GridSizesComponent } from './components/grid-sizes/grid-sizes.component';

@NgModule({
  declarations: [
    AppComponent,
    GridlayoutComponent,
    BoxlayoutComponent,
    GridSizesComponent
  ],
  imports: [
    BrowserModule,
    GridsterModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
