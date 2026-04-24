import { Component } from '@angular/core';
import { Hero } from '../components/hero/hero';
import { ScrollAnimateDirective } from '../../../shared/directives/scroll.directive';
import { NgOptimizedImage } from '@angular/common';
import { Card } from '../components/card/card';
import { CardGrid } from '../components/card-grid/card-grid';
import { AboutComponent } from "../../about/about";
import { ListItem } from "../components/list-item/list-item";
import { List } from "../components/list/list";

@Component({
  selector: 'app-expanse',
  standalone: true,
  templateUrl: './expanse.html',
  styleUrl: './expanse.css',
  imports: [Hero, ScrollAnimateDirective, NgOptimizedImage, Card, CardGrid, AboutComponent, ListItem, List]
})
export class ExpanseComponent {

  openIndex: number | null = null;

  toggle(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }
}