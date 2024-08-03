import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { XmlViewerComponent } from './xml-viewer/xml-viewer.component';
import { RightRowComponent } from './right-row/right-row.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToggleThemeBtnComponent } from './toggle-theme-btn/toggle-theme-btn.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    XmlViewerComponent,
    RightRowComponent,
    ToggleThemeBtnComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    XmlViewerComponent,
    RightRowComponent,
    ToggleThemeBtnComponent
  ]
})
export class SharedModule { }
