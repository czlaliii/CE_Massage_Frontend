import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-gallery',
  imports: [MatGridListModule, NgOptimizedImage],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class GalleryComponent {

}
