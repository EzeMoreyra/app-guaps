import { Injectable } from '@angular/core';
import QRCode from 'qrcode';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class QrService {
  constructor(private location: Location) {}

  async generateQRCode(uid: string): Promise<string> {
    // Obtener la URL actual
    const currentUrl = this.location.prepareExternalUrl(this.location.path());
    const baseUrl = window.location.origin; // Obtener el origen de la URL
    const url = `${baseUrl}/mascota/${uid}`; // Construir la URL completa

    try {
      const qrCodeUrl = await QRCode.toDataURL(url);
      return qrCodeUrl;
    } catch (error) {
      console.error('Error generating QR code:', error);
      throw new Error('Could not generate QR code');
    }
  }
}
