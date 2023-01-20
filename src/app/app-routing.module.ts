import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './admin/register/register.component';
import { QRViewComponent } from './dashboard/qr-view/qr-view.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashBoardModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: 'qr-view', component: QRViewComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
