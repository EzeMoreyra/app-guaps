import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-mostrar-mascota',
  templateUrl: './mostrar-mascota.page.html',
  styleUrls: ['./mostrar-mascota.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class MostrarMascotaPage implements OnInit {
  mascota: any;

  constructor(
    private firestore: Firestore,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtiene el id de la mascota desde la URL
    if (id) {
      const docRef = doc(this.firestore, `mascotas/${id}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.mascota = docSnap.data();
      }
    }
  }

  // Redirige a Google Maps con las coordenadas de la ubicación de la mascota
  mostrarUbicacion() {
    if (this.mascota && this.mascota.ubicacion) {
      const lat = this.mascota.ubicacion.lat;
      const lng = this.mascota.ubicacion.lng;
      if (lat && lng) {
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
        window.open(mapsUrl, '_blank');
      } else {
        console.error('Las coordenadas de la ubicación no están disponibles');
      }
    } else {
      console.error('La mascota o su ubicación no están disponibles');
    }
  }
}
