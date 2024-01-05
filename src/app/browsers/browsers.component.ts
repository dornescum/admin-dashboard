import { Component, ViewChild, ElementRef} from '@angular/core';
import {ApiService} from "../services/api.service";
import Chart from 'chart.js/auto';

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
  os!: any[];
  searches!: any[];
  devices!: any[];
  time!: unknown;
  day!: unknown;
  errorMsg = '';
  isLoading = false;
  page = 1;
  limit = 10; //10
  total = 0;
  chart: any;


  constructor(private apiService: ApiService) {
  }

  ngOnInit(){
    this.getBrowser();
    this.getDeviceOs();
    this.getSearches();
    this.getDevices();
  }


  private getDeviceOs() {
    this.isLoading = true;
    this.apiService.getAllData('agency/statistics/device-os', this.page, this.limit)
      .subscribe({
        next: (data: any) => {
          this.os = data.data;
          // this.updateDeviceOsChart(); // Call update here after data is set
          // console.log('os data ', this.os);
          this.isLoading = false;
          this.time = new Date().toLocaleTimeString();
          this.day = new Date().toLocaleDateString();
          // console.log('time ', this.time)
          // console.log('day ', this.day)
          this.createChart()
        },
        error: (error: any) => {
          // Error handling
          console.error('ERROR GET ALL DATA : ', error);
          this.isLoading = false;
          this.errorMsg = 'Error occurred';
        }
      });
  }

  private getBrowser() {
    this.isLoading = true;
    this.apiService.getAllData('agency/statistics/device-browser', this.page, this.limit)
      .subscribe({
        next: (data: any) => {
          this.browsers = data.data;
          // this.updateBrowserChart(); // Call update here after data is set
          // console.log('browser data ', this.browsers);
          this.isLoading = false;
          this.time = new Date().toLocaleTimeString();
          this.day = new Date().toLocaleDateString();
          // console.log('time ', this.time)
          // console.log('day ', this.day)
          this.createBrowserChart();
        },
        error: (error: any) => {
          // Error handling
          console.error('ERROR GET ALL DATA : ', error);
          this.isLoading = false;
          this.errorMsg = 'Error occurred';
        }
      });
  }

  private getSearches() {
    this.isLoading = true;
    this.apiService.getAllData('agency/statistics/search-values', this.page, this.limit)
      .subscribe({
        next: (data: any) => {
          this.searches = data.data;
          // this.updateBrowserChart(); // Call update here after data is set
          // console.log('searches data ', this.searches);
          this.isLoading = false;
          this.createSearchChart();
        },
        error: (error: any) => {
          // Error handling
          console.error('ERROR GET ALL DATA : ', error);
          this.isLoading = false;
          this.errorMsg = 'Error occurred';
        }
      });
  }

  private getDevices() {
    this.isLoading = true;
    this.apiService.getAllData('agency/statistics/device-type', this.page, this.limit)
      .subscribe({
        next: (data: any) => {

          this.devices = data.data;
          // this.updateBrowserChart(); // Call update here after data is set
          console.log('devices data ', this.devices);
          this.isLoading = false;
          // this.createSearchChart();
          this.createDevicesChart();
        },
        error: (error: any) => {
          // Error handling
          console.error('ERROR GET ALL DATA : ', error);
          this.isLoading = false;
          this.errorMsg = 'Error occurred';
        }
      });
  }


  createChart() {
    if (!this.os) {
      console.error("OS data is not available.");
      return;
    }
    const osData = this.os;
    // console.log('os ', this.os);

    const labels = osData.map(item => item.device_os);
    const data = osData.map(item => parseFloat(item.percentage));
    // console.log('l ', labels);
    // console.log(' d ', data);

    const chart = new Chart(this.osChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'OS Distribution',
          data: data,
          backgroundColor: [
            '#32DE84', // Android color
            '#E95421', // Linux color
            '#EAEAEA', // Mac OS color
            '#0767B8', // Windows color
          ],
          // hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'OS Distribution Chart'
          }
        }
      },
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

    const browserChart = new Chart(this.browserChartRef.nativeElement, {
      type: 'bar', // Or 'bar', 'doughnut', etc., depending on your preference
      data: {
        labels: labels,
        datasets: [{
          label: 'Browser Usage',
          data: data,
          backgroundColor: [
            // Define colors for each browser
            '#EFC342', // chrome color
            '#F83D20', // firefox color
            '#11ABEA', // safari
            '#C01D20', // opera color
          ],
          // hoverOffset: 4
        }]
      },
      options: {
        // Define your chart options
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Browsers Distribution Chart'
          }
        }
      }
    });
  }

  createDevicesChart() {
    if (!this.devices) {
      console.error("Device data is not available.");
      return;
    }

    const labels = this.devices.map(item => item.device_type);
    const data = this.devices.map(item => parseFloat(item.percentage));
    // console.log('l ', labels);
    // console.log(' d ', data);

    const chart = new Chart(this.deviceChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Devices Distribution',
          data: data,
          backgroundColor: [
            '#EAEAEA', // apple color
            '#C9132B', // huawei color
            '#c997a7', // lg color
            '#075AA5', // motorola color
            '#1D58F8', // nokia color
            '#F86300', // xiaomi color
            '#2D4BD0', // samsung color
          ],
          // hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Devices Distribution Chart'
          }
        }
      },
    });
  }

  createSearchChart() {
    if (!this.searches) {
      console.error("Search data is not available.");
      return;
    }

    const labels = this.searches.map(item => item.jobs);
    const data = this.searches.map(item => parseFloat(item.occurrence_count));
    console.log('l ', labels);
    console.log('d ', data);
    const searchChart = new Chart(this.searchChartRef.nativeElement, {
      type: 'bar', // Or 'bar', 'doughnut', etc., depending on your preference
      data: {
        labels: labels,
        datasets: [{
          label: 'Searches Usage',
          data: data,
          backgroundColor: [
            // Define colors for each browser
            '#8f233a', // Android color
            '#145480', // Linux color
            '#d99f14', // Mac OS color
            '#08145e', // Windows color
            '#7cf608', // Windows color
            '#02230c', // Windows color
            '#1d1f21', // Windows color
          ],
          // hoverOffset: 4
        }]
      },
      options: {
        // Define your chart options
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Search Distribution Chart'
          }
        }
      }
    });
  }



}
