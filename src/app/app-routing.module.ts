import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AssetListComponent } from './components/asset-list/asset-list.component';
import { IncidentListComponent } from './components/incident/incident-list/incident-list.component';
import { IncidentComponent } from './components/incident/incident.component';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { SlaComponent } from './components/sla/sla.component';
import { IncidentChatViewComponent } from './components/incident/incident-chat-view/incident-chat-view.component';


const routes: Routes = [
  // { path: '', component: MainDashboardComponent, pathMatch: 'full' },
  { path: '', redirectTo:'main-dashboard', pathMatch: 'full' },
  { path: 'main-dashboard', component: MainDashboardComponent },
  { path: 'asset-list', component: AssetListComponent },
  { path: 'sla', component: SlaComponent },
  { path: 'incident', component: IncidentComponent },
  { path: 'incident-list', component: IncidentListComponent },
  { path: 'incident-chat-view', component: IncidentChatViewComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
