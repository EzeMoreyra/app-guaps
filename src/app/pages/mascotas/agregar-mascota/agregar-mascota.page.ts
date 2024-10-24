import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, ModalController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MascotaService } from '../../../services/mascota.service';
import { Mascota } from '../../../interfaces/mascota.model';
import { SeleccionarUbicacionComponent } from './../../seleccionar-ubicacion/seleccionar-ubicacion.component'; // Importa el componente de mapa
import { QrService } from '../../../services/qr.service'; // Importa el servicio de QR

@Component({
  selector: 'app-agregar-mascota',
  templateUrl: './agregar-mascota.page.html',
  styleUrls: ['./agregar-mascota.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule], // Mantiene la estructura standalone
})
export class AgregarMascotaPage {
  mascota: Mascota = {
    nombre: '',
    tipo: '',
    raza: '',
    color: '',
    tamano: '',
    edad: null,
    ubicacion: { lat: null, lng: null },
    vacunado: false,
    comentarios: '',
  };
  qrCodeImage: string | undefined; // Variable para almacenar la imagen del QR

  constructor(
    private mascotaService: MascotaService,
    private toastController: ToastController,
    private modalController: ModalController,
    private qrService: QrService // Inyecta el servicio de QR
  ) {}

  async agregarMascota() {
    try {
      console.log('Mascota antes de agregar:', this.mascota); // Para depurar
      if (!this.mascota.ubicacion.lat || !this.mascota.ubicacion.lng) {
        throw new Error('Ubicación no válida'); // Validación simple
      }
      const newMascotaId = await this.mascotaService.agregarMascota(this.mascota);
      this.presentToast('Mascota agregada exitosamente');
      this.qrCodeImage = await this.qrService.generateQRCode(newMascotaId); // Genera el QR y lo guarda
      console.log(this.qrCodeImage);
    } catch (error) {
      this.presentToast('Error al agregar la mascota');
      console.error(error);
    }
  }
  

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }

  async seleccionarUbicacion() {
    const modal = await this.modalController.create({
      component: SeleccionarUbicacionComponent,
    });
  
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.mascota.ubicacion = data.data; // Establece la ubicación seleccionada
        console.log('Ubicación seleccionada:', this.mascota.ubicacion); // Para depurar
      }
    });
        return await modal.present();
  }
  }
