import { Component, OnInit } from '@angular/core';
import { Car, CarService } from '../car.service';
import { MatDialog } from '@angular/material/dialog';
import { CarFormComponent } from '../car-form/car-form.component';
import { CarDetailComponent } from '../car-detail/car-detail.component';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [
    MatCardActions,
    MatCardTitle,
    MatCardContent,
    MatCard,
    MatButton,
    NgForOf
  ],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];

  constructor(private carService: CarService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.cars = this.carService.getCars();
  }

  deleteCar(id: number): void {
    this.carService.deleteCar(id);
    this.cars = this.carService.getCars();
  }

  openCarForm(car?: Car): void {
    const dialogRef = this.dialog.open(CarFormComponent, {
      width: '250px',
      data: car ? { ...car } : { id: 0, brand: '', model: '', year: new Date().getFullYear(), color: '' , photoUrl: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.carService.updateCar(result);
        } else {
          this.carService.addCar(result);
        }
        this.cars = this.carService.getCars();
      }
    });
  }

  openCarDetail(car: Car): void {
    this.dialog.open(CarDetailComponent, {
      width: '250px',
      data: car
    });
  }
}
