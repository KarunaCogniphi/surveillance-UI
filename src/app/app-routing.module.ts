import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetListComponent } from './components/asset-list/asset-list.component';
import { IncidentComponent } from './components/incident/incident.component';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { SlaComponent } from './components/sla/sla.component';


const routes: Routes = [
  { path: '', component: MainDashboardComponent, pathMatch: 'full' },
  { path: 'main-dashboard', component: MainDashboardComponent },
  { path: 'asset-list', component: AssetListComponent },
  { path: 'sla', component: SlaComponent },
  { path: 'incident', component: IncidentComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
