import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-option',
  standalone: true,
  imports: [],
  templateUrl: './menu-option.component.html',
  styleUrl: './menu-option.component.scss'
})
export class MenuOptionComponent {
  @Input() iconName: string = ''
  @Input() menuOptionName: string = ''
}
