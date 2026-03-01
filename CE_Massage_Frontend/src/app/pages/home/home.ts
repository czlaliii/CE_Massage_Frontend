import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatCardModule } from '@angular/material/card';
import { Reviews } from './reviews/reviews';
import { ServicesSection } from './services-section/services-section';
import { AboutSection } from './about-section/about-section';
import { Hero } from './hero/hero';
import { GoogleMaps } from "./google-maps/google-maps";

@Component({
  selector: 'app-home',
  imports: [MatCardModule, Reviews, CommonModule, ServicesSection, AboutSection, Hero, GoogleMaps],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class HomeComponent{}