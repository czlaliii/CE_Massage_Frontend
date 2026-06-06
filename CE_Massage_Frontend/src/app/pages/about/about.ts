import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Socials } from "../../shared/socials/socials";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage, Socials, TranslatePipe],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {

}
