import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from './components/shared/main-header/main-header.component';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { AssetListComponent } from './components/asset-list/asset-list.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { MaterialModule } from './components/shared/material-module';
import { IncidentComponent } from './components/incident/incident.component';
import { SlaComponent } from './components/sla/sla.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AddAssetComponent } from './components/asset-list/add-asset/add-asset.component';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    MainDashboardComponent,
    AssetListComponent,
    NotFoundComponent,
    IncidentComponent,
    SlaComponent,
    AddAssetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
