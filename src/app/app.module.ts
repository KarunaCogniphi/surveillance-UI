import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from './components/shared/main-header/main-header.component';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { AssetListComponent, DialogContentExampleDialog, DialogContentEditDialog } from './components/asset-list/asset-list.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { MaterialModule } from './components/shared/material-module';
import { IncidentComponent } from './components/incident/incident.component';
import { SlaComponent } from './components/sla/sla.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateAssetComponent } from './components/asset-list/create-asset/create-asset.component';
import { IncidentListComponent } from './components/incident/incident-list/incident-list.component';
import { EditAssetComponent } from './components/asset-list/edit-asset/edit-asset.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddIncidentComponent } from './components/incident/add-incident/add-incident.component';
import { EditIncidentComponent } from './components/incident/edit-incident/edit-incident.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ChartsModule } from 'ng2-charts';
import { FileUploadComponent } from './components/shared/file-upload/file-upload.component';
import { ImageViewComponent } from './components/shared/image-view/image-view.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AngularImageViewerModule } from "angular-x-image-viewer";
import { IncidentChatViewComponent } from './components/incident/incident-chat-view/incident-chat-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    MainDashboardComponent,
    AssetListComponent,
    NotFoundComponent,
    IncidentComponent,
    SlaComponent,
    CreateAssetComponent,
    IncidentListComponent,
    EditAssetComponent,
    AddIncidentComponent,
    EditIncidentComponent,
    AlertsComponent,
    FileUploadComponent,
    DialogContentExampleDialog,
    DialogContentEditDialog,
    ImageViewComponent,
    IncidentChatViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    ChartsModule,
    GooglePlaceModule,
    AngularImageViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
