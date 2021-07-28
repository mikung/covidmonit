import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {WardComponent} from './ward/ward.component';
import {ListwardComponent} from './listward/listward.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: 'apps', component: WardComponent},
      {path: 'listward', component: ListwardComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule {
}
