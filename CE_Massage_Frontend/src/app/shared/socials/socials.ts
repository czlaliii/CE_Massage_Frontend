import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-socials',
  imports: [],
  templateUrl: './socials.html',
  styleUrl: './socials.css',
})
export class Socials {
  @Input() innerClass: string = 'intro-social';
  @Input() linkClass: string = 'icon-social';
}
