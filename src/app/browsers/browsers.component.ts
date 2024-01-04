import { Component, OnInit,  ViewChild, ElementRef} from '@angular/core';
// import { ApiService } from '../../services/api.service';
// import Chart from 'chart.js/auto';
@Component({
  selector: 'app-browsers',
  templateUrl: './browsers.component.html',
  styleUrls: ['./browsers.component.scss']
})
export class BrowsersComponent {
  @ViewChild('osChart', { static: false }) osChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('browserChart', { static: false }) browserChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('searchChart', { static: false }) searchChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('deviceChart', { static: false }) deviceChartRef!: ElementRef<HTMLCanvasElement>;


}
