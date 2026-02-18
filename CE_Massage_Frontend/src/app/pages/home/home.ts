import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { NgOptimizedImage } from '@angular/common';
import { Reviews } from './components/reviews/reviews';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatCardModule, Reviews, CommonModule, NgOptimizedImage],
  templateUrl: './home.html',
  styleUrl: './home.css',
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ opacity: 0, transform: 'translateX(-100px)' }))
      ])
    ])
  ]
})

export class HomeComponent{}