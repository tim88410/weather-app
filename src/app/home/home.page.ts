import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, JsonPipe } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    JsonPipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>天氣查詢</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-button expand="block" (click)="fetchWeather()" [disabled]="loading">
        {{ loading ? '讀取中...' : '取得天氣資料' }}
      </ion-button>

      <div *ngIf="error" style="color:red; margin-top:10px;">
        {{ error }}
      </div>

      <pre *ngIf="weatherData" style="margin-top:10px; white-space: pre-wrap; word-wrap: break-word;">
        {{ weatherData | json }}
      </pre>
    </ion-content>
  `
})
export class HomePage {
  weatherData: any = null;
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  fetchWeather() {
    this.loading = true;
    this.error = '';
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&hourly=temperature_2m';

    this.http.get(url).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = '取得資料失敗';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
