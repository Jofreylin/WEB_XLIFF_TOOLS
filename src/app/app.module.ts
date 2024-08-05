import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import { HomeComponent } from './pages/home/home.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { SharedModule } from './shared/shared.module';
import { TranslatorComponent } from './pages/translator/translator.component';
import { AboutComponent } from './pages/about/about.component';
import { DisclaimerComponent } from './pages/disclaimer/disclaimer.component';
import { UnifierComponent } from './pages/unifier/unifier.component';

registerLocaleData(localeEn, 'en-US');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CommonLayoutComponent,
    TranslatorComponent,
    AboutComponent,
    DisclaimerComponent,
    UnifierComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    SharedModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'en-US' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
