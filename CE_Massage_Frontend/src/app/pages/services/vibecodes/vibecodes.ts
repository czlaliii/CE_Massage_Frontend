import { Component } from '@angular/core';
import { Hero } from '../components/hero/hero';
import { ScrollAnimateDirective } from '../../../shared/directives/scroll.directive';
import { Button } from '../../../shared/button/button';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-vibecodes',
  imports: [Hero, ScrollAnimateDirective, Button, NgOptimizedImage],
  templateUrl: './vibecodes.html',
  styleUrl: './vibecodes.css',
})
export class VibecodesComponent {

}
