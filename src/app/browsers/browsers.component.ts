import { Component, ViewChild, ElementRef} from '@angular/core';
import {ApiService} from "../services/api.service";
// import Chart from 'chart.js/auto';
// import {Chart} from 'chart.js';
// import Chart from 'chart.js';
// import { Chart } from "/Users/mihaidornescu/Documents/PERSONAL/Angular/admin-dashboard/node_modules/chart.js/dist/types"


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
  browsers!: any[];
  searches!: any[];
  devices!: any[];
  time!: unknown;
  day!: unknown;
  errorMsg = '';
  isLoading = false;
  page = 1;
  limit = 10; //10
  total = 0;


  constructor(private apiService: ApiService) {
  }

  ngOnInit(){
    this.getBrowser();
    // this.getDeviceOs();
    // this.getSearches();
    // this.getDevices()
  }
  private getBrowser() {
    this.isLoading = true;
    this.apiService.getAllData('agency/statistics/device-browser', this.page, this.limit)
      .subscribe({
        next: (data: any) => {
          this.browsers = data.data;
          console.log('b ', this.browsers)
          // this.updateBrowserChart(); // Call update here after data is set
          // console.log('browser data ', this.browsers);
          this.isLoading = false;
          this.time = new Date().toLocaleTimeString();
          this.day = new Date().toLocaleDateString();
          // console.log('time ', this.time)
          // console.log('day ', this.day)
          // this.createBrowserChart();
        },
        error: (error: any) => {
          // Error handling
          console.error('ERROR GET ALL DATA : ', error);
          this.isLoading = false;
          this.errorMsg = 'Error occurred';
        }
      });
  }

  createBrowserChart() {
    if (!this.browsers) {
      console.error("Browser data is not available.");
      return;
    }

    const browserData = this.browsers;

    const labels = browserData.map(item => item.device_browser);
    const data = browserData.map(item => parseFloat(item.percentage));

    // const browserChart = new Chart(this.browserChartRef.nativeElement, {
    //   type: 'bar', // Or 'bar', 'doughnut', etc., depending on your preference
    //   data: {
    //     labels: labels,
    //     datasets: [{
    //       label: 'Browser Usage',
    //       data: data,
    //       backgroundColor: [
    //         // Define colors for each browser
    //         '#EFC342', // chrome color
    //         '#F83D20', // firefox color
    //         '#11ABEA', // safari
    //         '#C01D20', // opera color
    //       ],
    //       // hoverOffset: 4
    //     }]
    //   },
    //   options: {
    //     // Define your chart options
    //     responsive: true,
    //     plugins: {
    //       legend: {
    //         position: 'top',
    //       },
    //       title: {
    //         display: true,
    //         text: 'Browsers Distribution Chart'
    //       }
    //     }
    //   }
    // });
  }
}
