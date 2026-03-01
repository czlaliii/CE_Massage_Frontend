import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Socials } from "../../shared/socials/socials";

@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage, Socials],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {

}
