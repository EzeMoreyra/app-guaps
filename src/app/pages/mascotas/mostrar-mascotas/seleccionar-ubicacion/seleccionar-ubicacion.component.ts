import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-seleccionar-ubicacion',
  standalone: true,
  templateUrl: './seleccionar-ubicacion.component.html',
  styleUrls: ['./seleccionar-ubicacion.component.scss'],
  imports: [CommonModule, GoogleMapsModule]
})
export class SeleccionarUbicacionComponent {
  zoom = 8;
  markerPosition?: google.maps.LatLngLiteral; // Inicializado como undefined

  constructor(private modalController: ModalController) {}

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      console.log('Nueva posición del marcador:', this.markerPosition); // Para depurar
    }
  }

  guardarUbicacion() {
    if (this.markerPosition) {
      this.modalController.dismiss(this.markerPosition);
    } else {
      console.error('No hay posición de marcador para guardar'); // Para depurar
    }
  }
  
  cerrar() {
    this.modalController.dismiss();
  }
}
