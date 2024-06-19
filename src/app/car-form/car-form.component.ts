import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogClose, MatDialogActions, MatDialogTitle, MatDialogContent} from '@angular/material/dialog';
import { Car } from '../car.service';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton, MatIconButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatDialogClose,
    MatButton,
    FormsModule,
    MatDialogActions,
    MatInput,
    MatDialogTitle,
    MatDialogContent,
    NgIf,
    NgOptimizedImage,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.css'
})
export class CarFormComponent {
  selectedFile: File | null = null;
  imageUrl: string | ArrayBuffer | null = null;
  constructor(
    public dialogRef: MatDialogRef<CarFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Car
  ) {
    // Initialize imageUrl if data has a photoUrl already
    if (this.data.photoUrl) {
      this.imageUrl = this.data.photoUrl;
    }
  }

  handleFileInput(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFile = file;

    // Image preview (if the file is an image)
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  clearFile(): void {
    this.selectedFile = null;
    this.imageUrl = null;
    const fileInput = <HTMLInputElement>document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
