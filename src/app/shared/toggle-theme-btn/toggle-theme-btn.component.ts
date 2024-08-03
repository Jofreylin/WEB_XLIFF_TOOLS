import { Component } from '@angular/core';

@Component({
  selector: 'app-toggle-theme-btn',
  templateUrl: './toggle-theme-btn.component.html',
  styleUrl: './toggle-theme-btn.component.css'
})
export class ToggleThemeBtnComponent {

  theme: string = ''

  constructor() {
    this.theme = this.getTheme();
  }

  getTheme(): string {
    return localStorage.getItem('color-theme') || ((!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark': 'light');
  }

  toggleTheme(): void {
    const theme = this.getTheme();
    
    if (theme == 'dark') {
      document.documentElement.classList.remove('dark');
      this.theme = 'light';
    } else {
      document.documentElement.classList.add('dark')
      this.theme = 'dark';
    }

    localStorage.setItem('color-theme',this.theme);
  }
  
}
