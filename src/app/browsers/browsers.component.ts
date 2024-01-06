import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";
import Chart from 'chart.js/auto';
import { DeviceBrowserInfo, DeviceOSInfo, DeviceTypeInfo, JobOccurrence } from '../models/Utils';
import { statusMessages } from '../models/clientMessages';

@Component({
  selector: 'app-browsers',
  templateUrl: './browsers.component.html',
  styleUrls: ['./browsers.component.scss']
})
export class BrowsersComponent implements OnInit{
  @ViewChild('osChart', { static: false }) osChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('browserChart', { static: false }) browserChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('searchChart', { static: false }) searchChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('deviceChart', { static: false }) deviceChartRef!: ElementRef<HTMLCanvasElement>;
  browsers!: DeviceBrowserInfo[];
  os!: DeviceOSInfo[];
  searches!: JobOccurrence[];
  devices!: DeviceTypeInfo[];
  time!: unknown;
  day!: unknown;
  errorMsg = '';
  isLoading = false;
  page = 1;
  limit = 10; //10
  chart!: never;


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
        next: (response: { data: DeviceOSInfo[] }) => {
          this.os = response.data;
          // console.log('os data ', this.os);
          this.isLoading = false;
          this.time = new Date().toLocaleTimeString();
          this.day = new Date().toLocaleDateString();
          this.createChart()
        },
        error: (error: Error) => {
          console.error('ERROR GET ALL DATA : ', error.message);
          this.isLoading = false;
          this.errorMsg = statusMessages.serverError;
        }
      });
  }

  private getBrowser() {
    this.isLoading = true;
    this.apiService.getAllData('agency/statistics/device-browser', this.page, this.limit)
      .subscribe({
        next: (response: { data: DeviceBrowserInfo[] }) => {
          this.browsers = response.data;
          // console.log('browser data ', this.browsers);
          this.isLoading = false;
          this.createBrowserChart();
        },
        error: (error: Error) => {
          console.error('ERROR GET ALL DATA : ', error.message);
          this.isLoading = false;
          this.errorMsg = statusMessages.serverError;
        }
      });
  }

  private getSearches() {
    this.isLoading = true;
    this.apiService.getAllData('agency/statistics/search-values', this.page, this.limit)
      .subscribe({
        next: (response: { data: JobOccurrence[] }) => {
          this.searches = response.data;
          // console.log('searches data ', this.searches);
          this.isLoading = false;
          this.createSearchChart();
        },
        error: (error: Error) => {
          console.error('ERROR GET ALL DATA : ', error.message);
          this.isLoading = false;
          this.errorMsg = statusMessages.serverError;
        }
      });
  }

  private getDevices() {
    this.isLoading = true;
    this.apiService.getAllData('agency/statistics/device-type', this.page, this.limit)
      .subscribe({
        next: (response: { data: DeviceTypeInfo[] }) => {
          this.devices = response.data;
          // console.log('devices data ', this.devices);
          this.isLoading = false;
          this.createDevicesChart();
        },
        error: (error: Error) => {
          console.error('ERROR GET ALL DATA : ', error.message);
          this.isLoading = false;
          this.errorMsg = statusMessages.serverError;
        }
      });
  }


  createChart() {
    if (!this.os) {
      console.error("OS data is not available.");
      return;
    }


    const labels: string[] =this.os.map((item: DeviceOSInfo) => item.device_os);
    const data : number[] =this.os.map((item: DeviceOSInfo) => parseFloat(item.percentage));


     new Chart(this.osChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'OS Distribution',
          data: data,
          backgroundColor: [
            '#32DE84',
            '#E95421',
            '#EAEAEA',
            '#0767B8',
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


    const labels: string[] = this.browsers.map((item: DeviceBrowserInfo) => item.device_browser);
    const data : number[]= this.browsers.map((item: DeviceBrowserInfo) => parseFloat(item.percentage));

     new Chart(this.browserChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Browser Usage',
          data: data,
          backgroundColor: [
            '#EFC342',
            '#F83D20',
            '#11ABEA',
            '#C01D20',
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

    const labels: string[] = this.devices.map((item: DeviceTypeInfo) => item.device_type);
    const data: number[] = this.devices.map((item: DeviceTypeInfo) => parseFloat(item.percentage));

   new Chart(this.deviceChartRef.nativeElement, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Devices Distribution',
          data: data,
          backgroundColor: [
            '#EAEAEA',
            '#C9132B',
            '#c997a7',
            '#075AA5',
            '#1D58F8',
            '#F86300',
            '#2D4BD0',
            '#6de560',
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
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

    const labels: string[] = this.searches.map((item: JobOccurrence) => item.jobs);
    const data: number[] = this.searches.map((item: JobOccurrence) => item.occurrence_count);

    new Chart(this.searchChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Searches Usage',
          data: data,
          backgroundColor: [
            // Define colors for each browser
            '#8f233a',
            '#145480',
            '#d99f14',
            '#08145e',
            '#7cf608',
            '#02230c',
            '#1d1f21',
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
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
