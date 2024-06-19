import { Injectable } from '@angular/core';

export interface Car {
  photoUrl: any;
  id: number;
  brand: string;
  model: string;
  year: number;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private cars: Car[] = [];
  private nextId: number = 1;

  constructor() {}

  getCars(): Car[] {
    return this.cars;
  }

  getCar(id: number): Car | undefined {
    return this.cars.find(car => car.id === id);
  }

  addCar(car: Car): void {
    car.id = this.nextId++;
    this.cars.push(car);
  }

  updateCar(updatedCar: Car): void {
    const index = this.cars.findIndex(car => car.id === updatedCar.id);
    if (index !== -1) {
      this.cars[index] = updatedCar;
    }
  }

  deleteCar(id: number): void {
    this.cars = this.cars.filter(car => car.id !== id);
  }
}
