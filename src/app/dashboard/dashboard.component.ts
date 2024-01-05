import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ApiService } from '../services/api.service';
import { CountryData, Entities, Locations } from '../models/Utils';
import { statusMessages } from '../models/clientMessages';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  @ViewChild('locationsChart', { static: false }) locationsChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('entityChart', { static: false }) entitiesChartRef!: ElementRef<HTMLCanvasElement>;
  locations!: Locations[];
  entities!: Entities[];
  errorMsg = '';
  isLoading = false;
  page = 1;
  limit = 10; //10
  total = 0;
  chart!: never;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(){

    this.getLocations();
    this.getEntities();

  }
  private getLocations() {
    this.isLoading = true;
    this.apiService.getAllData('agency/statistics/ip-values', this.page, this.limit)
      .subscribe({
        next: (response: { data: Locations[] }) => {
          this.locations = response.data;
          this.locationsChart();
          console.log('Location data ', this.locations);
          this.isLoading = false;
        },
        error: (error: Error) => {
          console.error('ERROR GET ALL DATA : ', error.message);
          this.isLoading = false;
          this.errorMsg = statusMessages.serverError;
        }
      });
  }
  private getEntities() {
    this.isLoading = true;
    this.apiService.getAllData('agency/statistics/entity-values', this.page, this.limit)
      .subscribe({
        next: (response: { data: Entities[] }) => {
          this.entities = response.data;
          console.log('entities data ', this.entities);
          this.isLoading = false;
          this.entitiesChart();
        },
        error: (error: Error) => {
          console.error('ERROR GET ALL DATA : ', error.message);
          this.isLoading = false;
          this.errorMsg = statusMessages.serverError;
        }
      });
  }

  locationsChart() {
    if (!this.locations) {
      console.error("Locations data is not available.");
      this.errorMsg = statusMessages.error;
      return;
    }
    // const locationData = this.locations;

    // const countryData = locationData.reduce((acc: CountryData, item: Locations) => {
    //   if (item.geo && typeof item.geo === 'object' && item.geo.country) {
    //     acc[item.geo.country] = (acc[item.geo.country] || 0) + parseFloat(item.percentage);
    //   }
    //   return acc;
    // }, {}) as CountryData;
    const countryData = this.locations.reduce((acc: CountryData, item: Locations) => {
      const country = item.geo?.country;
      if (country) {
        acc[country] = (acc[country] || 0) + parseFloat(item.percentage);
      }
      return acc;
    }, {}) as CountryData;


    const labels = Object.keys(countryData);
    const data = Object.values(countryData);

     new Chart(this.locationsChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Location Distribution',
          data: data,
          backgroundColor: [
            '#EFC342',
            '#F83D20',
            '#11ABEA',
            '#C01D20',
          ],
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
            text: 'Location Distribution Chart'
          }
        }
      },
    });
  }

  entitiesChart() {
    if (!this.entities) {
      console.error(" data is not available.");
      this.errorMsg = statusMessages.error;
      return;
    }

    const labels = this.entities.map(item => item.entity);
    const data = this.entities.map(item => parseFloat(item.percentage));

     new Chart(this.entitiesChartRef.nativeElement, {
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
            text: 'Entities Distribution Chart'
          }
        }
      },
    });
  }

}
