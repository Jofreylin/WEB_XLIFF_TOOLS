import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { TranslatorComponent } from './pages/translator/translator.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '',
    component: CommonLayoutComponent,
    children: [
      {
        path: 'translator',
        component: TranslatorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
