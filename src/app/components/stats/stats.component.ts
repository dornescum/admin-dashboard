import { Component, Input } from '@angular/core';
import { Locations } from '../../models/Utils';
import { NgForOf, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  standalone: true,
  styleUrls: ['./stats.component.scss'],
  imports: [
    SlicePipe,
    NgForOf,
  ],
})
export class StatsComponent {

  @Input() locations!: Locations[];
  @Input() lastIp!: string | unknown;
  @Input() lastLL!: string | unknown;

}
