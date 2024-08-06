import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrl: './help.component.css'
})
export class HelpComponent {

  routes = [
    {
      path: '/help/unifier',
      title: 'XLIFF Unifier',
      description: 'How to use it'
    }
  ]
}
