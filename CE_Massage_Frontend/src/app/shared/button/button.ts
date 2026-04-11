import { Component, Input } from '@angular/core';
import { ScrollAnimateDirective } from '../directives/scroll.directive';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [ScrollAnimateDirective, RouterLink],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input({required: true}) buttonText!: string;
  @Input({required: true}) path!: string;
}
