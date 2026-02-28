import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Card } from './card/card';

@Component({
  selector: 'app-services-section',
  imports: [NgOptimizedImage, RouterLink, Card],
  templateUrl: './services-section.html',
  styleUrl: './services-section.css',
})
export class ServicesSection {

}