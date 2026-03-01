import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Socials } from "../shared/socials/socials";

@Component({
  selector: 'app-footer',
  imports: [RouterLink, NgOptimizedImage, Socials],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

}
