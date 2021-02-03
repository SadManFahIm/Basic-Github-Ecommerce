import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GithubComponent } from './github/github.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { HomeComponent } from './ecommerce/home/home.component';
import { ManagementComponent } from './ecommerce/management/management.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'github', component: GithubComponent},
  {path: 'management', component: ManagementComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routeComponent = [GithubComponent, EcommerceComponent, HomeComponent, ManagementComponent];
