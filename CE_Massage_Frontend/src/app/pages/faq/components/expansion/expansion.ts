import {ChangeDetectionStrategy, Component, Input, signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-expansion',
  imports: [MatExpansionModule],
  templateUrl: './expansion.html',
  styleUrl: './expansion.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionComponent {
  readonly panelOpenState = signal(false);
  @Input() question: string = '';
  @Input() answer: string = '';
}
