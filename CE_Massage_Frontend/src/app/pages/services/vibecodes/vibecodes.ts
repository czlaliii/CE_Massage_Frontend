import { Component } from '@angular/core';
import { Hero } from '../components/hero/hero';
import { ScrollAnimateDirective } from '../../../shared/directives/scroll.directive';
import { Button } from '../../../shared/button/button';
import { NgOptimizedImage } from '@angular/common';
import { Card } from '../components/card/card';
import { CardGrid } from '../components/card-grid/card-grid';
import { List } from '../components/list/list';
import { ListItem } from "../components/list-item/list-item";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-vibecodes',
  imports: [Hero, ScrollAnimateDirective, Button, NgOptimizedImage, Card, CardGrid, List, ListItem, TranslatePipe],
  templateUrl: './vibecodes.html',
  styleUrl: './vibecodes.css',
})
export class VibecodesComponent {

}
