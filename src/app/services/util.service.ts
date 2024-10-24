import { inject, Injectable } from '@angular/core';
import { LoadingController,ToastController,ToastOptions } from '@ionic/angular';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
@Injectable({
  providedIn: 'root'
})
export class UtilService {
  
  loadingCtl = inject(LoadingController)
  toastCrt = inject(ToastController) 
  
  constructor() { }

  async loading() {
    const loadingOn = await this.loadingCtl.create({
      spinner: 'crescent',
      message: 'Cargando...',
    });
    return loadingOn; 
  }
  
  async presentToast(opts?: ToastOptions){
    const toast = await this.toastCrt.create(opts);
    toast.present();
  }
  async Saving() {
    const loadingOn = await this.loadingCtl.create({
      spinner: 'crescent',
      message: 'Guardando...',
    });
    return loadingOn; 
  }

  async readFilePath(fileName: string){
    const contents = await Filesystem.readFile({
      path:`images/${fileName}`
    });
  
    console.log('data:', contents);  
}
}
