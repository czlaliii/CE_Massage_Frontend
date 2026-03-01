import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Card } from './card/card';

@Component({
  selector: 'app-services-section',
  imports: [NgOptimizedImage, Card],
  templateUrl: './services-section.html',
  styleUrl: './services-section.css',
})
export class ServicesSection {

}