import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { TranslatorComponent } from './pages/translator/translator.component';
import { AboutComponent } from './pages/about/about.component';
import { DisclaimerComponent } from './pages/disclaimer/disclaimer.component';
import { UnifierComponent } from './pages/unifier/unifier.component';
import { HelpComponent } from './pages/help/help.component';
import { HelpUnifierComponent } from './pages/help/help-unifier/help-unifier.component';

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
      },
      {
        path: 'unifier',
        component: UnifierComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'disclaimer',
        component: DisclaimerComponent
      },
      {
        path: 'help',
        children: [
          {
            path: '',
            component: HelpComponent
          },
          {
            path: 'unifier',
            component: HelpUnifierComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
